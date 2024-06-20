import { createMiddleware } from 'hono/factory';
import { type UserType } from '@kinde-oss/kinde-typescript-sdk';

import { kindeClient, sessionManager } from '../kinde';

type Env = {
  Variables: {
    user: UserType;
  };
};

export const authUser = createMiddleware<Env>(async (c, next) => {
  try {
    const manager = sessionManager(c);
    const isAuth = await kindeClient.isAuthenticated(manager);

    if (!isAuth) {
      return c.json({ message: 'Unauthorized' }, 401);
    }

    const user = await kindeClient.getUserProfile(manager);
    c.set('user', user);

    return next();
  } catch (error) {
    console.error(error);
    return c.json({ message: 'Unauthorized' }, 401);
  }
});
