import scoresRibbonFetcher from './scores-home/criticalFetch';
import scoresListFetcher from './scores-list/criticalFetch';

export default [
  {
    path: '/scores/',
    requiresAuth: false,
    exact: false,
    criticalFetchers: [
      scoresRibbonFetcher,
    ],
  },

  {
    path: '/scores/',
    requiresAuth: false,
    exact: true,
    criticalFetchers: [
      scoresListFetcher,
    ],
  },

  {
    path: '/scores/:id',
    requiresAuth: false,
    exact: true,
    criticalFetchers: [],
  },

  {
    path: '/admin/',
    requiresAuth: true,
    exact: true,
    criticalFetchers: [],
  },

  {
    path: '/login/',
    requiresAuth: false,
    exact: true,
    criticalFetchers: [],
  },
];
