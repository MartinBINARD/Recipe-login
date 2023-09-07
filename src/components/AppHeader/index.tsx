import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';
import './styles.scss';

function AppHeader() {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} className="header-logo" alt="Logo oRecipes" />
      </Link>
    </header>
  );
}

export default AppHeader;
