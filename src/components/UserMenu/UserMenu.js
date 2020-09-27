import React from 'react';
// import PropTypes from 'prop-types';

import Dropdown from '../../UI/Dropdown/Dropdown';
import auth from '../Auth/Auth';

import './UserMenu.scss';

const UserMenu = (props) => {
  const menuItems = () => {
    const items = [];
    if (props.user.name) {
      items.push({ name: `Hi, ${props.user.name}`, disabled: true });
    }
    if (props.authed) {
      items.push({ name: 'My Favorites', rrlink: '/favorites' });
    }
    if (props.authed) {
      items.push({ name: 'Submit a restaurant', rrlink: '/submit' });
    }
    if (props.isAdmin) {
      items.push({ name: 'Administrator console', rrlink: '/admin' });
    }
    items.push(auth.auth(props.authed));
    return items;
  };

  return (
    <div className="UserMenu">
      <Dropdown links={menuItems()}>
      <i className="fas fa-user-circle fa-2x ml-auto mr-2" id="user-menu"></i>
      </Dropdown>
    </div>
  );
};

// UserMenu.propTypes = {}

export default UserMenu;
