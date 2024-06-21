import { z } from 'zod';

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(6, 'The title needs to be a minimum of 6 characters'),
  amount: z.string()
});

export const createExpenseSchema = expenseSchema.omit({ id: true });

export type Expense = z.infer<typeof expenseSchema>;
