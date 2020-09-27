import React, { useState, useEffect } from 'react';
import restaurantData from '../../helpers/data/restaurantData';
import submissionData from '../../helpers/data/submissionData';
import userData from '../../helpers/data/userData';
// import PropTypes from 'prop-types';

import AdminPreviewCard from '../AdminPreviewCard/AdminPreviewCard';

import './AdminPreview.scss';

const AdminPreview = (props) => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (props.typeOfSubmissions) {
      setSubmissions(props[props.typeOfSubmissions]);
    }
  }, [props]);

  const approveSubmission = (submission) => new Promise((resolve, reject) => {
    if (submission.restaurantId) {
      restaurantData.updateRestaurant(submission, submission.restaurantId)
        .then((res) => {
          submissionData.deleteSubmission(submission.id)
            .then(() => {
              props.getSubmissions();
              resolve(res);
            })
            .catch((err) => console.error(err));
        });
    } else {
      restaurantData.createRestaurant(submission)
        .then((res) => {
          submissionData.deleteSubmission(submission.id)
            .then(() => {
              props.getSubmissions();
              resolve(res);
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    }
  });

  const denySubmission = (submission) => new Promise((resolve, reject) => {
    submissionData.deleteSubmission(submission.id)
      .then(() => {
        props.getSubmissions();
        resolve();
      })
      .catch((err) => console.error(err));
  });

  const cards = (restaurants) => {
    let cardList = <div className="text-center w-100 border-blue">No remaining {props.typeOfSubmissions} submissions</div>;
    if (restaurants.length > 0) {
      cardList = restaurants.map((restaurant) => <AdminPreviewCard key={restaurant.id} restaurant={restaurant} userLocation={props.location} authed={props.authed} approveSubmission={approveSubmission} denySubmission={denySubmission}/>);
    }
    return cardList;
  };

  return (
    <div>
      {cards(submissions)}
    </div>
  );
};

// AdminPreview.propTypes = {}

export default AdminPreview;
