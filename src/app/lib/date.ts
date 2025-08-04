export const getStartOfMonth = (date = new Date(), subtractMonths = 0): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() - subtractMonths);
  newDate.setDate(1);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

export const getEndOfMonth = (date = new Date(), subtractMonths = 0): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() - subtractMonths + 1);
  newDate.setDate(0);
  newDate.setHours(23, 59, 59, 999);
  return newDate;
};