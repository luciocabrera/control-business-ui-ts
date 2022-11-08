import { memo, ReactElement } from 'react';
import { NavStyled } from './NavBar.styled';
import { Link } from 'react-router-dom';
import AppIcon from 'icons/AppIcon/AppIcon';

type SideNavBarProps = {
  routes: {
    path: string;
    text: string;

    icon?: ReactElement;
  }[];
};

const NavBar = memo(({ routes }: SideNavBarProps) => (
  <NavStyled>
    <ul>
      <li key="home" id="app-home">
        <Link to="/">
          <AppIcon />
        </Link>
      </li>
      {routes.map((route) => (
        <li key={route.text}>
          <Link to={route.path}>
            {route.icon} {route.text}
          </Link>
        </li>
      ))}
    </ul>
  </NavStyled>
));

export default NavBar;
