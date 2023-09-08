import { FormEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login, logout } from '../../store/reducers/user';

import Field from './Field';

import './styles.scss';

function LoginForm() {
  const pseudo = useAppSelector((state) => state.user.pseudo);

  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    dispatch(login(formData));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="login-form">
      {pseudo && (
        <div className="login-form-logged">
          <p className="login-form-message">
            Bienvenue <b>{pseudo}</b>
          </p>
          <button
            type="button"
            className="login-form-button"
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        </div>
      )}

      {!pseudo && (
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

export default LoginForm;
