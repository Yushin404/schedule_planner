import { fetchSharedSchedule } from "./api/sharedRepo.js";
import { getCurrentMonthValue } from "./utils/date.js";
import { downloadJson } from "./utils/dom.js";
import { buildRows, createTemplate } from "./data/normalize.js";
import { filterRows, renderTable, renderMobileList } from "./ui/table.js";
import { renderStats } from "./ui/stats.js";

const monthPicker = document.getElementById("monthPicker");
const filterSelect = document.getElementById("filterSelect");
const reloadBtn = document.getElementById("reloadBtn");
const todayBtn = document.getElementById("todayBtn");
const downloadTemplateBtn = document.getElementById("downloadTemplateBtn");
const downloadCurrentBtn = document.getElementById("downloadCurrentBtn");
const tbody = document.getElementById("tbody");
const mobileList = document.getElementById("mobileList");
const stats = document.getElementById("stats");
const titleMonth = document.getElementById("titleMonth");
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

let sharedData = { updatedAt: null, months: {} };

function formatMonthTitle(monthValue) {
  const [year, month] = monthValue.split("-");
  return `${year}年${Number(month)}月の予定`;
}

function getCurrentRows() {
  const rows = buildRows(sharedData, monthPicker.value);
  return filterRows(rows, filterSelect.value);
}

function render() {
  const allRows = buildRows(sharedData, monthPicker.value);
  const rows = filterRows(allRows, filterSelect.value);

  titleMonth.textContent = formatMonthTitle(monthPicker.value);
  renderStats(stats, allRows);
  renderTable(tbody, rows);
  renderMobileList(mobileList, rows);
}

async function loadSharedData() {
  reloadBtn.disabled = true;
  reloadBtn.textContent = "読み込み中...";

  try {
    sharedData = await fetchSharedSchedule();
    render();
  } catch (error) {
    alert(error.message);
  } finally {
    reloadBtn.disabled = false;
    reloadBtn.textContent = "共有データを再読み込み";
  }
}

function moveToToday() {
  monthPicker.value = getCurrentMonthValue();
  render();

  setTimeout(() => {
    const todayRow = document.querySelector(".mobile-item.today, tr.today");
    if (todayRow) {
      todayRow.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 50);
}

function setupEvents() {
  reloadBtn.addEventListener("click", loadSharedData);
  todayBtn.addEventListener("click", moveToToday);
  monthPicker.addEventListener("change", render);
  filterSelect.addEventListener("change", render);

  downloadTemplateBtn.addEventListener("click", () => {
    downloadJson("shared-schedule-template.json", createTemplate(monthPicker.value));
  });

  downloadCurrentBtn.addEventListener("click", () => {
    downloadJson("shared-schedule.json", sharedData);
  });

  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
}

async function init() {
  monthPicker.value = getCurrentMonthValue();
  setupEvents();
  await loadSharedData();
}

init();
