const CHAR_CODES = {
  A: 65,
  Z: 90,
}

function toColumn(col, index) {
  return `
    <div class="column unselectable" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function toCell(_, col) {
  return `
    <div class="cell" data-col="${col}" contenteditable></div>
  `
}

function createRow(rowNumber = '', content) {
  const resize = rowNumber
    ? '<div class="row-resize" data-resize="row"></div>'
    : ''
  return `
  <div class="row" data-type="resizable">
    <div class="row-info unselectable">
        ${rowNumber ? rowNumber : ''}
        ${resize}
    </div>
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
  // const len = Math.log(rowsCount) * Math.LOG10E + 1 | 0;
  // rows.push(createRow(' '.repeat(len), cols))
  rows.push(createRow(null, cols))
  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, cells))
  }
  return rows.join('')
}
