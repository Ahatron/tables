import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

const useGlobalStore = defineStore('global', () => {
  const theadCells = ref([
      { name: '', visible: true, index: 0 },
      { name: ' ', visible: true, index: 1 },
      { name: 'Наименование еденицы', visible: true, index: 2 },
      { name: 'Цена', visible: true, index: 3 },
      { name: 'Кол-во', visible: true, index: 4 },
      { name: 'Наименование товара', visible: true, index: 5 },
      { name: 'Итого', visible: true, index: 6 }
    ]),
    rows = reactive([
      [
        { value: '', header: theadCells.value[0].name },
        { value: '', header: theadCells.value[1].name },
        { value: '', header: theadCells.value[2].name },
        { value: 0, header: theadCells.value[3].name },
        { value: 0, header: theadCells.value[4].name },
        { value: '', header: theadCells.value[5].name },
        { value: 0, header: theadCells.value[6].name }
      ]
    ])
  const table = ref<HTMLTableElement>()

  function addRow() {
    rows.push([
      { value: '', header: theadCells.value[0].name },
      { value: '', header: theadCells.value[1].name },
      { value: '', header: theadCells.value[2].name },
      { value: 0, header: theadCells.value[3].name },
      { value: 0, header: theadCells.value[4].name },
      { value: '', header: theadCells.value[5].name },
      { value: 0, header: theadCells.value[6].name }
    ])
  }

  function columnShowToggle(colIndex: number, show: boolean) {
    if (!table.value) return

    const rows = table.value.rows
    for (let i = 0; i < rows.length; i++) {
      const cell = rows[i].cells[colIndex]

      cell.style.display = show ? '' : 'none'
    }
  }

  function removeRow(removeIndex: number) {
    rows.splice(removeIndex, 1)
  }

  return { theadCells, rows, table, addRow, columnShowToggle, removeRow }
})

export default useGlobalStore
