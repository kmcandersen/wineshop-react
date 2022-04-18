import wineRegions from '../assets/wine-regions.js';

// Product
export const getTagData = (tagsArr) => {
  let result = {
    color: '',
    coords: [],
    stripeColor: '',
    country: '',
    countrycode: '',
    rating: '',
    ratingText: '',
    region: '',
    flavors: [],
  };
  for (const tag of tagsArr) {
    if (tag.value.includes('flavor')) {
      result.flavors.push(tag.value.split('-')[1]);
    } else {
      const tagKey = tag.value.split('-')[0];
      const tagValue = tag.value.split('-')[1];
      result[tagKey] = tagValue;
    }
  }
  result.stripeColor = getStripeColor(result.color);
  result.ratingText = getScoreText(result.rating);
  if (result.region !== 'na') {
    result.coords = getCoords(result.region);
  }
  return result;
};

// Product (as part of getTagData); ProductCard
export const getStripeColor = (colorCategory) => {
  switch (colorCategory) {
    case 'red':
      return 'maroon';
    case 'white':
      return 'gold';
    case 'rose':
      return 'pink';
    default:
      return 'lightGray';
  }
};

// Product (as part of getTagData)
export const getScoreText = (rating) => {
  if (rating >= 98) {
    return 'Classic';
  } else if (rating >= 94) {
    return 'Superb';
  } else if (rating >= 90) {
    return 'Excellent';
  } else if (rating >= 87) {
    return 'Very Good';
  } else if (rating >= 83) {
    return 'Good';
  } else if (rating >= 80) {
    return 'Acceptable';
  } else {
    return '';
  }
};

// Product (as part of getTagData)
export const getCoords = (region) => {
  for (const obj of wineRegions) {
    if (obj.region === region) {
      return obj.coords;
    }
  }
};

// convert hyphenated product handle to title, if product page not accessed via link (w/state)
export const makeTitle = (slug) => {
  var words = slug.split('-');
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }
  return words.join(' ');
};
