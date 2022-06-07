import Navigation from '../Navigation/Navigation';
import {Fragment} from 'react';
const Layout = (props) => {
  return (
    <Fragment>
      <Navigation />
      <main>{props.children}</main>
    </Fragment>
  );
};
export default Layout;
