// Product
export const getTagData = (tagsArr) => {
  let result = {
    color: '',
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
  return result;
};

// Product (as part of getTagData); ProductCard
export const getStripeColor = (colorCategory) => {
  switch (colorCategory) {
    case 'red':
      return 'maroon';
    case 'white':
      return 'gold';
    case 'rosé':
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
