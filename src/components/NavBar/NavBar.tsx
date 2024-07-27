import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import AppIcon from 'icons/AppIcon/AppIcon';

import styles from './NavBar.module.css';

type SideNavBarProps = {
  routes: {
    path: string;
    text: string;

    icon?: ReactElement;
  }[];
};

const NavBar = ({ routes }: SideNavBarProps) => (
  <nav className={styles.container}>
    <ul>
      <li
        key='home'
        id='app-home'
      >
        <Link
          aria-label={`Go Home`}
          to='/'
        >
          <AppIcon />
        </Link>
      </li>
      {routes.map((route) => (
        <li key={route.text}>
          <Link
            aria-label={`Go to ${route.text}`}
            to={route.path}
          >
            {route.icon} {route.text}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

NavBar.displayName = 'NavBar';

export default NavBar;
