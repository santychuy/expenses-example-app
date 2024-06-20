import {
  createRootRouteWithContext,
  Link,
  Outlet
} from '@tanstack/react-router';
import { type QueryClient } from '@tanstack/react-query';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';

interface RouteContext {
  queryClient: QueryClient;
}

// Kind of the main layout
export const Route = createRootRouteWithContext<RouteContext>()({
  component: () => (
    <>
      <div className="flex gap-2 p-2">
        <Link to="/" className="[&.active]:font-bold cursor-pointer">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold cursor-pointer">
          About
        </Link>
        <Link to="/expenses" className="[&.active]:font-bold cursor-pointer">
          Expenses
        </Link>
        <Link to="/add-expense" className="[&.active]:font-bold cursor-pointer">
          Add
        </Link>
        <Link to="/profile" className="[&.active]:font-bold cursor-pointer">
          Profile
        </Link>
      </div>
      <hr />

      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  )
});
