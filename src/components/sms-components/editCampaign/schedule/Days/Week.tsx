let curr: any = new Date();
let week: any = [];
let days: any = [];
for (let i: number = 1; i <= 7; i++) {
  let first: any = curr.getDate() - curr.getDay() + i;
  let day: any = new Date(curr.setDate(first)).toISOString().slice(0, 10);
  let weekday: any = new Date(day).toLocaleString("en-us", { weekday: "long" });
  let date: any = new Date(day).toLocaleString("en-us", {
    month: "short",
    day: "2-digit"
  });
  week.push(day);
  days.push({ day: weekday, date: date });
}

export { week, days as day };
