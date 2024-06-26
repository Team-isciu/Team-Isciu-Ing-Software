
import React from 'react';
import '../css/userArea.css'; 

const Menu = ({ activeView, setView }) => {
  return (
    <div className="menu">
      <button
        className={activeView === 'reset' ? 'active' : ''}
        onClick={() => setView('reset')}
      >
        Resetta Password
      </button>
      <button
        className={activeView === 'viewLog' ? 'active' : ''}
        onClick={() => setView('viewLog')}
      >
        Visualizza Log
      </button>
    </div>
  );
};

export default Menu;
