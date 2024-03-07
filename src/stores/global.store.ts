import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

interface Cell {
  value: { name: string; weight: number } | number | ''
  header: 'row number' | 'action' | 'price' | 'count' | 'total' | 'unit name' | 'product name'
  visible: boolean
}

interface BodyRow {
  rowIdx: number
  cells: Cell[]
}

const useGlobalStore = defineStore('global', () => {
  const headerRow = ref([
      { name: '', visible: true, index: 0 },
      { name: ' ', visible: true, index: 1 },
      { name: 'Наименование еденицы', visible: true, index: 2 },
      { name: 'Цена', visible: true, index: 3 },
      { name: 'Кол-во', visible: true, index: 4 },
      { name: 'Наименование товара', visible: true, index: 5 },
      { name: 'Итого', visible: true, index: 6 }
    ]),
    bodyRows = reactive<BodyRow[]>([
      {
        rowIdx: 0,
        cells: [
          { value: '', header: 'row number', visible: true },
          { value: '', header: 'action', visible: true },
          { value: { name: '', weight: 0 }, header: 'unit name', visible: true },
          { value: 0, header: 'price', visible: true },
          { value: 0, header: 'count', visible: true },
          { value: { name: '', weight: 0 }, header: 'product name', visible: true },
          { value: 0, header: 'total', visible: true }
        ]
      }
    ])
  const table = ref<HTMLTableElement>()
  const newRowCells: Cell[] = [
    { value: '', header: 'row number', visible: true },
    { value: '', header: 'action', visible: true },
    { value: { name: '', weight: 0 }, header: 'unit name', visible: true },
    { value: 0, header: 'price', visible: true },
    { value: 0, header: 'count', visible: true },
    { value: { name: '', weight: 0 }, header: 'product name', visible: true },
    { value: 0, header: 'total', visible: true }
  ]

  function addRow() {
    bodyRows.push({
      rowIdx: bodyRows.length,
      cells: JSON.parse(JSON.stringify(newRowCells))
    })
  }

  function colReplace(initialIndex: number, repIndex: number) {
    headerRow.value[initialIndex].index = repIndex
    headerRow.value[repIndex].index = initialIndex
    headerRow.value.sort((a, b) => a.index - b.index)

    for (const row of bodyRows) {
      ;[row.cells[initialIndex], row.cells[repIndex]] = [
        row.cells[repIndex],
        row.cells[initialIndex]
      ]
    }

    ;[newRowCells[initialIndex], newRowCells[repIndex]] = [
      newRowCells[repIndex],
      newRowCells[initialIndex]
    ]
  }

  function columnShowToggle(colIndex: number, isVisible: boolean) {
    if (!table.value) return

    headerRow.value[colIndex].visible = isVisible
    newRowCells[colIndex].visible = isVisible

    for (let i = 0; i < bodyRows.length; i++) {
      bodyRows[i].cells[colIndex].visible = isVisible
    }
  }

  function removeRow(removeIndex: number) {
    console.log(removeIndex)
    bodyRows.splice(removeIndex, 1)
  }

  return { headerRow, bodyRows, table, addRow, columnShowToggle, removeRow, colReplace }
})

export default useGlobalStore

export type { BodyRow }
