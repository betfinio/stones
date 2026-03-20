import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { RsbuildPlugin } from '@rsbuild/core';

interface ManifestAssets {
	js?: {
		sync?: string[];
		async?: string[];
	};
}

interface ManifestExpose {
	assets?: ManifestAssets;
}

interface ModuleFederationManifest {
	exposes?: ManifestExpose[];
}

interface PluginOptions {
	remoteName: string;
	manifestUrl: string;
	outputDir: string;
}

async function fetchFile(url: string): Promise<string> {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
	}

	return response.text();
}

function collectFederationAssetUrls(exposes: ManifestExpose[]): Set<string> {
	const urls = new Set<string>();
	const federationExposePattern = '__federation_expose';
	const srcAsync = 'async/src_';

	for (const expose of exposes) {
		const jsAssets = expose.assets?.js;
		if (!jsAssets) continue;

		const syncAssets = jsAssets.sync?.filter((file) => file.includes(federationExposePattern) || file.includes(srcAsync)) ?? [];
		const asyncAssets = jsAssets.async?.filter((file) => file.includes(federationExposePattern) || file.includes(srcAsync)) ?? [];

		for (const asset of [...syncAssets, ...asyncAssets]) {
			urls.add(asset);
		}
	}

	return urls;
}

async function downloadFile(fileUrl: string, localPath: string): Promise<void> {
	const fileContent = await fetchFile(fileUrl);
	const directory = path.dirname(localPath);

	await mkdir(directory, { recursive: true });
	await writeFile(localPath, fileContent);
}

export async function fetchMFRemote(remoteName: string, manifestUrl: string, outputDir: string): Promise<void> {
	if (!manifestUrl) {
		throw new Error('manifestUrl is required');
	}

	console.log(`[MF-FETCH] Fetching manifest: ${manifestUrl}`);

	const manifestPath = `${manifestUrl}/mf-manifest.json`;
	const manifestRaw = await fetchFile(manifestPath);

	let manifest: ModuleFederationManifest;
	try {
		manifest = JSON.parse(manifestRaw) as ModuleFederationManifest;
	} catch (error) {
		throw new Error(`Failed to parse manifest from ${manifestPath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}

	const exposes = manifest.exposes ?? [];
	if (exposes.length === 0) {
		console.warn(`[MF-FETCH] No exposes found in manifest for remote ${remoteName}`);
		return;
	}

	const remoteFolder = path.join(outputDir, remoteName);
	await mkdir(remoteFolder, { recursive: true });

	const assetUrls = collectFederationAssetUrls(exposes);

	if (assetUrls.size === 0) {
		console.warn(`[MF-FETCH] No federation expose assets found for remote ${remoteName}`);
		return;
	}

	for (const fileUrl of assetUrls) {
		const localPath = path.join(remoteFolder, fileUrl);
		await downloadFile(`${manifestUrl}/${fileUrl}`, localPath);
	}

	console.log(`[MF-FETCH] Done fetching remote ${remoteName}`);
}

export function pluginManifest(options: PluginOptions): RsbuildPlugin {
	return {
		name: 'rsbuild:plugin-fetch-manifest',
		setup(api) {
			api.modifyRsbuildConfig(async (config) => {
				await fetchMFRemote(options.remoteName, options.manifestUrl, options.outputDir);
				return config;
			});
		},
	};
}
