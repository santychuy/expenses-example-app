import { type Context } from 'hono';

import { type Expense, createExpenseSchema } from '../validations/expenses';

let fakeExpenses: Expense[] = [
  { id: 1, title: 'Expense 1', amount: 10 },
  { id: 2, title: 'Expense 2', amount: 20 },
  { id: 3, title: 'Expense 3', amount: 30 }
];

export const getExpenses = (c: Context) => {
  return c.json({ expenses: fakeExpenses });
};

export const getExpense = (c: Context) => {
  const id = Number.parseInt(c.req.param('id'));
  const fakeExpense = fakeExpenses.find((expense) => expense.id === id);

  if (!fakeExpense) {
    return c.notFound();
  }

  return c.json({ expense: fakeExpense });
};

/* export const createExpense = (c: Context) => {
  const expense = c.req.valid('json');

  fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });

  return c.json(expense, 201);
}; */

export const deleteExpense = (c: Context) => {
  const id = Number.parseInt(c.req.param('id'));

  const newFakeExpenses = fakeExpenses.filter((expense) => expense.id !== id);

  fakeExpenses = [...newFakeExpenses];

  return c.json(fakeExpenses);
};
