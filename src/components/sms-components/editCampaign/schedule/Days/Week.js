let curr = new Date();
let week = [];
let days = [];
for (let i = 1; i <= 7; i++) {
  let first = curr.getDate() - curr.getDay() + i;
  let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
  let weekday = new Date(day).toLocaleString("en-us", { weekday: "long" });
  let date = new Date(day).toLocaleString("en-us", {
    month: "short",
    day: "2-digit"
  });
  week.push(day);
  days.push({ day: weekday, date: date });
}

module.exports = {
  week: week,
  day: days
};
