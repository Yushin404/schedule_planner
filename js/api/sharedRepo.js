import { SHARED_DATA_PATH } from "../config.js";

export async function fetchSharedSchedule() {
  const response = await fetch(`${SHARED_DATA_PATH}?t=${Date.now()}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("共有JSONの読み込みに失敗しました。");
  }

  return await response.json();
}
