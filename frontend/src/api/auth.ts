import { api } from '@/lib/api';

export const getCurrentUser = async () => {
  const res = await api.me.$get();

  if (!res.ok) {
    throw new Error('Server error');
  }

  const data = await res.json();

  return data;
};
