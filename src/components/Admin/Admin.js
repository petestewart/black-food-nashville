import React, { useState } from 'react';
import { withRouter } from 'react-router';

import AdminPreview from '../AdminPreview/AdminPreview';

import submissionData from '../../helpers/data/submissionData';

// import PropTypes from 'prop-types';

import './Admin.scss';

const Admin = (props) => {
  const [newRests, setNewRests] = useState([]);
  const [revisedRests, setRevisedRests] = useState([]);
  const [checked, setChecked] = useState(false);
  const [typeOfSubmissions, setTypeOfSubmissions] = useState('');

  window.scrollTo(0, 0);

  const getSubmissions = () => {
    submissionData.getSubmissions()
      .then((res) => {
        setChecked(true);
        setNewRests(res.filter((sub) => !sub.restaurantId));
        setRevisedRests(res.filter((sub) => sub.restaurantId));
      });
  };

  if (!props.isAdmin) {
    props.history.push({
      pathname: '/splash',
      message: 'You are not authorized to view this page',
      next: '/home',
    });
  }

  const subTypeHandler = (e) => {
    setTypeOfSubmissions(e.target.value);
  };

  // const showNew = () => {};

  // const showRevised = () => {};

  // const menuLinks = () => {
  //   const links = [];
  //   if (newRests) { links.push({ name: 'New Restaurants', click: showNew }); }
  //   if (revisedRests) { links.push({ name: 'Revised Restaurants', click: showRevised }); }
  //   return links;
  // };

  return (
    <div className="Admin text-center mt-2 w-100">
      <h3 className="mb-2">Administrator Console</h3>

      <button className="btn btn-outline-success" onClick={getSubmissions}>Check submissions</button>
      { checked
        ? <>
            <p>There are {newRests.length} new submissions and {revisedRests.length} revisions submitted.</p>
            {/* <Dropdown links={menuLinks()}><button className="btn btn-outline-secondary">Show Submissions</button> </Dropdown> */}
            <label htmlFor="submissionType">Show:</label>

            <select name="submissionType" id="submissionType" value={typeOfSubmissions} onChange={subTypeHandler}>
            <option hidden disabled value=""> -- select an option -- </option>
              <option value="new">New Restaurants</option>
              <option value="revised">Revisions</option>
            </select>
          </>
        : ''
      }
      {
        typeOfSubmissions
          ? <AdminPreview typeOfSubmissions={typeOfSubmissions} new={newRests} revised={revisedRests} userLocation={props.location}/>
          : ''
      }
    </div>
  );
};

// Admin.propTypes = {}

export default withRouter(Admin);
