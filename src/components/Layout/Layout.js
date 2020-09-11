import React from 'react';
// import PropTypes from 'prop-types';

import Navbar from '../Navbar/Navbar';
import Filters from '../Filters/Filters';
import Results from '../Results/Results';

import './Layout.scss';

const Layout = (props) => (
    <React.Fragment>
      <Navbar/>
      <div className="content">
        <Filters/>
        <Results/>
      </div>

    </React.Fragment>
);

// Layout.propTypes = {}

export default Layout;
