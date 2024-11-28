import instance from '@/src/i18n';
import { Toaster } from '@betfinio/components/ui';
import { createRootRoute } from '@tanstack/react-router';
import { Root } from 'betfinio_app/root';
import {VersionValidation} from "@/src/components/VersionValidation.tsx";

export const Route = createRootRoute({
	component: () => (
		<Root id={'stones'} instance={instance}>
			<Toaster />
			<VersionValidation repository={'affiliate'} branch={import.meta.env.PUBLIC_BRANCH} current={import.meta.env.PUBLIC_DEPLOYED} />
		</Root>
	),
});
