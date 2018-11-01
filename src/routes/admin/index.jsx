/* eslint-disable react/prop-types */

import React from 'react';

import withAuthRedirect from '../../hoc/withAuthRedirect';

const Admin = () => (
  <section>
    <h1>Admin</h1>
    <p>You are logged in and an admin if you are seeing this.</p>
    <p>This could one day be an interface for updating scores.</p>
  </section>
);

export default withAuthRedirect(Admin);
