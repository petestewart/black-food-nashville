import React from 'react';
import { NavLink } from 'react-router-dom';

// import PropTypes from 'prop-types';

import './LinksMenu.scss';

class LinksMenu extends React.Component {
  container = React.createRef();

  // static propTypes = {}

  // props.links is an [array] that contains an {object} for each menu-item with the following configuration:
  //  .name is the name of the menu-item that shows
  //  .click will create an onClick action for the menu item
  //  .rrlink will create a react-router <Navlink>
  //  .link will create an <a> tag, and if .external is true, it will open in an external window

  menuItems = () => {
    const { links } = this.props;
    const items = links.map((item, index) => {
      if (item.rrlink) {
        return (
        <NavLink key={index} tag={NavLink} to={item.rrlink}><li>{item.faIcon ? <i className={item.faIcon}></i> : ''} {item.name}</li></NavLink>);
      }
      if (item.link) {
        return (
        <a href={item.link} key={index} target={item.external ? '_blank' : '_self'}><li>{item.faIcon ? <i className={item.faIcon}></i> : ''} {item.name}</li></a>);
      }
      return (<li onClick={item.click} key={index}>{item.faIcon ? <i className={item.faIcon}></i> : ''} {item.name}</li>);
    });
    return items;
  };

  render() {
    return (
      <div className="menu-container">
        <div className="LinksMenu">
          <ul>
            {this.menuItems()}
          </ul>
        </div>
      </div>
    );
  }
}

export default LinksMenu;
