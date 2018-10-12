import scoresRibbonFetcher from './ribbon/criticalFetch';
import scoresListFetcher from './list/criticalFetch';

export default [
  {
    path: '/scores',
    exact: false,
    requiresAuth: false,
    criticalFetchers: [
      scoresRibbonFetcher,
    ],
  },

  {
    path: '/scores',
    requiresAuth: false,
    exact: true,
    criticalFetchers: [
      scoresListFetcher,
    ],
  },

  {
    path: '/admin',
    requiresAuth: true,
    exact: true,
    criticalFetchers: [],
  },
];
