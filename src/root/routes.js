import { HomeIcon, LoginIcon } from 'components';

const routes = [
  {
    text: 'Home',
    path: '/',
    icon: <HomeIcon />,
  },
  {
    text: 'Customers',
    path: 'customers',
    icon: <HomeIcon />,
  },
  {
    text: 'Invoices',
    path: 'invoices',
    icon: <LoginIcon />,
  },
];

export default routes;
