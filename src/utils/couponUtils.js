const COUPONS = [];

const generateCouponCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "BDS";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const generateCoupon = (discountPercent) => {
  if (discountPercent < 1 || discountPercent > 100) {
    throw new Error("Discount must be between 1% and 100%");
  }

  const now = Date.now();
  const existingCoupon = COUPONS.find(
    (c) => c.discount === discountPercent && c.expiresAt > now
  );

  if (existingCoupon) return existingCoupon;

  const coupon = {
    code: generateCouponCode(),
    discount: discountPercent,
    expiresAt: now + 7 * 24 * 60 * 60 * 1000,
  };

  COUPONS.push(coupon);
  return coupon;
};

export const validateCoupon = (code, cartLength) => {
  const cleanCode = code.trim().toUpperCase();

  if (!/^BDS[0-9A-Z]{5}$/.test(cleanCode)) {
    return { isValid: false, message: "❌ Invalid coupon format" };
  }

  const coupon = COUPONS.find((c) => c.code === cleanCode);

  if (!coupon) return { isValid: false, message: "❌ Coupon not found" };
  if (coupon.expiresAt < Date.now()) {
    return { isValid: false, message: "❌ Coupon expired" };
  }
  if (cartLength < 1) {
    return { isValid: false, message: "🛒 Add at least 1 item to apply coupon" };
  }

  return {
    isValid: true,
    discountPercentage: coupon.discount,
    message: `✅ Coupon Applied: ${coupon.discount}% OFF`,
  };
};

export const listValidCoupons = () => {
  const now = Date.now();
  return COUPONS.filter((c) => c.expiresAt > now).map((c, i) => ({
    id: i + 1,
    code: c.code,
    discount: `${c.discount}%`,
    expiresAt: new Date(c.expiresAt).toLocaleString(),
  }));
};
