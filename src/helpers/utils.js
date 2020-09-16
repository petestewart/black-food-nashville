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

export default { convertFirebaseCollection, convertYelpSearchResult };
