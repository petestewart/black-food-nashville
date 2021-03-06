import React from 'react';
// import PropTypes from 'prop-types';

import './Schedule.scss';

const Schedule = (props) => {
  const content = (data) => data.map((item, index) => (
      <tr key={index}>
        <td className="day">{index === 0 || data[index - 1].day !== item.day ? item.day : ''}</td>
        <td className="hours font-weight-light">{item.hours}</td>
      </tr>
  ));

  return (
    <div className="Schedule">
      <table>
        <tbody>
          {content(props.schedule)}
        </tbody>
      </table>
    </div>
  );
};

// Schedule.propTypes = {}

export default Schedule;
