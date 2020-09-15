import React from 'react';
// import PropTypes from 'prop-types';

import './Dropdown.scss';

class Dropdown extends React.Component {
  container = React.createRef();

  state = {
    open: false,
  };

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

  // static propTypes = {}

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    return (
    <div className="dd-container" ref={this.container}>
        <i className="fas fa-car-side fa-2x text-muted" onClick={this.handleButtonClick}></i>
      {this.state.open && (
      <div class="dd-menu">
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
          <li>Option 4</li>
        </ul>
      </div>
      )}
    </div>
    );
  }
}

export default Dropdown;
