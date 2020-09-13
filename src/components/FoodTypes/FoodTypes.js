import React from 'react';

const FoodTypeButtons = () => {
  const shops = data.getBusinesses();
  const typesRaw = [];
  shops.forEach((shop) => z
    shop.type.forEach((type) => {
      typesRaw.push(type);
    });
  });
  const types = [...new Set(typesRaw)];
  types.sort();
  let domString = `
  <div class='filter-group'>
    <span class="category-title">Category</span>
    <ul>
      <li><i class="far fa-check-square filter-btn" id="filter-f-all"></i> All</li>`;
  types.forEach((type) => {
    const buttonId = type.replace(/ /g, '_');
    domString += `<li><i class="far fa-square filter-btn" id="filter-f-${buttonId}"></i> ${type}</li>`;
  });
  domString += '</ul></div>';
  return domString;
};

export FoodTypeButtons
