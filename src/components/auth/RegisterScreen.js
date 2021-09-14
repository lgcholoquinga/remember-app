import React from 'react';
import { Link } from 'react-router-dom';

export const RegisterScreen = () => {
  return (
    <>
      <h2 className="auth__title">Register</h2>
      <form>
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="E-mail"
          name="email"
          className="auth__input"
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="password2"
          className="auth__input"
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
