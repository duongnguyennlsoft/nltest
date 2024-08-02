import discountCode from "../data/discountCodes.json";
export const checkDiscountCode = (code: string) => {
  return discountCode.find((e) => e.code === code);
};

export const getDiscountValue = (
  discount: Discount | undefined,
  totalInCart: number
) => {
  return Math.min(
    totalInCart,
    Math.floor(
      discount?.isPercent
        ? ((discount?.discountValue ?? 0) / 100) * totalInCart
        : discount?.discountValue ?? 0
    )
  );
};
