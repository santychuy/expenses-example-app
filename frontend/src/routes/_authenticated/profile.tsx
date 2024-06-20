import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { userQueryOptions } from '@/lib/api';

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
    <div>
      <p>Hi! {user?.family_name}</p>
      <a href="/api/logout" className="ml-5 underline">
        Logout
      </a>
    </div>
  );
}
