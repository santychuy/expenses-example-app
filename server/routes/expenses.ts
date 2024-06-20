import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import { type Expense, createExpenseSchema } from '../validations/expenses';
import { authUser } from '../middlewares/auth';

let fakeExpenses: Expense[] = [
  { id: 1, title: 'Expense 1', amount: 10 },
  { id: 2, title: 'Expense 2', amount: 20 },
  { id: 3, title: 'Expense 3', amount: 30 }
];

export const expensesRoutes = new Hono()
  .get('/', authUser, (c) => c.json({ expenses: fakeExpenses }))
  .get('/:id{[0-9]+}', authUser, (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const fakeExpense = fakeExpenses.find((expense) => expense.id === id);

    if (!fakeExpense) {
      return c.notFound();
    }

    return c.json({ expense: fakeExpense });
  })
  .get('/total', authUser, (c) => {
    const total = fakeExpenses.reduce((acc, { amount }) => acc + amount, 0);

    return c.json({ total });
  })
  .post('/', authUser, zValidator('json', createExpenseSchema), async (c) => {
    const expense = c.req.valid('json');

    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });

    return c.json(expense, 201);
  })
  .delete('/:id{[0-9]+}', authUser, (c) => {
    const id = Number.parseInt(c.req.param('id'));

    const newFakeExpenses = fakeExpenses.filter((expense) => expense.id !== id);

    fakeExpenses = [...newFakeExpenses];

    return c.json(fakeExpenses);
  });
