export const getProductDiscountPercent = (product) => {
  const value = Number(product?.discountPercent ?? 0);

  if (!Number.isFinite(value)) return 0;

  return Math.max(0, Math.min(value, 100));
};

export const isProductOnSale = (product) => {
  if (product?.isOnSale === false) return false;

  return getProductDiscountPercent(product) > 0;
};

export const getProductEffectivePrice = (product, fallbackPrice = product?.price ?? 0) => {
  const basePrice = Number(fallbackPrice ?? product?.price ?? 0);

  if (!Number.isFinite(basePrice)) return 0;
  if (!isProductOnSale(product)) return basePrice;

  const discountPercent = getProductDiscountPercent(product);
  return Number((basePrice * (1 - discountPercent / 100)).toFixed(2));
};
