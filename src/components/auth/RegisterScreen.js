/* REACT */
import React from 'react';
import { Link } from 'react-router-dom';

/* REDUX */
import { useDispatch, useSelector } from 'react-redux';

/* VALIDATOR */
import validator from 'validator';

/*  HOOKS */
import { useForm } from '../../hooks/useForm';

/* ACTIONS */
import { removeErrorAction, setErrorAction } from '../../actions/uiActions';
import { startRegisterWithEmail } from '../../actions/authActions';

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWithEmail(name, email, password));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setErrorAction('The name field is required.'));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setErrorAction('Email is not valid.'));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(
        setErrorAction(
          'Password should be at least 6 characters and match each other.'
        )
      );
      return false;
    }

    dispatch(removeErrorAction());
    return true;
  };

  return (
    <>
      <h2 className="auth__title">Register</h2>
      <form
        onSubmit={handleRegister}
        className="animate__animated animate__fadeIn animate__faster"
      >
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="E-mail"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />
        <button
          className="btn btn-primary btn-block"
          style={{ marginBottom: 10 }}
          type="submit"
        >
          Register
        </button>
        <Link className="link" to="/auth/login">
          Already registered?
        </Link>
      </form>
    </>
  );
};
