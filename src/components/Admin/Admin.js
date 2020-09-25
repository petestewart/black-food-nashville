import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import submissionData from '../../helpers/data/submissionData';

// import PropTypes from 'prop-types';

import './Admin.scss';

const Admin = (props) => {
  const [newRests, setNewRests] = useState([]);
  const [revisedRests, setRevisedRests] = useState([]);

  window.scrollTo(0, 0);

  useEffect(() => {
    submissionData.getSubmissions()
      .then((res) => {
        console.warn(res);
        const subsNew = res.filter((sub) => !sub.restaurantId);
        const subsRev = res.filter((sub) => sub.restaurantId);
        setNewRests(subsNew);
        setRevisedRests(subsRev);
      });
  }, []);

  if (!props.isAdmin) {
    props.history.push({
      pathname: '/splash',
      message: 'You are not authorized to view this page',
      next: '/home',
    });
  }
  return (
    <div className="Admin">
      <h3 className="text-center mt-2 w-100">Administrator Console</h3>
      <p>There are {newRests.length} new submissions and {revisedRests.length} revisions submitted.</p>
      <h4>New Restaraunts</h4>
      <div className="d-flex justify-content-center w-100">

      </div>
      <h4>Revised Restaraunts</h4>
      <div className="d-flex justify-content-center w-100">

      </div>
    </div>
  );
};

// Admin.propTypes = {}

export default withRouter(Admin);
