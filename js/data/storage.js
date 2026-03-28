import { STORAGE_KEY, DEFAULT_ENTRY } from "../config.js";

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function ensureMonth(state, monthValue) {
  if (!state[monthValue]) {
    state[monthValue] = {};
  }
  return state[monthValue];
}

export function ensureEntry(monthData, key) {
  if (!monthData[key]) {
    monthData[key] = { ...DEFAULT_ENTRY };
  }
  return monthData[key];
}
