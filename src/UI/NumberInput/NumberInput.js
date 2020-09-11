import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import './NumberInput.scss';

const NumberInput = (props) => {
  const [value, setValue] = useState(5);

  useEffect(() => props.click(value), [value, props]);

  const changeHandler = (e) => {
    // props.click(value);
    setValue(e.target.value);
  };

  return (
    <div className="NumberInput">
      <input
        type="number"
        id="quantity"
        name="quantity"
        min="1"
        max="20"
        value={value}
        onChange={changeHandler} />
    </div>
  );
};

// NumberInput.propTypes = {}

export default NumberInput;
