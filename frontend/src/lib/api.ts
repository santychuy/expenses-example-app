import { hc } from 'hono/client';
import { queryOptions } from '@tanstack/react-query';

import type { apiRoutes } from '@server/app';
import { getCurrentUser } from '@/api/auth';
import { getExpenses } from '@/api/expenses';

const client = hc<apiRoutes>('/');

export const api = client.api;

export const userQueryOptions = queryOptions({
  queryKey: ['get-current-user'],
  queryFn: getCurrentUser,
  staleTime: Infinity
});

export const getAllExpensesQueryOptions = queryOptions({
  queryKey: ['expenses'],
  queryFn: getExpenses,
  staleTime: 1000 * 60 * 5
});
