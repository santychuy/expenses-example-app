import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { serveStatic } from 'hono/bun';

import { expensesRoutes } from './routes/expenses';

const app = new Hono();

app.use('*', logger());

app.get('/api/health', (c) => c.json({ message: 'Ok' }));
app.route('/api/expenses', expensesRoutes);

app.get('*', serveStatic({ root: './frontend/dist' }));
app.get('*', serveStatic({ path: './frontend/dist/index.html' }));

export default app;
