import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { getExpenses } from '@/api/expenses';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export const Route = createFileRoute('/expenses')({
  component: Expenses
});

function Expenses() {
  const {
    data: expenses,
    isFetching,
    error
  } = useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses
  });

  if (error) return <p>Error occurred: {error.message}</p>;

  return (
    <main className="flex flex-col max-w-screen-lg gap-8 mx-auto p-7">
      <h1 className="text-3xl font-bold">Expenses</h1>

      <Table>
        <TableHeader>
          <TableRow className="text-base">
            <TableHead className="w-[150px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-[200px]">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isFetching && (
            <TableRow>
              <TableCell className="font-medium">
                <Skeleton className="w-[50px] h-[10px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[200px] h-[10px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[50px] h-[10px]" />
              </TableCell>
            </TableRow>
          )}
          {!isFetching &&
            expenses?.map(({ id, amount, title }) => (
              <TableRow>
                <TableCell className="font-medium">{id}</TableCell>
                <TableCell>{title}</TableCell>
                <TableCell>${amount}</TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className="font-bold" height={60}>
              Total
            </TableCell>
            <TableCell className="font-bold">
              {isFetching ? (
                <Skeleton className="w-[30px] h-[10px]" />
              ) : (
                `$${expenses?.reduce(
                  (acc, expense) => acc + expense.amount,
                  0
                )}`
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  );
}
