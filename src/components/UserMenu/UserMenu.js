import React from 'react';
// import PropTypes from 'prop-types';

import Dropdown from '../../UI/Dropdown/Dropdown';

import './UserMenu.scss';

const UserMenu = (props) => {
  const clicked = () => {
    console.warn('CLICKED');
  };

  const links = [
    { name: 'Option 1', click: clicked },
  ];

  return (
    <div className="UserMenu">
      <Dropdown links={links}>
        USER MENU
      </Dropdown>
    </div>
  );
};

// UserMenu.propTypes = {}

export default UserMenu;
