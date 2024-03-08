import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'

interface Product {
  name: string
  weight: number
}

interface Cell {
  value: number | '' | Product
  header: 'row number' | 'action' | 'price' | 'count' | 'total' | 'unit name' | 'product name'
  visible: boolean
}

// Дополнительный тип для уточнения значения value

// Уточненный тип Cell для 'unit name' и 'product name'

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
          { value: '', header: 'unit name', visible: true },
          { value: 0, header: 'price', visible: true },
          { value: 0, header: 'count', visible: true },
          { value: '', header: 'product name', visible: true },
          { value: 0, header: 'total', visible: true }
        ]
      }
    ])

  watch(bodyRows, () => {
    for (const row of bodyRows) {
      const count = row.cells.find((cell) => cell.header == 'count')?.value
      const price = row.cells.find((cell) => cell.header == 'price')?.value
      const total = row.cells.find((cell) => cell.header == 'total')
      if (typeof count === 'number' && typeof price == 'number' && typeof total?.value == 'number')
        total.value = price * count
    }
  })

  const table = ref<HTMLTableElement>()
  const newRowCells: Cell[] = [
    { value: '', header: 'row number', visible: true },
    { value: '', header: 'action', visible: true },
    { value: '', header: 'unit name', visible: true },
    { value: 0, header: 'price', visible: true },
    { value: 0, header: 'count', visible: true },
    { value: '', header: 'product name', visible: true },
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

  const totalCount = computed(() =>
    bodyRows.reduce((sum, row) => {
      const count = row.cells.find((cell) => cell.header == 'count')?.value

      if (typeof count !== 'number') return sum

      return sum + count
    }, 0)
  )

  const totalWeight = computed(() => {
    let totalWeight = 0

    for (const row of bodyRows) {
      for (const cell of row.cells) {
        if (cell.header === 'product name' && cell.value && typeof cell.value === 'object') {
          const count = row.cells.find((cell) => cell.header == 'count')?.value

          if (typeof count === 'number') totalWeight += cell.value.weight * count
        }
      }
    }

    return totalWeight
  })

  const priceSum = computed(() =>
    bodyRows.reduce((sum, row) => {
      const price = row.cells.find((cell) => cell.header == 'price')?.value

      if (typeof price == 'number') return sum + price

      return sum
    }, 0)
  )

  const totalSum = computed(() =>
    bodyRows.reduce((sum, row) => {
      const total = row.cells.find((cell) => cell.header == 'total')?.value

      if (typeof total !== 'number') return sum

      return sum + total
    }, 0)
  )

  return {
    headerRow,
    bodyRows,
    table,
    totalCount,
    totalWeight,
    priceSum,
    totalSum,
    addRow,
    columnShowToggle,
    removeRow,
    colReplace
  }
})

export default useGlobalStore

export type { BodyRow, Product }
