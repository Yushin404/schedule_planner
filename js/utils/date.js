export function pad(value) {
  return String(value).padStart(2, "0");
}

export function getCurrentMonthValue() {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}`;
}

export function buildDateKey(monthValue, day) {
  return `${monthValue}-${pad(day)}`;
}

export function isToday(date) {
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

export function getWeekdayClass(index) {
  if (index === 0) return "weekend-sun";
  if (index === 6) return "weekend-sat";
  return "";
}

export function getMonthInfo(monthValue) {
  const [year, month] = monthValue.split("-").map(Number);
  const lastDay = new Date(year, month, 0).getDate();
  return { year, month, lastDay };
}
