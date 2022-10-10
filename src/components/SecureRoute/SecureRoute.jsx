import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/GlobalContext';

const SecureRoute = ({ children }) => {
  const { token } = useUser();
  let location = useLocation();

  if (!token)
    return <Navigate to='/login' state={{ from: location }} replace />;

  return children;
};

export default SecureRoute;
