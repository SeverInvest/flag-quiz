export function formatNumber(num = "0") {
  return num.toString().split('').reverse().map((item, index) => {
    if ((index + 1) % 3 === 0) {
      return " " + item;
    } else {
      return item;
    }
  }).reverse();
};