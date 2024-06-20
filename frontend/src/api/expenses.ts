import { api } from '@/lib/api';

export const getTotalSpent = async () => {
  const res = await api.expenses.total.$get();

  if (!res.ok) {
    throw new Error('Server error');
  }

  const { total } = await res.json();

  return total;
};
