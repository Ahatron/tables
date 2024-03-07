import useGlobalStore from '@/stores/global.store'

class ColumnReplace {
  private initialIndex: number | null = null
  private repIndex: number | null = null
  private toLeft: boolean | null = null
  private rightHandler: HTMLDivElement | null = null
  private leftHandler: HTMLDivElement | null = null
  private shiftX = 0
  private collCopyContainer: HTMLDivElement = document.createElement('div')
  private table: HTMLTableElement | null = null
  private tableContainer: HTMLDivElement | null = null
  private globalStore = useGlobalStore()

  constructor(table: HTMLTableElement | null, tableContainer: HTMLDivElement | null) {
    this.table = table
    this.tableContainer = tableContainer
  }

  startDrag(e: MouseEvent) {
    const target = e.currentTarget as HTMLTableCellElement
    if (this.initialIndex !== null || !this.table) return false

    this.initialIndex = Array.from(this.table.rows[0].cells).findIndex((cell) => cell === target)

    const rows = this.table.rows,
      selectedCell = rows[0].cells[this.initialIndex] as HTMLTableCellElement,
      highlighting = document.createElement('div'),
      cellRect = selectedCell.getBoundingClientRect()

    this.table.append(this.collCopyContainer)

    this.collCopyContainer.style.opacity = '0.8'
    this.collCopyContainer.style.pointerEvents = 'none'
    this.collCopyContainer.style.position = 'absolute'
    this.collCopyContainer.style.zIndex = '5'
    this.collCopyContainer.style.top = '0'
    this.shiftX = e.clientX - cellRect.left + 16
    if (this.tableContainer)
      this.collCopyContainer.style.left =
        e.pageX - this.shiftX + this.tableContainer.scrollLeft + 'px'

    this.collCopyContainer.style.width = cellRect.width + 'px'

    for (let i = 0; i < rows.length; i++) {
      const cell = rows[i].cells[this.initialIndex] as HTMLTableCellElement,
        copy = cell.cloneNode(true) as HTMLTableCellElement,
        newTR = document.createElement('tr')

      this.collCopyContainer.append(newTR)

      newTR.classList.add(
        'border-0',
        'd-flex',
        'flex-column',
        i > 0 ? 'align-items-center' : 'align-items-start'
      )

      newTR.style.backgroundColor = 'white'

      newTR.append(copy)

      copy.classList.add('border-0', 'w-100')
      copy.style.height = cell.offsetHeight + 'px'
    }

    this.collCopyContainer.append(highlighting)

    highlighting.style.position = 'absolute'
    highlighting.style.top = '0'
    highlighting.style.left = '0'
    highlighting.style.right = '0'
    highlighting.style.bottom = '0'
    highlighting.style.backgroundColor = 'rgba(0, 0, 255, 0.3)'
    highlighting.style.zIndex = '6'

    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  private handleMouseMove = (e: MouseEvent) => {
    if (this.table && this.initialIndex !== null && this.tableContainer) {
      this.collCopyContainer.style.left =
        e.pageX - this.shiftX + this.tableContainer.scrollLeft + 'px'
    }
  }

  handleMouseOver(e: MouseEvent) {
    if (this.initialIndex === null || !this.table) return false

    const target = e.currentTarget as HTMLTableCellElement

    this.repIndex = Array.from(this.table.rows[0].cells).findIndex((cell) => cell === target)

    const rColl = this.table.rows[0].cells[this.repIndex],
      sColl = this.table.rows[0].cells[this.initialIndex]

    this.rightHandler = rColl.querySelector('.replace-right') as HTMLDivElement
    this.leftHandler = rColl.querySelector('.replace-left') as HTMLDivElement

    if (this.initialIndex > this.repIndex) {
      this.toLeft = true
      this.leftHandler.style.width = sColl.offsetWidth + 'px'
    } else if (this.initialIndex < this.repIndex) {
      this.toLeft = false
      this.rightHandler.style.width = sColl.offsetWidth + 'px'
    } else {
      return false
    }
  }

  replace() {
    if (this.table && this.initialIndex !== null && this.repIndex !== null) {
      this.globalStore.colReplace(this.initialIndex, this.repIndex)

      this.initialIndex = this.repIndex
    }
  }

  mouseLeave() {
    if (this.rightHandler) this.rightHandler.style.width = '0'
    if (this.leftHandler) this.leftHandler.style.width = '0'
  }

  private handleMouseUp = () => {
    this.initialIndex = null
    this.repIndex = null
    this.toLeft = null

    this.collCopyContainer.innerHTML = ''
    this.collCopyContainer.remove()

    if (this.rightHandler) this.rightHandler.style.width = '0'
    if (this.leftHandler) this.leftHandler.style.width = '0'

    this.rightHandler = null
    this.leftHandler = null

    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }
}

export default ColumnReplace
