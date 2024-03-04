class RowReplace {
  private selectedRowIdx: number | null = null
  private selectedRow: HTMLTableRowElement | null = null
  private shiftY = 0
  private dropRow: HTMLTableRowElement = document.createElement('tr')
  private dropRowContent: HTMLTableCellElement = document.createElement('td')
  private table: HTMLTableElement | null = null

  constructor(table: HTMLTableElement | null) {
    this.table = table
  }

  startRowDrag(e: MouseEvent) {
    if (!this.table) return false

    const target = e.currentTarget as HTMLTableCellElement,
      row = target.parentElement as HTMLTableRowElement,
      index = Array.from(this.table.rows).findIndex((item) => item === row),
      rowTop = row.getBoundingClientRect().top,
      tableTop = this.table.getBoundingClientRect().top

    this.selectedRowIdx = index
    this.selectedRow = row
    this.shiftY = e.clientY - rowTop

    row.after(this.dropRow)
    this.dropRow.append(this.dropRowContent)

    this.dropRowContent.textContent = '...'
    this.dropRowContent.style.color = 'transparent'
    this.dropRowContent.style.border = 'none'

    this.dropRow.classList.add('user-select-none', 'rounded-2')
    this.dropRow.style.outline = '4px dashed #a6b7d4'
    this.dropRow.style.outlineOffset = '-3px'
    this.dropRow.style.height = row.clientHeight + 'px'

    row.classList.add('position-absolute', 'shadow', 'opacity-75')
    row.style.top = e.clientY - tableTop - this.shiftY + 'px'
    row.style.zIndex = '5'
    row.style.pointerEvents = 'none'

    for (let i = 0; i < row.children.length; i++) {
      const firstRowCellWidth = this.table.rows[0].cells[i].offsetWidth
      row.cells[i].style.width = firstRowCellWidth + 'px'
    }

    document.addEventListener('mousemove', this.rowMove)
    document.addEventListener('mouseup', this.rowDragEnd)
  }

  private rowMove = (e: MouseEvent) => {
    if (!this.table || !this.selectedRow) return false

    const tableTop = this.table.getBoundingClientRect().top

    this.selectedRow.style.top = e.clientY - tableTop - this.shiftY + 'px'
  }

  rowOver(e: MouseEvent) {
    if (!this.table || this.selectedRowIdx === null) return false

    const row = e.target as HTMLTableRowElement,
      index = Array.from(this.table.rows).findIndex((item) => item === row)

    if (this.selectedRowIdx < index) {
      row.after(this.dropRow)
    } else if (this.selectedRowIdx > index) {
      row.before(this.dropRow)
    }

    this.selectedRowIdx = index
  }

  private rowDragEnd = () => {
    if (!this.table || !this.selectedRow) return false

    this.selectedRow.classList.remove('position-absolute', 'shadow', 'opacity-75')
    this.selectedRow.classList.add('w-100')
    this.selectedRow.style.pointerEvents = ''

    this.selectedRowIdx = null

    this.dropRow.after(this.selectedRow)
    this.dropRow.remove()

    for (let i = 0; i < this.selectedRow.cells.length; i++) {
      this.selectedRow.cells[i].style.width = ''
    }

    const rows = this.table.rows
    for (let i = 1; i < rows.length; i++) {
      const count = rows[i].querySelector('b') as HTMLElement
      count.textContent = `${i}`
    }

    document.removeEventListener('mousemove', this.rowMove)
    document.removeEventListener('mouseup', this.rowDragEnd)
  }
}

export default RowReplace
