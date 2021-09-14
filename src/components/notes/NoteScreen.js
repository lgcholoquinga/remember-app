import React from 'react';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
        />

        <textarea
          placeholder="What happen today?"
          className="notes__textarea"
        ></textarea>

        <div className="notes__image mt-1">
          <img
            src="https://www.caracteristicas.co/wp-content/uploads/2017/07/luna-e1571522155734.jpg"
            alt="image"
          />
        </div>
      </div>
    </div>
  );
};
