import { Outlet } from 'react-router-dom';

import { SideNavBar } from 'components';
import { useUser } from 'contexts/AuthContext';

import routes from '../../root/routes';

import { ContentStyled, HeaderStyled } from './Layout.styled';
import NavBar from 'components/NavBar/NavBar';

const Layout = () => {
  const user = useUser();

  return (
    <>
      <NavBar routes={routes} />
      <ContentStyled>
        <Outlet />
      </ContentStyled>
    </>
  );
};

export default Layout;
