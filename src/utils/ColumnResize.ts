class ColumnResize {
  private startX = 0
  private startWidth = 0
  private thElem: HTMLTableCellElement | null = null
  private rsCollIdx: number | null = null
  private table: HTMLTableElement | null = null
  private card: HTMLDivElement | null = null

  constructor(table: HTMLTableElement | null, card: HTMLDivElement | null) {
    this.table = table
    this.card = card
  }

  resizeStart(e: MouseEvent) {
    if (!this.table) return false
    const resizeElem = e.currentTarget as HTMLDivElement

    this.thElem = resizeElem.parentElement as HTMLTableCellElement
    this.startX = e.clientX
    this.startWidth = this.thElem.clientWidth - resizeElem.offsetWidth + 1

    const deltaX = e.clientX - this.startX,
      newWidth = this.startWidth + deltaX

    const headers = Array.from(this.table.rows[0].cells)
    this.rsCollIdx = headers.findIndex((cell) => cell === this.thElem)

    // headers.forEach(cell => cell.style.width = cell.offsetWidth - resizeElem.offsetWidth + 'px')

    const rows = this.table.rows

    for (let i = 0; i < rows.length; i++) {
      const cell = rows[i].cells[this.rsCollIdx] as HTMLTableCellElement
      cell.style.borderRight = '3px solid #dee2e6'
    }

    this.thElem.style.width = `${newWidth}px`

    document.addEventListener('mousemove', this.resizing)
    document.addEventListener('mouseup', this.resizeEnd)
  }

  private resizing = (e: MouseEvent) => {
    if (!this.thElem || !this.card) return false

    const cardRight = this.card.getBoundingClientRect().right - 50,
      clientX = e.clientX <= cardRight ? e.clientX : cardRight,
      deltaX = clientX - this.startX,
      newWidth = this.startWidth + deltaX

    this.thElem.style.width = `${newWidth}px`
  }

  private resizeEnd = () => {
    if (this.table && this.rsCollIdx !== null) {
      const rows = this.table.rows

      for (let i = 0; i < rows.length; i++) {
        const cell = rows[i].cells[this.rsCollIdx] as HTMLTableCellElement

        cell.style.borderRight = ''
      }
    }

    this.rsCollIdx = null
    document.removeEventListener('mousemove', this.resizing)
    document.removeEventListener('mouseup', this.resizeEnd)
  }
}

export default ColumnResize
