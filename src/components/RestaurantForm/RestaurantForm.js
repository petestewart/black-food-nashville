import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
// import PropTypes from 'prop-types';

import restaurantData from '../../helpers/data/restaurantData';
import mapquestData from '../../helpers/data/mapquestData';
import submissionData from '../../helpers/data/submissionData';

import './RestaurantForm.scss';

const RestaurantForm = (props) => {
  const [restaurant, setRestaurant] = useState({
    categories: ['American'],
    doordash: '',
    grubhub: '',
    hours: [],
    latitude: 0,
    location: {
      address1: '',
      address2: '',
      city: 'Nashville',
      zipcode: '',
    },
    longitude: 0,
    name: '',
    phone: '',
    photo: '',
    postmates: '',
    price: '',
    rating: null,
    ubereats: '',
    vegFriendly: false,
    website: '',
    yelp: '',
  });

  const [deleteWarning, setDeleteWarning] = useState(false);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    // warning below about not adding restaurant to the dependency array, but that isn't what we want (?)
    if (props.location.restaurantInfo) {
      // const uid = authData.getUid();
      // setRestaurant({ ...restaurant, ...props.location.restaurantInfo, submittedBy: uid });
      setRestaurant({ ...restaurant, ...props.location.restaurantInfo });
    } else if (props.restId) {
      // const uid = authData.getUid();
      // setRestaurant({ ...restaurant, ...props.restInfo, editedBy: uid });
      setRestaurant({ ...restaurant, ...props.restInfo });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    restaurantData.getAllCategories()
      .then((res) => {
        if (props.location.restaurantInfo) {
          if (props.location.restaurantInfo.categories) {
            const restCats = props.location.restaurantInfo.categories;
            restCats.forEach((cat) => res.push(cat));
          }
        }
        const allCats = ([...new Set(res)]);
        setAllCategories(allCats);
      })
      .catch((err) => console.error(err));
  }, [props.location.restaurantInfo]);

  const inputHandler = (e) => {
    e.preventDefault();
    const updatedRest = { ...restaurant };
    const key = e.target.id;
    if (key.substring(0, 4) === 'LOC_') {
      updatedRest.location[key.substring(4)] = e.target.value;
    } else if (key === 'categories') {
      updatedRest.categories[0] = e.target.value;
    } else {
      updatedRest[key] = e.target.value;
    }
    setRestaurant(updatedRest);
  };

  const dayInputHandler = (e) => {
    const updatedRest = { ...restaurant };
    const index = Number(e.target.id.substring(3));
    updatedRest.hours[index].day = Number(e.target.value);
    updatedRest.hours.sort((x, y) => x.day - y.day || Number(x.start) - Number(y.start));
    setRestaurant(updatedRest);
  };
  const startInputHandler = (e) => {
    const updatedRest = { ...restaurant };
    const index = Number(e.target.id.substring(5));
    updatedRest.hours[index].start = e.target.value;
    updatedRest.hours.sort((x, y) => x.day - y.day || Number(x.start) - Number(y.start));
    setRestaurant(updatedRest);
  };
  const endInputHandler = (e) => {
    const updatedRest = { ...restaurant };
    const index = Number(e.target.id.substring(3));
    if (Number(e.target.value) < Number(restaurant.hours[index].start)) {
      updatedRest.hours[index].is_overnight = true;
    } else {
      updatedRest.hours[index].is_overnight = false;
    }
    updatedRest.hours[index].end = e.target.value;
    setRestaurant(updatedRest);
  };

  const addScheduleHandler = (e) => {
    const updatedRest = { ...restaurant };
    updatedRest.hours = [{
      day: 0,
      start: '0900',
      end: '2100',
      is_overnight: false,
    }];
    setRestaurant(updatedRest);
  };

  const addDayHandler = (e) => {
    e.preventDefault();
    const updatedRest = { ...restaurant };
    const index = Number(e.target.id.substring(3));
    const day = (restaurant.hours[index].day < 6 ? restaurant.hours[index].day + 1 : restaurant.hours[index].day);
    updatedRest.hours.splice((index + 1), 0, {
      ...restaurant.hours[index], day,
    });
    setRestaurant(updatedRest);
  };
  const removeDayHandler = (e) => {
    const updatedRest = { ...restaurant };
    const index = Number(e.target.id.substring(3));
    updatedRest.hours.splice(index, 1);
    setRestaurant(updatedRest);
  };

  const vegInputHandler = (e) => {
    const updatedRest = { ...restaurant };
    updatedRest.vegFriendly = e.target.checked;
    setRestaurant(updatedRest);
  };

  const cancelForm = (e) => {
    e.preventDefault();
    props.history.push({
      pathname: '/home',
    });
  };

  const confirmCoordinates = () => new Promise((resolve, reject) => {
    if ((restaurant.latitude === 0 && restaurant.longitude === 0) || (props.restId && props.location.state.location !== restaurant.location)) {
      mapquestData.getCoordinates(`${restaurant.location.address1} ${restaurant.location.city} TN ${restaurant.location.zipcode}`)
        .then((res) => {
          // const updatedRest = { ...restaurant, latitude: res.latitude, longitude: res.longitude };
          const updatedRest = { ...restaurant, latitude: res.latitude, longitude: res.longitude };
          // setRestaurant(updatedRest);
          resolve(updatedRest);
        })
        .catch((err) => reject(err));
    } else {
      resolve(restaurant);
    }
  });

  const submitRest = (e) => {
    e.preventDefault();
    // let updatedRest = { ...restaurant };
    confirmCoordinates()
      .then((res) => {
        // console.warn(res);
        // if (res.newCoords) { updatedRest = { ...updatedRest, res }; }
        if (props.restId) {
          submissionData.submitRestaurant(res, props.restId)
            .then(() => {
              props.updateAreaRests();
              props.history.push({
                pathname: '/splash',
                message: 'Thank-you for your contribution to BlackFoodNashville.com. We will review your request shortly.',
                next: '/home',
              });
            })
            .catch((err) => console.error(err));
        } else {
          submissionData.submitRestaurant(res)
            .then(() => {
              props.updateAreaRests();
              props.history.push({
                pathname: '/splash',
                message: 'Thank-you for your contribution to BlackFoodNashville.com. We will review your request shortly.',
                next: '/home',
              });
            })
            .catch((err) => console.error(err));
        }
      });
  };

  // const deleteRest = (e) => {
  //   e.preventDefault();
  //   if (deleteWarning) {
  //     restaurantData.deleteRestaurant(props.restId)
  //       .then((res) => {
  //         props.updateAreaRests();
  //         props.history.push({
  //           pathname: '/splash',
  //           message: `${restaurant.name} has been deleted from the database.`,
  //           next: '/home',
  //         });
  //       })
  //       .catch((err) => console.error(err));
  //   } else {
  //     setDeleteWarning(true);
  //   }
  // };
  const deleteRest = (e) => {
    e.preventDefault();
    if (deleteWarning) {
      submissionData.submitRestaurant({ ...restaurant, DELETE: true })
        .then((res) => {
          props.updateAreaRests();
          props.history.push({
            pathname: '/splash',
            message: 'Thank-you for your contribution to BlackFoodNashville.com. We will review your request shortly.',
            next: '/home',
          });
        })
        .catch((err) => console.error(err));
    } else {
      setDeleteWarning(true);
    }
  };

  const cancelDelete = (e) => {
    e.preventDefault();
    setDeleteWarning(false);
  };

  const catInputHandler = (e) => {
    const updatedRest = { ...restaurant };
    const index = Number(e.target.id.substring(3));
    updatedRest.categories[index] = e.target.value;
    setRestaurant({ ...updatedRest, categories: [...new Set(updatedRest.categories)].filter((cat) => cat !== 'none') });
  };

  const addCatHandler = (e) => {
    const updatedRest = { ...restaurant };
    const index = Number(e.target.id.substring(3));
    updatedRest.categories.splice((index + 1), 0, 'none');
    // updatedRest.categories.push('none');
    setRestaurant(updatedRest);
  };
  const removeCatHandler = (e) => {
    const updatedRest = { ...restaurant };
    const index = Number(e.target.id.substring(3));
    updatedRest.categories.splice(index, 1);
    setRestaurant(updatedRest);
  };

  const categoriesForm = () => {
    let catForm = '';
    if (restaurant.categories) {
      catForm = restaurant.categories.map((cat, index) => (
      <div className="d-flex flex-row" key={index}>
        <div className="form-group">
          <select key={index} value={restaurant.categories[index]} id={`cat${index}`} className="form-control" onChange={catInputHandler}>
            {allCategories.map((category, i) => <option value={category} key={i}>{category}</option>)}
          </select>
        </div>
        <div>
          { restaurant.categories.length < 3
            ? <i className="fas fa-plus-circle text-success ml-2" id={`add${index}`} onClick={addCatHandler}></i>
            : <i className="fas fa-plus-circle text-light" id={`add${index}`}></i>
          }
          { restaurant.categories.length === 1
            ? <i className="fas fa-minus-circle ml-2 text-light" id={`rmv${index}`}></i>
            : <i className="fas fa-minus-circle ml-2 text-danger" id={`rmv${index}`} onClick={removeCatHandler}></i>
          }
        </div>
      </div>
      ));
    }
    return catForm;
  };

  const hoursForm = () => {
    let scheduleForm = '';
    if (restaurant.hours.length > 0) {
      scheduleForm = restaurant.hours.map((block, index) => (
      <div className="d-flex flex-row" key={index}>
        <div className="form-group col-md-3">
          <label htmlFor={`hours-day${index}`}>Day</label>
          <select key={index} value={block.day} id={`day${index}`} className="form-control" onChange={dayInputHandler}>
            <option value={0}>Sunday</option>
            <option value={1}>Monday</option>
            <option value={2}>Tuesday</option>
            <option value={3}>Wednesday</option>
            <option value={4}>Thursday</option>
            <option value={5}>Friday</option>
            <option value={6}>Saturday</option>
          </select>
        </div>

        <div className="form-group col-md-3">
          <label htmlFor={`hours-start${index}`}>From</label>
          <select value={block.start} id={`start${index}`} className="form-control" onChange={startInputHandler}>
            <option value="0600">6:00 am</option>
            <option value="0630">6:30 am</option>
            <option value="0700">7:00 am</option>
            <option value="0730">7:30 am</option>
            <option value="0800">8:00 am</option>
            <option value="0830">8:30 am</option>
            <option value="0900">9:00 am</option>
            <option value="0930">9:30 am</option>
            <option value="1000">10:00 am</option>
            <option value="1030">10:30 am</option>
            <option value="1100">11:00 am</option>
            <option value="1130">11:30 am</option>
            <option value="1200">12:00 pm</option>
            <option value="1230">12:30 pm</option>
            <option value="1300">1:00 pm</option>
            <option value="1330">1:30 pm</option>
            <option value="1400">2:00 pm</option>
            <option value="1430">2:30 pm</option>
            <option value="1500">3:00 pm</option>
            <option value="1530">3:30 pm</option>
            <option value="1600">4:00 pm</option>
            <option value="1630">4:30 pm</option>
            <option value="1700">5:00 pm</option>
            <option value="1730">5:30 pm</option>
            <option value="1800">6:00 pm</option>
            <option value="1830">6:30 pm</option>
            <option value="1900">7:00 pm</option>
            <option value="1930">7:30 pm</option>
            <option value="2000">8:00 pm</option>
            <option value="2030">8:30 pm</option>
            <option value="2100">9:00 pm</option>
            <option value="2130">9:30 pm</option>
            <option value="2200">10:00 pm</option>
            <option value="2230">10:30 pm</option>
            <option value="2300">11:00 pm</option>
            <option value="2330">11:30 pm</option>
            <option value="0000">12:00 am</option>
            <option value="0030">12:30 am</option>
            <option value="0100">1:00 am</option>
            <option value="0130">1:30 am</option>
            <option value="0200">2:00 am</option>
            <option value="0230">2:30 am</option>
            <option value="0300">3:00 am</option>
            <option value="0330">3:30 am</option>
            <option value="0400">4:00 am</option>
            <option value="0430">4:30 am</option>
            <option value="0500">5:00 am</option>
            <option value="0530">5:30 am</option>
          </select>
        </div>

        <div className="form-group col-md-3">
          <label htmlFor={`hours-end${index}`}>To</label>
          <select value={block.end} id={`end${index}`} className="form-control" onChange={endInputHandler}>
            <option value="0600">6:00 am</option>
            <option value="0630">6:30 am</option>
            <option value="0700">7:00 am</option>
            <option value="0730">7:30 am</option>
            <option value="0800">8:00 am</option>
            <option value="0830">8:30 am</option>
            <option value="0900">9:00 am</option>
            <option value="0930">9:30 am</option>
            <option value="1000">10:00 am</option>
            <option value="1030">10:30 am</option>
            <option value="1100">11:00 am</option>
            <option value="1130">11:30 am</option>
            <option value="1200">12:00 pm</option>
            <option value="1230">12:30 pm</option>
            <option value="1300">1:00 pm</option>
            <option value="1330">1:30 pm</option>
            <option value="1400">2:00 pm</option>
            <option value="1430">2:30 pm</option>
            <option value="1500">3:00 pm</option>
            <option value="1530">3:30 pm</option>
            <option value="1600">4:00 pm</option>
            <option value="1630">4:30 pm</option>
            <option value="1700">5:00 pm</option>
            <option value="1730">5:30 pm</option>
            <option value="1800">6:00 pm</option>
            <option value="1830">6:30 pm</option>
            <option value="1900">7:00 pm</option>
            <option value="1930">7:30 pm</option>
            <option value="2000">8:00 pm</option>
            <option value="2030">8:30 pm</option>
            <option value="2100">9:00 pm</option>
            <option value="2130">9:30 pm</option>
            <option value="2200">10:00 pm</option>
            <option value="2230">10:30 pm</option>
            <option value="2300">11:00 pm</option>
            <option value="2330">11:30 pm</option>
            <option value="0000">12:00 am</option>
            <option value="0030">12:30 am</option>
            <option value="0100">1:00 am</option>
            <option value="0130">1:30 am</option>
            <option value="0200">2:00 am</option>
            <option value="0230">2:30 am</option>
            <option value="0300">3:00 am</option>
            <option value="0330">3:30 am</option>
            <option value="0400">4:00 am</option>
            <option value="0430">4:30 am</option>
            <option value="0500">5:00 am</option>
            <option value="0530">5:30 am</option>
          </select>
        </div>
        <div>
          <i className="fas fa-plus-circle text-success" id={`add${index}`} onClick={addDayHandler}></i>
          <i className="fas fa-minus-circle ml-2 text-danger" id={`rmv${index}`} onClick={removeDayHandler}></i>
        </div>
      </div>
      ));
    } else {
      scheduleForm = (
        <button className="ml-3" onClick={addScheduleHandler}>Add schedule</button>
      );
    }
    return scheduleForm;
  };

  return (
    <div className="RestaurantForm d-flex justify-content-center w-100">
    <form className="col-10 submit-form">
      <h6 className="text-center m-3">Please enter the correct information</h6>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={restaurant.name}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
        <label>Categories (max 3):</label>
        {categoriesForm()}
      </div>
      <div className="form-check mb-4 ml-1">
        <input
          type="checkbox"
          className="form-check-input"
          id="vegFriendly"
          checked={restaurant.vegFriendly}
          onChange={vegInputHandler}
          />
        <label className="form-check-label ml-2 text-dark" htmlFor="vegFriendly">Vegetarian-friendly</label>
      </div>
      <div className="form-group">
        <label htmlFor="LOC_address1">Street Address</label>
        <input
          type="text"
          className="form-control"
          id="LOC_address1"
          value={restaurant.location.address1}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="LOC_address2">Suite Number (optional)</label>
        <input
          type="text"
          className="form-control"
          id="LOC_address2"
          value={restaurant.location.address2}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="LOC_city">City</label>
        <input
          type="text"
          className="form-control"
          id="LOC_city"
          value={restaurant.location.city}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="LOC_zipcode">Zip Code</label>
        <input
          type="text"
          className="form-control"
          id="LOC_zipcode"
          value={restaurant.location.zipcode}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          className="form-control"
          id="phone"
          value={restaurant.phone}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
      <label>Hours Of Operation:</label>
      {hoursForm()}
      </div>
      <div className="preview-pic">
        {restaurant.photo && restaurant.photo.length > 15
          ? <img className="preview-pic" src={restaurant.photo} alt="preview"/>
          : ''
        }
      </div>
      <div className="form-group">
        <label htmlFor="photo">Photo URL</label>
        <input
          type="url"
          className="form-control"
          id="photo"
          value={restaurant.photo}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="doordash">DoorDash URL</label>
        <input
          type="url"
          className="form-control"
          id="doordash"
          value={restaurant.doordash}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="grubhub">GrubHub URL</label>
        <input
          type="url"
          className="form-control"
          id="grubhub"
          value={restaurant.grubhub}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="postmates">Postmates URL</label>
        <input
          type="url"
          className="form-control"
          id="postmates"
          value={restaurant.postmates}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="ubereats">UberEats URL</label>
        <input
          type="url"
          className="form-control"
          id="ubereats"
          value={restaurant.ubereats}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="website">Restaurant's Website</label>
        <input
          type="url"
          className="form-control"
          id="website"
          value={restaurant.website}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group d-flex justify-content-center">
        <div className="">
        { deleteWarning
          ? <div className="alert alert-danger" role="alert">
            Are you sure you want to request {restaurant.name} to be deleted?
          </div>
          : '' }
        { deleteWarning
          ? <button className="btn btn-secondary mr-5" onClick={cancelDelete}>No, Cancel</button>
          : <button className="btn btn-outline-dark mr-2" onClick={submitRest}>Submit</button>
        }
        { deleteWarning
          ? ''
          : <button className="btn btn-outline-secondary mx-2" onClick={cancelForm}>Cancel</button>
        }
        {props.restId
          ? <button className={`btn ${deleteWarning ? 'btn-danger' : 'btn-outline-danger'} ml-2`} onClick={deleteRest}>{deleteWarning ? 'Yes, ' : '' }Delete</button>
          : ''
        }
        </div>
      </div>
    </form>
  </div>
  );
};

// RestaurantForm.propTypes = {}

export default withRouter(RestaurantForm);
