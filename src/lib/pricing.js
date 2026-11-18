export const getProductPrice = (price, saleSettings) => {
  const basePrice = Number(price) || 0;
  const discountPercent = Number(saleSettings?.percent) || 0;

  if (!saleSettings?.active || discountPercent < 1 || discountPercent > 99) {
    return basePrice;
  }

  return Math.round(basePrice * (1 - discountPercent / 100));
};
