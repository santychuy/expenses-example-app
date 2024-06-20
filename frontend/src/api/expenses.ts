import { api } from '@/lib/api';

export const getExpenses = async () => {
  const res = await api.expenses.$get();

  if (!res.ok) {
    throw new Error('Server error');
  }

  const { expenses } = await res.json();

  return expenses;
};

export const getTotalSpent = async () => {
  const res = await api.expenses.total.$get();

  if (!res.ok) {
    throw new Error('Server error');
  }

  const { total } = await res.json();

  return total;
};
