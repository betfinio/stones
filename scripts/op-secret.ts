#!/usr/bin/env bun

/**
 * 1Password Secret Fetcher
 *
 * Fetches shared and environment-specific configurations from 1Password notes,
 * merges them, and generates a .env file filtered by .env.example template.
 *
 * Usage: bun scripts/op-secret.ts <shared-name> <env-name> [--vault <vault>]
 *
 * Arguments:
 *   shared-name   Name of the shared 1Password note (e.g., development, production)
 *   env-name      Name of the env-specific 1Password note (e.g., dev, prod-network)
 *   --vault       Vault name (default: betfin-dev)
 *
 * Examples:
 *   bun scripts/op-secret.ts development dev
 *   bun scripts/op-secret.ts production prod-network
 *   bun scripts/op-secret.ts production prod-network --vault my-vault
 *
 * The script:
 *   1. Fetches the shared note (e.g., "development") from 1Password
 *   2. Fetches the env-specific note (e.g., "dev") from 1Password
 *   3. Merges them (env-specific overrides shared)
 *   4. Reads .env.example to determine which vars this project needs
 *   5. Writes matching vars to .env.<shared-name>.local
 *
 * Note format: Supports both .env format and JSON in the notes field,
 * as well as individual fields on the 1Password item.
 *
 * Environment variables:
 *   OP_SERVICE_ACCOUNT_TOKEN - For CI/CD (non-interactive auth)
 */

const DEFAULT_VAULT = 'betfin-env';

interface OpField {
	id: string;
	type: string;
	label: string;
	value?: string;
	purpose?: string;
	section?: { id: string; label: string };
}

interface OpItem {
	id: string;
	title: string;
	category: string;
	fields?: OpField[];
}

// System fields to skip when extracting env vars from item fields
const SYSTEM_FIELD_IDS = new Set(['notesPlain', 'notes']);

async function runOp(args: string[]): Promise<string> {
	const proc = Bun.spawn(['op', ...args], {
		stdout: 'pipe',
		stderr: 'pipe',
	});

	await proc.exited;

	if (proc.exitCode !== 0) {
		const stderr = await new Response(proc.stderr).text();
		throw new Error(`op CLI error: ${stderr.trim()}`);
	}

	return (await new Response(proc.stdout).text()).trim();
}

async function checkAuth(): Promise<boolean> {
	try {
		const proc = Bun.spawn(['op', 'whoami'], {
			stdout: 'pipe',
			stderr: 'pipe',
		});
		await proc.exited;
		return proc.exitCode === 0;
	} catch {
		return false;
	}
}

/**
 * Parse content as env vars. Tries JSON first, then .env format.
 */
function parseEnvContent(content: string): Record<string, any> {
	// Try JSON first
	try {
		const parsed = JSON.parse(content);
		if (typeof parsed === 'object' && parsed !== null) {
			return parsed;
		}
	} catch {
		// Not JSON, try .env format
	}

	// Parse as .env format
	const vars: Record<string, string> = {};
	for (const line of content.split('\n')) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;
		const eqIdx = trimmed.indexOf('=');
		if (eqIdx > 0) {
			vars[trimmed.substring(0, eqIdx)] = trimmed.substring(eqIdx + 1);
		}
	}
	return vars;
}

/**
 * Fetch a 1Password item and extract env vars from it.
 * Supports: individual fields on the item, or notes content (JSON/.env format).
 */
async function fetchNote(itemName: string, vault: string): Promise<Record<string, any>> {
	console.log(`📡 Fetching: ${itemName}`);

	const json = await runOp(['item', 'get', itemName, '--vault', vault, '--format', 'json']);
	const item: OpItem = JSON.parse(json);
	const fields = item.fields || [];

	// Try custom fields first (non-system, non-notes fields with values)
	const customFields = fields.filter((f) => f.label && f.value !== undefined && f.purpose !== 'NOTES' && !SYSTEM_FIELD_IDS.has(f.id));

	if (customFields.length > 0) {
		console.log(`✅ Found ${customFields.length} fields in "${itemName}"`);
		const vars: Record<string, string> = {};
		for (const f of customFields) {
			vars[f.label] = f.value ?? '';
		}
		return vars;
	}

	// Fall back to notes content
	const notesField = fields.find((f) => f.purpose === 'NOTES');
	if (notesField?.value) {
		let content = notesField.value;

		// Handle 1Password CLI escaping
		if (content.startsWith('"') && content.endsWith('"')) {
			content = content.slice(1, -1);
			content = content.replace(/""/g, '"');
		}

		const vars = parseEnvContent(content);
		console.log(`✅ Found ${Object.keys(vars).length} vars in "${itemName}" notes`);
		return vars;
	}

	throw new Error(`No env vars found in item "${itemName}"`);
}

/**
 * Merge two configuration objects. Environment config overrides shared config.
 * Special handling for PUBLIC_FEATURE_FLAGS (deep merge).
 */
function mergeConfigs(shared: Record<string, any>, environment: Record<string, any>): Record<string, any> {
	const merged = { ...shared };

	for (const [key, value] of Object.entries(environment)) {
		if (key === 'PUBLIC_FEATURE_FLAGS' && typeof value === 'object' && typeof merged[key] === 'object') {
			merged[key] = { ...merged[key], ...value };
		} else {
			merged[key] = value;
		}
	}

	return merged;
}

/**
 * Process .env.example template and fill in values from merged config.
 */
async function processTemplate(mergedConfig: Record<string, any>): Promise<string> {
	const templateFile = Bun.file('.env.example');
	if (!(await templateFile.exists())) {
		// No template - write all vars
		console.log('⚠️  No .env.example found, writing all variables');
		return `${Object.entries(mergedConfig)
			.map(([key, value]) => {
				const strValue = typeof value === 'object' ? JSON.stringify(value) : value;
				return `${key}=${strValue}`;
			})
			.join('\n')}\n`;
	}

	const template = await templateFile.text();
	console.log('📋 Processing .env.example template...');

	let output = '';

	for (const line of template.split('\n')) {
		const eqIdx = line.indexOf('=');

		if (eqIdx <= 0 || line.startsWith('#')) {
			// Comment or empty line - keep as-is
			output += `${line}\n`;
			continue;
		}

		const key = line.substring(0, eqIdx);
		const value = mergedConfig[key];

		if (value !== undefined) {
			const strValue = typeof value === 'object' ? JSON.stringify(value) : value;
			output += `${key}=${strValue}\n`;
			console.log(`  ✅ ${key}`);
		} else {
			output += `${line}\n`;
			console.log(`  ⚠️  ${key} (not found)`);
		}
	}

	return output;
}

// --- Parse CLI arguments ---

const cliArgs = process.argv.slice(2);
const sharedName = cliArgs[0];
const envName = cliArgs[1];
const vaultIdx = cliArgs.indexOf('--vault');
const vault = vaultIdx !== -1 ? cliArgs[vaultIdx + 1] : DEFAULT_VAULT;

if (!sharedName || !envName) {
	console.error('Usage: bun scripts/op-secret.ts <shared-name> <env-name> [--vault <vault>]');
	console.error('');
	console.error('Arguments:');
	console.error('  shared-name   Shared 1Password note (e.g., development, production)');
	console.error('  env-name      Env-specific 1Password note (e.g., dev, prod-network)');
	console.error(`  --vault       Vault name (default: ${DEFAULT_VAULT})`);
	console.error('');
	console.error('Examples:');
	console.error('  bun scripts/op-secret.ts development dev');
	console.error('  bun scripts/op-secret.ts production prod-network');
	process.exit(1);
}

// --- Main ---

async function main() {
	console.log('🔐 1Password Secret Fetcher');
	console.log(`📂 Shared: ${sharedName}`);
	console.log(`🎯 Environment: ${envName}`);
	console.log(`🗄️  Vault: ${vault}`);
	console.log('');

	// Check authentication, attempt signin if local
	if (!(await checkAuth())) {
		if (process.env.OP_SERVICE_ACCOUNT_TOKEN) {
			console.error('❌ Not authenticated with 1Password (service account token invalid)');
			process.exit(1);
		}

		console.log('🔑 Not authenticated, running op signin...');
		const signin = Bun.spawn(['op', 'signin'], {
			stdout: 'inherit',
			stderr: 'inherit',
			stdin: 'inherit',
		});
		await signin.exited;

		if (signin.exitCode !== 0 || !(await checkAuth())) {
			console.error('❌ Authentication failed');
			process.exit(1);
		}
	}

	console.log('✅ Authenticated with 1Password');
	console.log('');

	// Fetch both notes
	console.log('📡 Fetching configurations...');
	const [shared, environment] = await Promise.all([fetchNote(sharedName, vault), fetchNote(envName, vault)]);

	console.log(`📊 Shared: ${Object.keys(shared).length} keys`);
	console.log(`📊 Environment: ${Object.keys(environment).length} keys`);
	console.log('');

	// Merge
	console.log('🔄 Merging configurations...');
	const mergedConfig = mergeConfigs(shared, environment);
	console.log(`📊 Merged: ${Object.keys(mergedConfig).length} keys`);
	console.log('');

	// Process template and generate output
	const output = await processTemplate(mergedConfig);

	// Write output file
	const outputFile = `.env.${sharedName}.local`;
	await Bun.write(outputFile, output);

	const lineCount = output.split('\n').filter((l) => l.trim() && !l.startsWith('#')).length;
	console.log('');
	console.log(`✅ Generated: ${outputFile} (${lineCount} variables)`);
	console.log('🎉 Done!');
}

await main();

export {};
