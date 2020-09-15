import React from 'react';
// import PropTypes from 'prop-types';

import './Dropdown.scss';

class Dropdown extends React.Component {
  container = React.createRef();

  state = {
    open: false,
  };

  // static propTypes = {}

  handleButtonClick = () => {
    this.setState((state) => ({
      open: !state.open,
    }));
  };

  handleClickOutside = (e) => {
    if (this.container.current && !this.container.current.contains(e.target)) {
      this.setState({
        open: false,
      });
    }
  };

  menuItems = () => {
    const { links } = this.props;
    const items = links.map((item, index) => {
      if (item.link) {
        return (
      <a href={item.link} key={index} target={item.external ? '_blank' : '_self'}><li>{item.name}</li></a>);
      }
      return (<li onClick={item.click} key={index}>{item.name}</li>);
    });
    return items;
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    return (
      <div className={this.props.links.length > 0 ? 'dd-container' : 'dd-disabled'} ref={this.container} onClick={this.props.links.length > 0 ? this.handleButtonClick : ''}>
        {this.props.children}
        {this.state.open && (
        <div className="dd-menu">
          <ul>
            {this.menuItems()}
          </ul>
        </div>
        )}
      </div>
    );
  }
}

export default Dropdown;
