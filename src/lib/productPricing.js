export const getProductDiscountPercent = (product) => {
  const value = Number(product?.discountPercent ?? 0);
  return Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
};

export const isProductOnSale = (product) =>
  product?.isOnSale !== false && getProductDiscountPercent(product) > 0;

export const getProductEffectivePrice = (product) => {
  const price = Number(product?.price ?? 0);
  if (!Number.isFinite(price)) return 0;
  if (!isProductOnSale(product)) return price;
  return Math.round(price * (1 - getProductDiscountPercent(product) / 100) * 100) / 100;
};
