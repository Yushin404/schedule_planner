export function renderStats(root, rows) {
  const planned = rows.filter((row) => row.plan === "あり").length;
  const done = rows.filter((row) => row.done === "あり").length;
  const pickup = rows.filter((row) => row.pickup.trim() !== "").length;
  const notes = rows.filter((row) => row.note.trim() !== "").length;

  root.innerHTML = `
    <div class="stat"><div class="label">予定あり</div><div class="value">${planned}</div></div>
    <div class="stat"><div class="label">実績あり</div><div class="value">${done}</div></div>
    <div class="stat"><div class="label">送迎時刻入力</div><div class="value">${pickup}</div></div>
    <div class="stat"><div class="label">補足あり</div><div class="value">${notes}</div></div>
  `;
}
