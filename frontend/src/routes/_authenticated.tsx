import { createFileRoute, Outlet } from '@tanstack/react-router';

import { userQueryOptions } from '@/lib/api';
import { Button } from '@/components/ui/button';

const Login = () => (
  <main className="h-[calc(100vh-75px)] grid place-items-center mx-auto max-w-screen-md">
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-extrabold">You have to Log In</h1>
      <Button>
        <a href="/api/login">Login</a>
      </Button>
    </div>
  </main>
);

const Component = () => {
  const { user } = Route.useRouteContext();

  if (!user) return <Login />;

  return <Outlet />;
};

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;

    try {
      const user = await queryClient.fetchQuery(userQueryOptions);

      return { user };
    } catch (error) {
      return { user: null };
    }
  },
  component: Component
});
