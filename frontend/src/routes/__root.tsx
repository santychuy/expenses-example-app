import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';

// Kind of the main layout
export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
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
      </div>
      <hr />

      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  )
});
