import instance from '@/src/i18n';
import { createRootRoute } from '@tanstack/react-router';
import { Root } from 'betfinio_app/root';

export const Route = createRootRoute({
	component: () => <Root id={'stones'} instance={instance} />,
});
