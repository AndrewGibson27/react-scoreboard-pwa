import { matchPath } from 'react-router-dom';

import routes from '../routes';

export default function getDataFetchers(url, store) {
  const fetchers = [];

  routes.forEach(({ path, exact, criticalFetchers }) => {
    const foundPath = matchPath(url, { path, exact, strict: false });

    if (foundPath && criticalFetchers.length) {
      criticalFetchers.forEach((fetcher) => {
        fetchers.push(fetcher(foundPath, store));
      });
    }
  });

  return fetchers.filter(fetcher => fetcher);
}
