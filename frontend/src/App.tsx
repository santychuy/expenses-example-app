import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

const App = () => {
  const [totalSpent, setTotalSpent] = useState<number>();

  useEffect(() => {
    const getTotal = async () => {
      try {
        const res = await fetch('/api/expenses/total');
        const { total } = await res.json();

        setTotalSpent(total);
      } catch (error) {
        console.log(error);
      }
    };

    getTotal();
  }, []);

  return (
    <main className="h-screen grid place-items-center mx-auto max-w-screen-md">
      <Card className="w-full max-w-[350px]">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>Show the total amount registered</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{totalSpent ?? 'No data available'}</p>
        </CardContent>
      </Card>
    </main>
  );
};

export default App;
