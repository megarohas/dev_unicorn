import moment from "moment";

export const formatMoney = (amount: any) => {
  return Number.parseFloat(amount)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const formatDate = (date: any, time?: any) => {
  date = Date.parse(date);
  if (!time) return moment(date).format("DD.MM.YYYY");
  else return moment(date).format("DD.MM.YYYY HH:mm");
};
