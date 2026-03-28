import { getMonthInfo, buildDateKey } from "../utils/date.js";

const DEFAULT_ENTRY = {
  plan: "なし",
  done: "",
  pickup: "",
  note: ""
};

export function buildRows(sharedData, monthValue) {
  const { year, month, lastDay } = getMonthInfo(monthValue);
  const monthData = sharedData.months?.[monthValue] ?? {};
  const rows = [];

  for (let day = 1; day <= lastDay; day += 1) {
    const key = buildDateKey(monthValue, day);
    const date = new Date(year, month - 1, day);
    rows.push({
      key,
      date,
      ...DEFAULT_ENTRY,
      ...(monthData[key] ?? {})
    });
  }

  return rows;
}

export function createTemplate(monthValue) {
  const rows = buildRows({ months: {} }, monthValue);
  const monthMap = {};

  rows.forEach((row) => {
    monthMap[row.key] = {
      plan: row.plan,
      done: row.done,
      pickup: row.pickup,
      note: row.note
    };
  });

  return {
    updatedAt: new Date().toISOString(),
    months: {
      [monthValue]: monthMap
    }
  };
}
