import Swal from 'sweetalert2';
import { db } from '../firebase/firebaseConfig';
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';

export const addNewNoteAction = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };
    const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);
    dispatch(activeNoteAction(docRef.id, newNote));
    dispatch(addNewNote(docRef.id, newNote));
  };
};

export const activeNoteAction = (id, note) => {
  return {
    type: types.notesActive,
    payload: {
      id,
      ...note,
    },
  };
};

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotesAction(notes));
  };
};

export const setNotesAction = (notes) => {
  return {
    type: types.notesLoad,
    payload: notes,
  };
};

export const startSaveNoteAction = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!note.url) {
      delete note.url;
    }

    const noToFirestore = { ...note };
    delete noToFirestore.id;
    await db.doc(`${uid}/journal/notes/${note.id}`).update(noToFirestore);
    dispatch(refreshNote(note.id, note));
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Note',
      text: 'Note Updated correctly.',
      showConfirmButton: false,
      timer: 1500,
    });
  };
};

export const addNewNote = (id, note) => {
  return {
    type: types.notesAddNew,
    payload: {
      id,
      ...note,
    },
  };
};

export const refreshNote = (id, note) => {
  return {
    type: types.notesUpdated,
    payload: {
      id,
      note: {
        id,
        ...note,
      },
    },
  };
};

export const startUploadFileAction = (file) => {
  return async (dispatch, getState) => {
    const { active: note } = getState().notes;

    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const fileUrl = await fileUpload(file);
    note.url = fileUrl;
    dispatch(startSaveNoteAction(note));
    Swal.close();
  };
};

export const startDeleteNote = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    await db.doc(`${uid}/journal/notes/${id}`).delete();
    dispatch(deletNote(id));
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Note',
      text: 'Note Deleted.',
      showConfirmButton: false,
      timer: 1500,
    });
  };
};

export const deletNote = (id) => {
  return {
    type: types.notesDeleted,
    payload: id,
  };
};

export const noteLogout = () => {
  return {
    type: types.notesLogoutCleaning,
  };
};
