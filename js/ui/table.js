import { WEEKDAYS } from "../config.js";
import { getWeekdayClass, isToday } from "../utils/date.js";
import { escapeHtml } from "../utils/dom.js";

export function filterRows(rows, filter) {
  if (filter === "plan") return rows.filter((row) => row.plan === "あり");
  if (filter === "pickup") return rows.filter((row) => row.pickup.trim() !== "");
  if (filter === "done") return rows.filter((row) => row.done === "あり");
  return rows;
}

function planBadge(plan) {
  return plan === "あり"
    ? `<span class="badge plan-yes">あり</span>`
    : `<span class="badge plan-no">なし</span>`;
}

function doneBadge(done) {
  return done === "あり"
    ? `<span class="badge done-yes">あり</span>`
    : `<span class="badge done-empty">未入力</span>`;
}

export function renderTable(tbody, rows) {
  tbody.innerHTML = "";

  rows.forEach((row) => {
    const tr = document.createElement("tr");
    if (isToday(row.date)) tr.classList.add("today");
    if (row.plan === "あり") tr.classList.add("has-plan");
    if (row.done === "あり") tr.classList.add("done");

    const weekday = row.date.getDay();
    const dateLabel = `${row.date.getMonth() + 1}/${row.date.getDate()}`;

    tr.innerHTML = `
      <td>${dateLabel}</td>
      <td class="${getWeekdayClass(weekday)}">${WEEKDAYS[weekday]}</td>
      <td>${planBadge(row.plan)}</td>
      <td>${doneBadge(row.done)}</td>
      <td>${escapeHtml(row.pickup) || "—"}</td>
      <td>${escapeHtml(row.note) || "—"}</td>
    `;
    tbody.appendChild(tr);
  });
}

export function renderMobileList(root, rows) {
  root.innerHTML = rows.map((row) => {
    const weekday = row.date.getDay();
    const classes = [
      "mobile-item",
      isToday(row.date) ? "today" : "",
      row.plan === "あり" ? "has-plan" : "",
      row.done === "あり" ? "done" : ""
    ].filter(Boolean).join(" ");

    return `
      <article class="${classes}">
        <div class="mobile-head">
          <div class="mobile-date">${row.date.getMonth() + 1}/${row.date.getDate()} <span class="${getWeekdayClass(weekday)}">${WEEKDAYS[weekday]}</span></div>
          <div>${planBadge(row.plan)}</div>
        </div>
        <div class="mobile-grid">
          <div class="mobile-row"><div class="mobile-key">実績</div><div>${doneBadge(row.done)}</div></div>
          <div class="mobile-row"><div class="mobile-key">送迎時刻</div><div>${escapeHtml(row.pickup) || "—"}</div></div>
          <div class="mobile-row"><div class="mobile-key">補足</div><div>${escapeHtml(row.note) || "—"}</div></div>
        </div>
      </article>
    `;
  }).join("");
}
