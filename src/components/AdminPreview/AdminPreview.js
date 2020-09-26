import React, { useState, useEffect } from 'react';
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

  const cards = (restaurants) => {
    let cardList = <div className="text-center w-100 border-blue">No remaining {props.typeOfSubmissions} submissions</div>;
    if (restaurants.length > 0) {
      cardList = restaurants.map((restaurant) => <AdminPreviewCard key={restaurant.id} restaurant={restaurant} userLocation={props.location} authed={props.authed} />);
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
