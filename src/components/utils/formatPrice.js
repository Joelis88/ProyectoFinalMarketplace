export const formatPrice = (price) => {
  if (typeof price !== "number") {
    price = Number(price);
  }

  return price.toLocaleString("es-CL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};