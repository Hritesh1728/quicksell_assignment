import React from 'react';
import * as logos from './logoImports.js';

const Header = ({ selectedGroup, selectedOrder, onGroupChange, onOrderChange }) => {
  const handleSelectChangeForGroup = (event) => {
    onGroupChange(event.target.value);
  };

  const handleSelectChangeForOrder = (event) => {
    onOrderChange(event.target.value);
  };

  return (
    <div className="navbar">
      <div className="popover">
        <button>
          <div className='sett_logo'>
            <img src={logos.setting_logo} alt="Logo" /> <p>Display</p>
          </div>
        </button>
        <div className="popover-content">
          <div className='display_content_divider'>
            <p>Grouping</p>
            <div className="dropdown">
              <select value={selectedGroup} onChange={handleSelectChangeForGroup}>
                <option value="status">Status</option>
                <option value="userId">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>
          <div className='display_content_divider'>
            <p>Ordering</p>
            <div className="dropdown">
              <select value={selectedOrder} onChange={handleSelectChangeForOrder}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
