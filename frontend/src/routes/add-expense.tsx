import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/add-expense')({
  component: AddExpense
});

function AddExpense() {
  return <div>add-expense</div>;
}
