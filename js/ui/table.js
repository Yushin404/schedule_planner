import { WEEKDAYS } from "../config.js";
import { escapeHtml } from "../utils/dom.js";
import { getWeekdayClass, isToday } from "../utils/date.js";

export function filterRows(rows, filter) {
  if (filter === "plan") return rows.filter((row) => row.plan === "あり");
  if (filter === "pickup") return rows.filter((row) => row.pickup.trim() !== "");
  if (filter === "done") return rows.filter((row) => row.done === "あり");
  return rows;
}

export function renderTable(tbody, rows) {
  tbody.innerHTML = "";

  rows.forEach((row) => {
    const tr = document.createElement("tr");

    if (isToday(row.date)) tr.classList.add("today");
    if (row.plan === "あり") tr.classList.add("has-plan");
    if (row.done === "あり") tr.classList.add("done");

    const weekday = row.date.getDay();
    const weekdayLabel = WEEKDAYS[weekday];
    const dateLabel = `${row.date.getMonth() + 1}/${row.date.getDate()}`;

    tr.innerHTML = `
      <td>${dateLabel}</td>
      <td class="${getWeekdayClass(weekday)}">${weekdayLabel}</td>
      <td>
        <select data-key="${row.key}" data-field="plan">
          <option value="なし" ${row.plan === "なし" ? "selected" : ""}>なし</option>
          <option value="あり" ${row.plan === "あり" ? "selected" : ""}>あり</option>
        </select>
      </td>
      <td>
        <select data-key="${row.key}" data-field="done">
          <option value="" ${row.done === "" ? "selected" : ""}>未入力</option>
          <option value="あり" ${row.done === "あり" ? "selected" : ""}>あり</option>
        </select>
      </td>
      <td>
        <input type="text" placeholder="18:30 / 不要" value="${escapeHtml(row.pickup)}" data-key="${row.key}" data-field="pickup" />
      </td>
      <td>
        <textarea class="note" placeholder="補足を入力" data-key="${row.key}" data-field="note">${escapeHtml(row.note)}</textarea>
      </td>
    `;

    tbody.appendChild(tr);
  });
}
