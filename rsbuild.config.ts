import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack';
import { dependencies } from './package.json';

const PORT = 4002;

export default defineConfig({
	server: {
		port: PORT,
	},
	dev: {
		assetPrefix: `http://localhost:${PORT}`,
	},
	html: {
		title: 'Betfin Stones',
		favicon: './src/assets/favicon.svg',
		template: './src/assets/index.html',
		meta: {
			viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
		},
	},
	output: {
		assetPrefix: process.env.PUBLIC_OUTPUT_URL,
	},
	plugins: [
		pluginReact(),
		pluginSvgr(),
		pluginModuleFederation({
			name: 'betfin_stones',
			remotes: {
				betfinio_context: `betfinio_context@${process.env.PUBLIC_CONTEXT_URL}/mf-manifest.json`,
			},
			exposes: {
				'./style': './src/style',
				'./i18n': './src/i18n',
				'./route': './src/routes/games/stones/index',
			},
			manifest: true,
			dts: true,
			shared: {
				react: {
					singleton: true,
					requiredVersion: dependencies.react,
				},
				'react-dom': {
					singleton: true,
					requiredVersion: dependencies['react-dom'],
				},
				'@tanstack/react-router': {
					singleton: true,
					requiredVersion: dependencies['@tanstack/react-router'],
				},
				'@tanstack/react-query': {
					singleton: true,
					requiredVersion: dependencies['@tanstack/react-query'],
				},
				'@tanstack/react-table': {
					singleton: true,
					requiredVersion: dependencies['@tanstack/react-table'],
				},
				i18next: {
					singleton: true,
					requiredVersion: dependencies.i18next,
				},
				'react-i18next': {
					singleton: true,
					requiredVersion: dependencies['react-i18next'],
				},
				wagmi: {
					singleton: true,
					requiredVersion: dependencies.wagmi,
				},
			},
		}),
	],
	tools: {
		rspack: {
			ignoreWarnings: [/Critical dependency: the request of a dependency is an expression/],
			plugins: [TanStackRouterRspack()],
		},
	},
});
