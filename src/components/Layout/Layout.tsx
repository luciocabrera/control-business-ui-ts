// components
// utilities
import { memo } from 'utilities';

import { NavBar, Outlet } from 'components';

// routes
import routes from '../../root/routes';

// styles
import { ContentStyled } from './Layout.styled';

const Layout = memo(() => {
  return (
    <>
      <NavBar routes={routes} />
      <ContentStyled>
        <Outlet />
      </ContentStyled>
    </>
  );
});

export default Layout;
