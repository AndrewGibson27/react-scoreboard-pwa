import scoresRibbonFetcher from './ribbon/criticalFetch';
import scoresListFetcher from './list/criticalFetch';

export default [
  {
    path: '/scores',
    exact: false,
    criticalFetchers: [
      scoresRibbonFetcher,
    ],
  },

  {
    path: '/scores',
    exact: true,
    criticalFetchers: [
      scoresListFetcher,
    ],
  },
];
