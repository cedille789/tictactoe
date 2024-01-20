let cells = [
  [undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined],
];
let placed = 0;

document.querySelectorAll("td").forEach((cell, i) => {
  const row = Math.floor(i / 5);
  const col = i % 5;
  cells[row][col] = cell;

  cell.addEventListener("click", () => {
    if (
      cell.classList.contains("enabled") &&
      !cell.classList.contains("placed")
    ) {
      const ox = placed % 2 == 0 ? "O" : "X";
      cell.classList.add("placed");
      cell.textContent = ox;
      placed++;
      if (checkWin(row, col, ox)) return handleWin(ox);
    }

    if (document.querySelectorAll(".placed").length == 9) {
      [0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24].forEach((j) => {
        document.querySelectorAll("td")[j].classList.add("enabled");
      });
    }
  });
});

function checkWin(row, col, ox) {
  const range5 = [0, 1, 2, 3, 4];

  const horizontal = cells[row];
  const vertical = range5.map((i) => {
    return cells[i][col];
  });
  let diagonal1 = [];
  let diagonal2 = [];
  let diagonal3 = [];
  let diagonal4 = [];

  for (const i of [-2, -1, 0, 1, 2]) {
    if (range5.includes(row + i) && range5.includes(col + i))
      diagonal1.push(cells[row + i][col + i]);
    if (range5.includes(row - i) && range5.includes(col - i))
      diagonal2.push(cells[row - i][col - i]);
    if (range5.includes(row + i) && range5.includes(col - i))
      diagonal3.push(cells[row + i][col - i]);
    if (range5.includes(row - i) && range5.includes(col + i))
      diagonal4.push(cells[row - i][col + i]);
  }

  for (const line of [
    horizontal,
    vertical,
    diagonal1,
    diagonal2,
    diagonal3,
    diagonal4,
  ]) {
    let win = 0;

    console.log(line);

    for (const cell of line) {
      win = cell.textContent == ox ? win + 1 : 0;
      if (win == 3) return true;
    }
  }

  return false;
}

function handleWin(ox) {
  document.querySelector("h1").textContent += `: ${ox} 승`;

  document.querySelectorAll("td").forEach((cell) => {
    if (!cell.classList.contains("placed")) {
      cell.classList.add("placed");
    }
  });
}
