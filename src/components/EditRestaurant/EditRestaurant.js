import React from 'react';
import { useParams, withRouter } from 'react-router';

// import PropTypes from 'prop-types';

import RestarauntForm from '../RestaurantForm/RestaurantForm';

import './EditRestaurant.scss';

const EditRestaurant = (props) => {
  const { restId } = useParams();

  return (
    <div>
      <RestarauntForm restId={restId} authed={props.authed} restInfo={props.location.state.restaurant} updateAreaRests={props.updateAreaRests}/>
    </div>
  );
};

// EditRestaurant.propTypes = {}

export default withRouter(EditRestaurant);
