import moment from "moment";

const dateconvert = (props) => {
  if (props) {
    return moment(props).format("YYYY-MM-DD");
  }
  return "-";
};
const adminDateconvert = (props) => {
  if (props) {
    return moment(props).format("YYYY-MM-DD");
  }
  return null;
};
const yearconvert = (props) => {
  if (props) {
    return moment(props).format("DD-MM-YYYY");
  }
  return "-";
};
const datediff = (first, second) => {
  let date1 = moment(first);
  let date2 = moment(second);
  let days = date2.diff(date1, "days");
  return days;
};
const ageCalculate = (ageValue) => {
  let birthdate = new Date(ageValue);
  let cur = new Date();
  let diff = cur - birthdate;
  let age = Math.floor(diff / 31557600000);
  return age;
};

export { dateconvert, datediff, yearconvert, ageCalculate, adminDateconvert };
