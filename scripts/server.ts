import { file } from 'bun';
import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { cors } from 'hono/cors';

const app = new Hono();

app.use('/*', cors());
app.use('/*', serveStatic({ root: './dist' }));

app.notFound(async (c) => {
	const index = file('./dist/index.html');
	if (await index.exists()) return new Response(index, { headers: { 'Content-Type': 'text/html' } });
	return c.text('Not Found', 404);
});

const port = Number(process.env.PORT) || 8080;

export default {
	port: port,
	fetch: app.fetch,
};
