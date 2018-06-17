import adminCriticalFetcher from './admin/criticalFetch';
import fooNavCriticalFetcher from './foo/nav/criticalFetch';
import fooMainCriticalFetcher from './foo/main/criticalFetch';

export default [
  {
    path: '/',
    exact: true,
    criticalFetchers: [
      adminCriticalFetcher,
    ],
  },

  {
    path: '/foo',
    exact: false,
    criticalFetchers: [
      fooNavCriticalFetcher,
      fooMainCriticalFetcher,
    ],
  },
];
