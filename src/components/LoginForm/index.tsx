import { FormEvent } from 'react';
import Field from './Field';

import './styles.scss';

interface LoginFormProps {
  handleLogin: () => void;
  handleLogout: () => void;
  isLogged?: boolean;
  loggedMessage?: string;
}

function LoginForm({
  handleLogin,
  handleLogout,
  isLogged,
  loggedMessage,
}: LoginFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-form">
      {isLogged && (
        <div className="login-form-logged">
          <p className="login-form-message">{loggedMessage}</p>
          <button
            type="button"
            className="login-form-button"
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        </div>
      )}

      {!isLogged && (
        <form
          autoComplete="off"
          className="login-form-element"
          onSubmit={handleSubmit}
        >
          <Field placeholder="Adresse Email" />
          <Field type="password" placeholder="Mot de passe" />
          <button type="submit" className="login-form-button">
            OK
          </button>
        </form>
      )}
    </div>
  );
}

LoginForm.defaultProps = {
  isLogged: false,
  loggedMessage: 'Connecté',
};

export default LoginForm;
