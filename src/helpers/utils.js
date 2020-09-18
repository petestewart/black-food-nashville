import moment from 'moment';

const convertFirebaseCollection = (data) => {
  const objectCollection = data;
  const arrayCollection = [];
  if (objectCollection) {
    Object.keys(objectCollection).forEach((itemId) => {
      objectCollection[itemId].id = itemId;
      arrayCollection.push(objectCollection[itemId]);
    });
  }
  return arrayCollection;
};

const convertYelpSearchResult = (data) => {
  const result = [];
  data.forEach((rest) => {
    if (!rest.is_closed) {
      const restInfo = {
        yelpId: rest.id,
        name: rest.name,
        photo: rest.image_url,
        address: rest.location.display_address,
        phone: rest.display_phone,
        categories: rest.categories.map((cat) => cat.title),
      };
      result.push(restInfo);
    }
  });
  return result;
};

const getWeeklyHours = (hours) => {
  const schedule = [];
  hours.forEach((block) => {
    const day = moment(block.day, 'd').format('dddd');
    schedule.push({ day, hours: `${moment(block.start, 'HHmm').format('h:mm a')} - ${moment(block.end, 'HHmm').format('h:mm a')}` });
  });
  return schedule;
};

const checkIfOpen = (hours) => {
  if (!hours) { return false; }
  const today = moment().day();
  const timeNow = Number(moment().format('HHmm'));
  const hoursOpenToday = hours.filter((obj) => obj.day === today);
  const isOpenNow = hoursOpenToday.some((obj) => {
    const openHours = { ...obj };
    openHours.start = Number(openHours.start);
    if (openHours.is_overnight) {
      openHours.end = 2400;
    } else { openHours.end = Number(openHours.end); }
    return (timeNow >= openHours.start && timeNow <= openHours.end);
  });
  return isOpenNow;
};

export default {
  convertFirebaseCollection, convertYelpSearchResult, checkIfOpen, getWeeklyHours,
};
