// components
import { Outlet, NavBar } from 'components';
// routes
import routes from '../../root/routes';
// styles
import { ContentStyled } from './Layout.styled';
// utilities
import { memo } from 'utilities';

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
