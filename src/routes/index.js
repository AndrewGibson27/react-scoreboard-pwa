import AdminRoute from './admin';
import FooRoute from './foo';

export default [
  {
    path: '/',
    exact: true,
    component: AdminRoute,
  },

  {
    path: '/foo',
    exact: true,
    component: FooRoute,
  },
];
