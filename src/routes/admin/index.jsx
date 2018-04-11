import React from 'react';

import loadData from '../../store/admin/actions';

const AdminRoute = () => (
  <h1>Admin!</h1>
);

AdminRoute.fetchData = (params, { dispatch }) => (
  dispatch(loadData())
);

export default AdminRoute;
