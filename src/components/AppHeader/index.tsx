import { Link } from 'react-router-dom';

import LoginForm from '../LoginForm';

import logo from '../../assets/logo.png';
import './styles.scss';

function AppHeader() {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} className="header-logo" alt="Logo oRecipes" />
      </Link>

      <LoginForm handleLogin={() => {}} handleLogout={() => {}} />
    </header>
  );
}

export default AppHeader;
