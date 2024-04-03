import { memo } from 'utilities';

import { NavBar, Outlet } from 'components';

import routes from '../../root/routes';

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
