import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Product {
  id: number
}

// fsfsdfs

const useGlobalStore = defineStore('global', () => {
  const theadCells = ref([
      { name: '', visible: true },
      { name: '', visible: true },
      { name: 'Наименование еденицы', visible: true },
      { name: 'Цена', visible: true },
      { name: 'Кол-во', visible: true },
      { name: 'Наименование товара', visible: true },
      { name: 'Итого', visible: true }
    ]),
    rows = ref<Product[]>([{ id: 1 }, { id: 2 }, { id: 3 }])
  const table = ref<HTMLTableElement>()

  function addRow() {
    rows.value.push({ id: Date.now() })
  }

  function columnShowToggle(colIndex: number, show: boolean) {
    if (!table.value) return

    const rows = table.value.rows
    for (let i = 0; i < rows.length; i++) {
      const cell = rows[i].cells[colIndex]

      cell.style.display = show ? '' : 'none'
    }
  }

  function removeRow(removeId: number) {
    rows.value = rows.value.filter(({ id }) => id !== removeId)
  }

  return { theadCells, rows, table, addRow, columnShowToggle, removeRow }
})

export default useGlobalStore
