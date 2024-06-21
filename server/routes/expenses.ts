import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { eq, desc, and } from 'drizzle-orm';

import { createExpenseSchema } from '../validations/expenses';
import { authUser } from '../middlewares/auth';
import { db } from '../db';
import { expenses as expensesTable } from '../db/schema/expenses';

export const expensesRoutes = new Hono()
  .get('/', authUser, async (c) => {
    const user = c.var.user;

    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .orderBy(desc(expensesTable.createdAt))
      .limit(10);

    return c.json({ expenses });
  })
  .get('/:id{[0-9]+}', authUser, async (c) => {
    const id = Number.parseInt(c.req.param('id'));

    const expense = await db
      .select()
      .from(expensesTable)
      .where(
        and(eq(expensesTable.id, id), eq(expensesTable.userId, c.var.user.id))
      );

    if (!expense) {
      return c.notFound();
    }

    return c.json({ expense });
  })
  .get('/total', authUser, async (c) => {
    const user = c.var.user;

    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id));

    const total = expenses.reduce((acc, { amount }) => acc + +amount, 0);

    return c.json({ total });
  })
  .post('/', authUser, zValidator('json', createExpenseSchema), async (c) => {
    const expense = c.req.valid('json');

    const res = await db
      .insert(expensesTable)
      .values({
        ...expense,
        userId: c.var.user.id
      })
      .returning();

    return c.json(res, 201);
  })
  .delete('/:id{[0-9]+}', authUser, async (c) => {
    const id = Number.parseInt(c.req.param('id'));

    const expense = await db
      .delete(expensesTable)
      .where(
        and(eq(expensesTable.id, id), eq(expensesTable.userId, c.var.user.id))
      )
      .returning();

    if (!expense) {
      return c.notFound();
    }

    return c.json(expense);
  });
