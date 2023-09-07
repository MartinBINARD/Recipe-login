import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { userLogin, userLogout } from '../../store/reducers/user';

import Field from './Field';

import './styles.scss';

interface ChangeFieldProps {
  name: string;
  value: string;
}

function LoginForm() {
  const isLogged = useAppSelector((state) => state.user.logged);
  const loggedMessage = useAppSelector(
    (state) => `Bienvenue ${state.user.pseudo}`
  );
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    dispatch(userLogin(formData));

    setEmail('');
    setPassword('');
  };

  const changeField = ({ value, name }: ChangeFieldProps) => {
    return name === 'email' ? setEmail(value) : setPassword(value);
  };

  const handleChangeField = (name: 'email' | 'password') => (value: string) => {
    changeField({ value, name });
  };

  const handleLogout = () => {
    dispatch(userLogout());
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
          <Field
            name="email"
            placeholder="Adresse Email"
            onChange={handleChangeField('email')}
            value={email}
          />
          <Field
            name="password"
            type="password"
            placeholder="Mot de passe"
            onChange={handleChangeField('password')}
            value={password}
          />
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
