import { getCurrentMonthValue } from "./utils/date.js";
import { loadState, saveState } from "./data/storage.js";
import { buildMonthRows, updateEntry } from "./data/schedule.js";
import { filterRows, renderTable } from "./ui/table.js";
import { renderStats } from "./ui/stats.js";

const monthPicker = document.getElementById("monthPicker");
const generateBtn = document.getElementById("generateBtn");
const todayBtn = document.getElementById("todayBtn");
const filterSelect = document.getElementById("filterSelect");
const exportBtn = document.getElementById("exportBtn");
const importInput = document.getElementById("importInput");
const tbody = document.getElementById("tbody");
const stats = document.getElementById("stats");

let state = loadState();

function bindRowInputs() {
  document.querySelectorAll("[data-key][data-field]").forEach((element) => {
    const handler = (event) => {
      const key = event.target.dataset.key;
      const field = event.target.dataset.field;
      updateEntry(state, monthPicker.value, key, field, event.target.value);
      saveState(state);
      render();
    };

    element.addEventListener("change", handler);
    element.addEventListener("input", handler);
  });
}

function render() {
  const rows = buildMonthRows(state, monthPicker.value);
  const filteredRows = filterRows(rows, filterSelect.value);

  renderTable(tbody, filteredRows);
  renderStats(stats, rows);
  bindRowInputs();
}

function exportJson() {
  const blob = new Blob([JSON.stringify(state, null, 2)], {
    type: "application/json"
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "pickup-schedule-data.json";
  link.click();
  URL.revokeObjectURL(link.href);
}

async function importJson(file) {
  if (!file) return;

  const text = await file.text();
  state = JSON.parse(text);
  saveState(state);
  render();
  alert("読み込みが完了しました。");
}

function moveToToday() {
  monthPicker.value = getCurrentMonthValue();
  render();

  setTimeout(() => {
    const todayRow = document.querySelector("tr.today");
    if (todayRow) {
      todayRow.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 50);
}

function setupEvents() {
  generateBtn.addEventListener("click", render);
  monthPicker.addEventListener("change", render);
  filterSelect.addEventListener("change", render);
  todayBtn.addEventListener("click", moveToToday);
  exportBtn.addEventListener("click", exportJson);

  importInput.addEventListener("change", async (event) => {
    try {
      await importJson(event.target.files[0]);
    } catch {
      alert("JSONの読み込みに失敗しました。");
    } finally {
      event.target.value = "";
    }
  });
}

function init() {
  monthPicker.value = getCurrentMonthValue();
  setupEvents();
  render();
}

init();
