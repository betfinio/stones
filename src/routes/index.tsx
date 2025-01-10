import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	beforeLoad: async () => {
		throw redirect({ to: '/games/stones', search: { round: 0 } });
	},
});
