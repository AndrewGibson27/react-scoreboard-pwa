import AdminRoute from './admin';
import FooNavRoute from './foo/nav';
import FooMainRoute from './foo/main';

export default [
  {
    path: '/',
    exact: true,
    components: [
      AdminRoute,
    ],
  },

  {
    path: '/foo',
    exact: false,
    components: [
      FooNavRoute,
      FooMainRoute,
    ],
  },
];
