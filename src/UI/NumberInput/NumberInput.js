import React from 'react';
// import PropTypes from 'prop-types';

import './NumberInput.scss';

const numberInput = (props) => {
  // const [value, setValue] = useState(props.radius); // removed this to make NumberInput a dumb component

  // useEffect(() => props.click(value), [value, props]);

  const changeHandler = (e) => {
    props.click(Number(e.target.value));
  };

  return (
    <div className="NumberInput">
      <input
        type="number"
        id="quantity"
        name="quantity"
        min="1"
        max="50"
        value={props.value}
        onChange={changeHandler} />
    </div>
  );
};

// NumberInput.propTypes = {}

export default numberInput;
