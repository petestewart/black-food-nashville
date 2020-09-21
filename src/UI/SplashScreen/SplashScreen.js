import React, { useEffect } from 'react';
import { withRouter } from 'react-router';

// import PropTypes from 'prop-types';

import './SplashScreen.scss';

const SplashScreen = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const leaveSplash = () => {
    props.history.push({
      pathname: props.location.next,
    },
    { state: {} });
  };

  return (
    <div className="SplashScreen">
      <div className="message">
        <h3>{props.location.message}</h3>
        <button className="btn-btn-success" onClick={leaveSplash}>Ok</button>
      </div>
    </div>
  );
};

// SplashScreen.propTypes = {}

export default withRouter(SplashScreen);
