import { FormEvent } from 'react';
import { useAppDispatch } from '../../hooks/redux';

import Field from './Field';

import './styles.scss';
import { login } from '../../store/reducers/user';

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
  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // mon intention
    console.log(`
      je veux récupérer mes données de formulaire pour interroger mon API ;
      si on connait l'utilisateur, on l'enregistre dans le state global
    `);

    const form = event.currentTarget;
    const formData = new FormData(form);

    dispatch(login(formData));
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
          <Field name="email" placeholder="Adresse Email" type="email" />
          <Field name="password" placeholder="Mot de passe" type="password" />
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
