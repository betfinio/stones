import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack';
import { dependencies } from './package.json';

const getApp = () => {
	switch (process.env.PUBLIC_ENVIRONMENT) {
		case 'development':
			return 'betfinio_app@https://app.betfin.dev/mf-manifest.json';
		case 'production':
			return 'betfinio_app@https://app.betfin.io/mf-manifest.json';
		case 'production-gg':
			return 'betfinio_app@https://app.betfin.gg/mf-manifest.json';
		default:
			return 'betfinio_app@http://localhost:5555/mf-manifest.json';
	}
};

function getOutput() {
	switch (process.env.PUBLIC_ENVIRONMENT) {
		case 'development':
			return 'https://stones.betfin.dev';
		case 'production':
			return 'https://stones.betfin.io';
		case 'production-gg':
			return 'https://stones.betfin.gg';
		default:
			return 'http://localhost:8000';
	}
}

export default defineConfig({
	server: {
		port: 7777,
	},
	dev: {
		assetPrefix: 'http://localhost:7777',
		hmr: true,
		liveReload: true,
	},
	html: {
		title: 'BetFin Stones',
		favicon: './src/assets/favicon.svg',
	},
	output: {
		assetPrefix: getOutput(),
	},
	plugins: [pluginReact()],
	tools: {
		rspack: {
			output: {
				uniqueName: 'betfinio_stones',
			},
			plugins: [
				TanStackRouterRspack(),
				new ModuleFederationPlugin({
					name: 'betfin_stones',
					remotes: {
						betfinio_app: getApp(),
					},
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
						'lucide-react': {
							singleton: true,
							requiredVersion: dependencies['lucide-react'],
						},
						'@supabase/supabase-js': {
							singleton: true,
							requiredVersion: dependencies['@supabase/supabase-js'],
						},
						i18next: {
							singleton: true,
							requiredVersion: dependencies.i18next,
						},
						'react-i18next': {
							singleton: true,
							requiredVersion: dependencies['react-i18next'],
						},
						'tailwindcss-animate': {
							singleton: true,
							requiredVersion: dependencies['tailwindcss-animate'],
						},
						tailwindcss: {
							singleton: true,
							requiredVersion: dependencies.tailwindcss,
						},
						wagmi: {
							singleton: true,
							requiredVersion: dependencies.wagmi,
						},
					},
				}),
			],
		},
	},
});
