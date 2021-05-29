const CHAR_CODES = {
  A: 65,
  Z: 90,
}

function toColumn(col) {
  return `
    <div class="column">${col}</div>
  `
}

function toCell() {
  return `
    <div class="cell" contenteditable></div>
  `
}

function createRow(rowNumber = '', content) {
  return `
  <div class="row">
    <div class="row-info">${rowNumber}</div>
    <div class="row-data">${content}</div>
  </div>`
}

function toChar(_, index) {
  return String.fromCharCode(index + CHAR_CODES.A)
}

export function createTable(rowsCount = 150) {
  const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')
  const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('')
  const len = Math.log(rowsCount) * Math.LOG10E + 1 | 0;
  rows.push(createRow(' '.repeat(len), cols))
  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, cells))
  }
  return rows.join('')
}
