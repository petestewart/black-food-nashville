import React from 'react';
import Switch from 'react-switch';
// import PropTypes from 'prop-types';

const SwitchUI = (props) => (
      <label className="d-flex align-items-center">
        <Switch className={`mr-2 ${props.className}`} onChange={props.onChange} checked={props.checked} onColor={'#DC3545'} offColor={'#696969'} uncheckedIcon={false} checkedIcon={false} height={20} width={35}/>
        <span style={{ fontSize: '0.9rem' }}>{props.children}</span>
      </label>
);

// Switch.propTypes = {}

export default SwitchUI;
