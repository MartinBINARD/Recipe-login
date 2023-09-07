import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import LoginForm from '../LoginForm';

import './styles.scss';

function AppHeader() {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} className="header-logo" alt="Logo oRecipes" />
      </Link>
      <LoginForm />
    </header>
  );
}

export default AppHeader;
