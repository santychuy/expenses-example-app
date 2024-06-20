import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { getTotalSpent } from '@/api/expenses';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export const Route = createFileRoute('/_authenticated/')({
  component: Home
});

function Home() {
  // TODO: Use suspense and error boundaries
  const {
    data: total,
    isFetching,
    error
  } = useQuery({
    queryKey: ['totalSpent'],
    queryFn: getTotalSpent
  });

  if (error) return <p>Error occurred: {error.message}</p>;

  return (
    <main className="h-[calc(100vh-41px)] grid place-items-center mx-auto max-w-screen-md">
      <Card className="w-full max-w-[350px]">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>Show the total amount registered</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{isFetching ? '...' : total}</p>
        </CardContent>
      </Card>
    </main>
  );
}
