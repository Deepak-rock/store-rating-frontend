import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie'

import './index.css'

const Header = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove('jwt_token');
    Cookies.remove('user_role');
    navigate('/login', { replace: true });
  };
  const role = Cookies.get('user_role');

  let navHeader = ""
  if (role === "admin") {
    navHeader = "Admin Dashboard"
  } else if (role === "store_owner") {
    navHeader = "Your Store panel"
  } else {
    navHeader = "Logo"
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="logo-container">
          <h2 className="nav-heading">{navHeader}</h2>
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header