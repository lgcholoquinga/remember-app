import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startSaveNoteAction,
  startUploadFileAction,
} from '../../actions/notesAction';

import moment from 'moment';

export const NotesAppBar = () => {
  const { active: note } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const handleSaveChanges = () => {
    dispatch(startSaveNoteAction(note));
  };

  const handleUploadPicture = () => {
    document.querySelector('#fileSelector').click();
  };

  const handleFileChanges = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploadFileAction(file));
    }
  };

  return (
    <div className="notes__appbar">
      <span>{moment().format('MMMM Do YYYY')}</span>
      <input
        id="fileSelector"
        type="file"
        name="file"
        style={{ display: 'none' }}
        onChange={handleFileChanges}
      />
      <div>
        <button className="btn" onClick={handleUploadPicture}>
          Picture
        </button>
        <button className="btn" onClick={handleSaveChanges}>
          Save
        </button>
      </div>
    </div>
  );
};
