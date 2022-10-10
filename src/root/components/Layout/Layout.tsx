import { Outlet } from 'react-router-dom';

import { SideNavBar } from 'components';
import { useUser } from 'contexts/AuthContext';

import routes from '../../routes';

import { ContentStyled, HeaderStyled } from './Layout.styled';

const Layout = () => {
  const user = useUser();

  return (
    <>
      <HeaderStyled>Welcome {user.email}</HeaderStyled>
      <SideNavBar routes={routes} />
      <ContentStyled>
        <Outlet />
      </ContentStyled>
    </>
  );
};

export default Layout;
