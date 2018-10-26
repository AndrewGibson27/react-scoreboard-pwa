import { matchPath } from 'react-router-dom';

import allRoutes from '../routes';

export default function getMatchedComponents(url) {
  const routes = allRoutes.map((route) => {
    const { path, exact } = route;
    const foundPath = matchPath(url, { path, exact, strict: false });

    if (foundPath) return route;
    return null;
  });

  return routes.filter(route => route);
}
