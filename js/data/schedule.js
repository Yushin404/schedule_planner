import { buildDateKey, getMonthInfo } from "../utils/date.js";
import { ensureEntry, ensureMonth } from "./storage.js";

export function buildMonthRows(state, monthValue) {
  const { year, month, lastDay } = getMonthInfo(monthValue);
  const monthData = ensureMonth(state, monthValue);
  const rows = [];

  for (let day = 1; day <= lastDay; day += 1) {
    const key = buildDateKey(monthValue, day);
    const entry = ensureEntry(monthData, key);
    const date = new Date(year, month - 1, day);

    rows.push({
      key,
      date,
      ...entry
    });
  }

  return rows;
}

export function updateEntry(state, monthValue, key, field, value) {
  const monthData = ensureMonth(state, monthValue);
  const entry = ensureEntry(monthData, key);
  entry[field] = value;
}
