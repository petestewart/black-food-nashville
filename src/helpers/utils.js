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

export default { convertFirebaseCollection };
