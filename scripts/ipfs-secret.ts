#!/usr/bin/env bun

/**
 * IPFS Secret Fetcher with 1Password Integration
 *
 * Fetches shared and environment-specific configurations from IPFS/IPNS,
 * merges them, and generates a .env file with PUBLIC_ variables.
 *
 * IPNS mappings are now fetched from 1Password secure notes.
 * Self-contained - no external dependencies except 1Password CLI.
 */

// Configuration
const IPFS_GATEWAY = 'https://ipfs.io';
const IPNS_GATEWAY = 'https://ipfs.io';
const TIMEOUT = 15000; // 15 seconds
// 1Password configuration
const DEFAULT_IPNS_NOTE_TITLE = 'IPNS_SECRETS'; //Note name in 1Password

/**
 * Check if 1Password CLI is available and authenticated
 */
async function check1PasswordAuth(): Promise<boolean> {
	try {
		const result = Bun.spawn(['op', 'whoami'], {
			stdout: 'pipe',
			stderr: 'pipe',
		});

		await result.exited;
		return result.exitCode === 0;
	} catch {
		return false;
	}
}

/**
 * Run 1Password CLI command
 */
async function run1PasswordCommand(command: string[]): Promise<string> {
	try {
		const result = Bun.spawn(['op', ...command], {
			stdout: 'pipe',
			stderr: 'pipe',
		});

		await result.exited;

		if (result.exitCode !== 0) {
			const stderr = await new Response(result.stderr).text();
			throw new Error(`1Password CLI error: ${stderr}`);
		}

		return await new Response(result.stdout).text();
	} catch (error) {
		throw new Error(`Failed to run 1Password command: ${error instanceof Error ? error.message : error}`);
	}
}

/**
 * Get 1Password secure note content
 */
async function get1PasswordNote(titleOrId: string): Promise<string> {
	try {
		// Try 'notes' field first
		const output = await run1PasswordCommand(['item', 'get', titleOrId, '--fields', 'notes']);
		return output.trim();
	} catch {
		// Fallback to 'notesPlain' field
		const output = await run1PasswordCommand(['item', 'get', titleOrId, '--fields', 'notesPlain']);
		return output.trim();
	}
}

/**
 * Fetch IPNS mappings from 1Password secure note
 */
async function fetch1PasswordIPNSMappings(): Promise<Record<string, string> | null> {
	try {
		console.log('🔍 Fetching IPNS names from 1Password...');

		// Check if 1Password CLI is available and authenticated
		const isAuthenticated = await check1PasswordAuth();
		if (!isAuthenticated) {
			console.error('❌ 1Password CLI not available or not authenticated');
			console.error('💡 Run: op signin');
			process.exit(1);
		}

		console.log('✅ 1Password CLI authenticated, fetching IPNS mappings...');

		// Try to get the IPNS mappings note
		// You can configure this note name via environment variable
		const noteTitle = DEFAULT_IPNS_NOTE_TITLE;

		try {
			let noteContent = await get1PasswordNote(noteTitle);

			// Handle 1Password CLI escaping - remove outer quotes and unescape inner quotes
			if (noteContent.startsWith('"') && noteContent.endsWith('"')) {
				noteContent = noteContent.slice(1, -1);
				noteContent = noteContent.replace(/""/g, '"');
			}

			// Try to parse as JSON
			const config = JSON.parse(noteContent);

			if (typeof config === 'object' && config !== null) {
				// Extract IPNS public keys from the configuration structure
				const mappings: Record<string, string> = {};

				// Skip __env section and extract ipnsPublicKey from each environment
				for (const [envName, envConfig] of Object.entries(config)) {
					if (envName !== '__env' && typeof envConfig === 'object' && envConfig !== null) {
						const ipnsKey = (envConfig as any).ipnsPublicKey;
						if (ipnsKey) {
							mappings[envName] = ipnsKey;
						}
					}
				}

				if (Object.keys(mappings).length > 0) {
					console.log(`✅ Found ${Object.keys(mappings).length} IPNS mappings from 1Password`);
					return mappings;
				}
				console.error('❌ No IPNS public keys found in 1Password note');
				process.exit(1);
			} else {
				console.error('❌ Invalid IPNS mappings format in 1Password note');
				process.exit(1);
			}
		} catch (error) {
			if (error instanceof Error && error.message.includes('not found')) {
				console.error(`❌ 1Password note "${noteTitle}" not found`);
				console.error('💡 Create a secure note with IPNS mappings JSON');
			} else {
				console.error(`❌ Failed to parse IPNS mappings from 1Password: ${error instanceof Error ? error.message : error}`);
			}
			process.exit(1);
		}
	} catch (error) {
		console.error(`❌ Failed to fetch from 1Password: ${error instanceof Error ? error.message : error}`);
		process.exit(1);
	}
}

/**
 * Get IPNS public name for a config name (with 1Password integration)
 */
async function getIPNSPublicName(configName: string, mappings: Record<string, string>): Promise<string> {
	if (mappings[configName]) {
		return mappings[configName];
	}

	const availableConfigs = Object.keys(mappings);
	throw new Error(`No IPNS public name found for config: ${configName}\n` + `Available configs: ${availableConfigs.join(', ')}`);
}

// Command line arguments
const shared_name = process.argv[2];
const environment_name = process.argv[3];

if (!shared_name || !environment_name) {
	console.error('❌ Usage: bun run ipfs-secret.ts -- <shared_name> <environment_name>');
	console.error('   Example: bun run ipfs-secret.ts -- development dev');
	process.exit(1);
}

// Removed getIPNSNameFromKey function - using pre-computed public names instead

/**
 * Resolve IPNS names from readable names using 1Password mapping
 */
async function resolveIPNSNames(sharedName: string, envName: string, mappings: Record<string, string>): Promise<{ sharedIPNS: string; envIPNS: string }> {
	const sharedIPNS = await getIPNSPublicName(sharedName, mappings);
	const envIPNS = await getIPNSPublicName(envName, mappings);

	console.log('🔑 Resolved IPNS names:');
	console.log(`   Shared (${sharedName}): ${sharedIPNS}`);
	console.log(`   Environment (${envName}): ${envIPNS}`);

	return { sharedIPNS, envIPNS };
}

/**
 * Check if a hash is an IPFS hash (starts with Qm, bafy, bafk, etc.)
 */
function isIPFSHash(hash: string): boolean {
	// IPFS hashes can start with:
	// - Qm (CIDv0)
	// - bafy, bafk, bafc, etc. (CIDv1)
	return /^(Qm[1-9A-HJ-NP-Za-km-z]{44}|ba[fy][a-z0-9]{50,})/.test(hash);
}

/**
 * Format IPFS/IPNS name for gateway URL
 */
function formatName(name: string): string {
	// Remove /ipns/ or /ipfs/ prefix if present
	if (name.startsWith('/ipns/') || name.startsWith('/ipfs/')) {
		return name.substring(6);
	}
	return name;
}

/**
 * Fetch content from IPFS/IPNS or local file
 */
async function fetchIPFSContent(name: string): Promise<Record<string, any>> {
	try {
		console.log(`📡 Fetching: ${name}`);

		// Check if it's a local file path (for testing)
		if (name.includes('/') || name.includes('.json')) {
			console.log(`📁 Loading local file: ${name}`);
			const file = Bun.file(name);
			const text = await file.text();
			console.log(`✅ Loaded ${text.length} bytes from local file`);
			return JSON.parse(text);
		}

		// Format name and detect type for IPFS
		const formattedName = formatName(name);
		const isIPFS = isIPFSHash(formattedName);
		const protocol = isIPFS ? 'ipfs' : 'ipns';
		const gateway = isIPFS ? IPFS_GATEWAY : IPNS_GATEWAY;
		const url = `${gateway}/${protocol}/${formattedName}`;

		// Create abort controller for timeout
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

		try {
			const response = await fetch(url, {
				signal: controller.signal,
				headers: {
					Accept: 'application/json',
					'User-Agent': 'IPFS-Secret-Fetcher/1.0',
				},
			});

			clearTimeout(timeoutId);

			if (!response.ok) {
				throw new Error(`HTTP ${response.status}: ${response.statusText}`);
			}

			const text = await response.text();
			console.log(`✅ Fetched ${text.length} bytes`);

			// Try to parse as JSON
			try {
				return JSON.parse(text);
			} catch (parseError) {
				throw new Error(`Failed to parse JSON: ${parseError}`);
			}
		} catch (error) {
			clearTimeout(timeoutId);

			if (error instanceof Error && error.name === 'AbortError') {
				throw new Error(`Request timeout after ${TIMEOUT}ms`);
			}
			throw error;
		}
	} catch (error) {
		console.error(`❌ Failed to fetch from ${name}:`, error);
		throw error;
	}
}

/**
 * Merge two configuration objects
 * Environment config overrides shared config
 */
function mergeConfigs(shared: Record<string, any>, environment: Record<string, any>): Record<string, any> {
	const merged = { ...shared };

	for (const [key, value] of Object.entries(environment)) {
		if (key === 'PUBLIC_FEATURE_FLAGS' && typeof value === 'object' && typeof merged[key] === 'object') {
			// Merge feature flags objects
			merged[key] = { ...merged[key], ...value };
		} else {
			// Override other values
			merged[key] = value;
		}
	}

	return merged;
}

/**
 * Process template and generate environment file
 */
async function processTemplate(mergedConfig: Record<string, any>): Promise<string> {
	try {
		// Read template file
		const templateFile = Bun.file('.env.example');
		const template = await templateFile.text();
		console.log('📋 Processing template...');

		let output = '';

		for (const line of template.split('\n')) {
			const data = line.split('=');

			if (data.length === 1) {
				// Comment or empty line
				output += `${line}\n`;
			} else if (data.length === 2 && data[0].startsWith('PUBLIC_')) {
				// PUBLIC_ variable - look for value in merged config
				const key = data[0];
				const value = mergedConfig[key];

				if (value !== undefined) {
					// Stringify objects/arrays, keep primitives as-is
					const stringValue = typeof value === 'object' ? JSON.stringify(value) : value;
					output += `${key}=${stringValue}\n`;
					console.log(`✅ Set ${key}`);
				} else {
					// Keep empty if not found
					output += `${line}\n`;
					console.log(`⚠️  Missing value for ${key}`);
				}
			} else {
				// Non-PUBLIC variables - skip or keep as comment
				console.log('⏭️  Skipping:', line);
				output += `# ${line}\n`;
			}
		}

		return output;
	} catch (error) {
		console.error('❌ Failed to process template:', error);
		throw error;
	}
}

/**
 * Main execution
 */
async function main() {
	try {
		console.log('🚀 IPFS Secret Fetcher with 1Password IPNS Resolution');
		console.log(`📂 Shared: ${shared_name}`);
		console.log(`🎯 Environment: ${environment_name}`);
		console.log('');

		let sharedIPNS: string;
		let envIPNS: string;

		// Check if inputs are IPFS hashes or readable names
		if (isIPFSHash(shared_name) && isIPFSHash(environment_name)) {
			console.log('🔍 Detected IPFS hashes, using direct fetch');
			sharedIPNS = shared_name;
			envIPNS = environment_name;
		} else {
			console.log('🔍 Detected readable names, resolving IPNS...');

			// Fetch 1Password mappings (required)
			const onePasswordMappings = await fetch1PasswordIPNSMappings();
			if (!onePasswordMappings) {
				console.error('❌ 1Password mappings are required for readable names');
				process.exit(1);
			}

			// Resolve IPNS names from 1Password mapping
			const resolved = await resolveIPNSNames(shared_name, environment_name, onePasswordMappings);
			sharedIPNS = resolved.sharedIPNS;
			envIPNS = resolved.envIPNS;
			console.log('');
		}

		// Fetch both configurations
		console.log('📡 Fetching configurations...');
		const [shared, environment] = await Promise.all([fetchIPFSContent(sharedIPNS), fetchIPFSContent(envIPNS)]);

		console.log(`✅ Shared config: ${Object.keys(shared).length} keys`);
		console.log(`✅ Environment config: ${Object.keys(environment).length} keys`);
		console.log('');

		// Merge configurations
		console.log('🔄 Merging configurations...');
		const mergedConfig = mergeConfigs(shared, environment);
		console.log(`✅ Merged config: ${Object.keys(mergedConfig).length} keys`);
		console.log('');

		// Process template
		const output = await processTemplate(mergedConfig);

		// Write output file with readable name
		// Use readable name for output file, not IPFS hash
		let outputName = shared_name;
		if (isIPFSHash(shared_name)) {
			// If using IPFS hashes directly, default to 'development' for readable filename
			outputName = 'development';
		}

		const outputFile = `.env.${outputName}.local`;
		await Bun.write(outputFile, output);

		console.log('');
		console.log(`✅ Generated: ${outputFile}`);
		console.log('🎉 Done!');
	} catch (error) {
		console.error('💥 Fatal error:', error);
		process.exit(1);
	}
}

// Run the script
await main();

// Make this file a module for top-level await
export {};
