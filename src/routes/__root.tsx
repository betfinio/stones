import { createRootRoute, Outlet } from '@tanstack/react-router';
import MockRoot from 'betfinio_context/components/MockRoot';
import { GlobalContextProvider } from 'betfinio_context/lib/context';
import { I18nextProvider } from 'react-i18next';
import { DistributeProvider } from '../components/modals/DistributeModal';
import i18n from '../i18n';

export const Route = createRootRoute({
	component: () => (
		<GlobalContextProvider>
			<I18nextProvider i18n={i18n}>
				<DistributeProvider>
					<MockRoot>
						<Outlet />
					</MockRoot>
				</DistributeProvider>
			</I18nextProvider>
		</GlobalContextProvider>
	),
});
