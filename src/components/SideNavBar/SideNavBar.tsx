import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { NavStyled } from './SideNavBar.styled';

type SideNavBarProps = {
  routes: {
    path: string;
    text: string;
    icon: ReactElement;
  }[];
};

const SideNavBar = ({ routes }: SideNavBarProps) => (
  <NavStyled>
    <ul>
      {routes.map((route) => (
        <li key={route.text}>
          <Link to={route.path}>{route.icon}</Link>
        </li>
      ))}
    </ul>
  </NavStyled>
);

export default SideNavBar;
