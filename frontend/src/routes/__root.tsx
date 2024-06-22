import {
  createRootRouteWithContext,
  Link,
  Outlet
} from '@tanstack/react-router';
import { useQuery, type QueryClient } from '@tanstack/react-query';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { userQueryOptions } from '@/lib/api';

interface RouteContext {
  queryClient: QueryClient;
}

// Kind of the main layout
export const Route = createRootRouteWithContext<RouteContext>()({
  component: NavBar
});

function NavBar() {
  // const { user } = Route.useRouteContext();

  // FIXME: This cause a double fetch to the user's info, try to get the info from the context
  const { data: user } = useQuery(userQueryOptions);

  return (
    <>
      <div className="flex items-baseline p-4">
        <Link to="/" className="text-2xl font-bold cursor-pointer">
          Expense Tracker
        </Link>
        <div className="flex items-center gap-3 ml-6 mr-auto">
          <Link to="/expenses" className="[&.active]:font-bold cursor-pointer">
            Expenses
          </Link>
          <Link
            to="/add-expense"
            className="[&.active]:font-bold cursor-pointer"
          >
            Add
          </Link>
        </div>
        {user && (
          <Link to="/profile">
            <Avatar>
              <AvatarImage src={user?.picture ?? ''} alt={user?.given_name} />
              <AvatarFallback>{`${user?.given_name[0]}${user?.family_name[0]}`}</AvatarFallback>
            </Avatar>
          </Link>
        )}
      </div>
      <hr />

      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}
