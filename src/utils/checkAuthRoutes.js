import { matchPath } from 'react-router-dom';

import routes from '../routes';

export default function checkAuthRoutes(url) {
  let authRoutesExist = false;

  // eslint-disable-next-line consistent-return
  routes.forEach(({ path, exact, requiresAuth }) => {
    const foundPath = matchPath(url, { path, exact, strict: false });

    if (foundPath && requiresAuth) {
      authRoutesExist = true;
      return false;
    }
  });

  return authRoutesExist;
}
