import { insertExpenseSchema } from '../db/schema/expenses';

// Shared Zod Schema for frontend and backend
export const createExpenseSchema = insertExpenseSchema.omit({
  userId: true,
  createdAt: true
});
