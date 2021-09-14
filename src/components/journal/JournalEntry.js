import React from 'react';

export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundImage:
            'url(https://www.caracteristicas.co/wp-content/uploads/2017/07/luna-e1571522155734.jpg)',
        }}
      ></div>
      <div className="journal__entry-body">
        <p className="journal__entry-title">New Day</p>
        <p className="journal__entry-content">
          lorem Ipsussssssssssssssssssssssssss
        </p>
      </div>

      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  );
};
