import {Navigate, useLocation} from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({element: Component, allowedRoles}) => {
  const jwtToken = Cookies.get('jwt_token');
  const location = useLocation();

  if (!jwtToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  try {
    const decoded = jwtDecode(jwtToken);
    if (!allowedRoles.includes(decoded.role)) {
      const redirectPath = {
        admin: '/admin-dashboard',
        store_owner: '/store-panel',
        normal: '/user',
      }[decoded.role] || '/login';

      return <Navigate to={redirectPath} replace />;
    }
  } catch (err) {
    console.error('Invalid token:', err);
    return <Navigate to="/login" replace />;
  }

  return Component;
};

export default ProtectedRoute;