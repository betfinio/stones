/// <reference types="@rsbuild/core/types" />

declare global {
	interface Window {
		Tawk_API: {
			setAttributes: (attributes: any, callback?: () => void) => void;
			minimize: () => void;
			maximize: () => void;
			toggle: () => void;
		};
	}
}
