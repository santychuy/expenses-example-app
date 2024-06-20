import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { serveStatic } from 'hono/bun';

import { expensesRoutes } from './routes/expenses';
import { authRoutes } from './routes/auth';

const app = new Hono();

app.use('*', logger());

const apiRoutes = app
  .basePath('/api')
  .get('/health', (c) => c.json({ message: 'Ok' }))
  .route('/', authRoutes)
  .route('/expenses', expensesRoutes);

app.get('*', serveStatic({ root: './frontend/dist' }));
app.get('*', serveStatic({ path: './frontend/dist/index.html' }));

export type apiRoutes = typeof apiRoutes;

export default app;
