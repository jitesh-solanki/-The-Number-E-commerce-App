// Format price in Indian Rupees
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

// Format price without currency symbol (just number with commas)
export const formatNumber = (price) => {
  return new Intl.NumberFormat('en-IN').format(price);
};