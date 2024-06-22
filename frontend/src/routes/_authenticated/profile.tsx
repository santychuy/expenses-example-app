import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { userQueryOptions } from '@/lib/api';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile
});

function Profile() {
  const { data: user, error, isFetching } = useQuery(userQueryOptions);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Not Logged in</div>;
  }

  return (
    <main className="h-[calc(100vh-75px)] grid place-items-center mx-auto max-w-screen-md">
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-extrabold">Hi! {user?.given_name}</h1>
        <Button variant="destructive">
          <a href="/api/logout">Logout</a>
        </Button>
      </div>
    </main>
  );
}
