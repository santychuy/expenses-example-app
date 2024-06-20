import { createFileRoute, Outlet } from '@tanstack/react-router';

import { userQueryOptions } from '@/lib/api';

const Login = () => (
  <div>
    You have to Log In
    <a href="/api/login" className="ml-5 underline">
      Login
    </a>
  </div>
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
