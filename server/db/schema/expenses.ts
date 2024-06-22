import {
  pgTable,
  serial,
  index,
  text,
  numeric,
  timestamp,
  date
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const expenses = pgTable(
  'expenses',
  {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    title: text('title').notNull(),
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
    date: date('date').notNull(),
    createdAt: timestamp('created_at').defaultNow()
  },
  (expenses) => {
    return {
      userIdIndex: index('name_idx').on(expenses.userId)
    };
  }
);

// Source of truth for the schema based on the DB Schema
export const insertExpenseSchema = createInsertSchema(expenses, {
  title: z
    .string({ message: 'Title is required' })
    .min(6, { message: 'The title needs to be a minimum of 6 characters' }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: 'Amount must be a number, positive and with up to 2 decimal'
  })
});

export const selectExpenseSchema = createSelectSchema(expenses);
