/// <reference types="@rsbuild/core/types" />
import type { router } from '@/src/bootstrap';

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}
