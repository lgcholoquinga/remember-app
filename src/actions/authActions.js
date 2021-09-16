/* FIREBASE */
import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';

/* TYPES */
import { types } from '../types/types';

/* ACTIONS */
import { finishLoadingAction, startLoadingAction } from './uiActions';

/* SWEETALERT */
import Swal from 'sweetalert2';
import { noteLogout } from './notesAction';

export const startLoginWithEmail = (email, password) => {
  return (dispatch) => {
    dispatch(startLoadingAction());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(loginAction(user.uid, user.displayName));
        dispatch(finishLoadingAction());
      })
      .catch((e) => {
        dispatch(finishLoadingAction());
        Swal.fire('Error', e.message, 'error');
      });
  };
};

export const startRegisterWithEmail = (name, email, password) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(loginAction(user.uid, user.displayName));
      })
      .catch((e) => Swal.fire('Error', e.message, 'error'));
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(loginAction(user.uid, user.displayName));
      });
  };
};

export const loginAction = (uid, displayName) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
    },
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logoutAction());
    dispatch(noteLogout());
  };
};

export const logoutAction = () => {
  return {
    type: types.logout,
  };
};
