import { matchPath } from 'react-router-dom';

import allRoutes from '../routes';

export default function getDataFetchers(url, store, routesToIter = allRoutes) {
  const fetchers = [];

  routesToIter.forEach(({ path, exact, criticalFetchers }) => {
    const foundPath = matchPath(url, { path, exact, strict: false });

    if (foundPath && criticalFetchers.length) {
      criticalFetchers.forEach((fetcher) => {
        fetchers.push(fetcher(foundPath, store));
      });
    }
  });

  return fetchers.filter(fetcher => fetcher);
}
