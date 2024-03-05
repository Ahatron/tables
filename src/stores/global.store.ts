import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

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
    bodyRows = reactive([
      [
        { value: '', header: headerRow.value[0].name, rowIndex: 0 },
        { value: '', header: headerRow.value[1].name, rowIndex: 1 },
        { value: '', header: headerRow.value[2].name, rowIndex: 2 },
        { value: 0, header: headerRow.value[3].name, rowIndex: 3 },
        { value: 0, header: headerRow.value[4].name, rowIndex: 4 },
        { value: '', header: headerRow.value[5].name, rowIndex: 5 },
        { value: 0, header: headerRow.value[6].name, rowIndex: 6 }
      ]
    ])
  const table = ref<HTMLTableElement>()

  function addRow() {
    bodyRows.push([
      { value: '', header: headerRow.value[0].name, rowIndex: 0 },
      { value: '', header: headerRow.value[1].name, rowIndex: 1 },
      { value: '', header: headerRow.value[2].name, rowIndex: 2 },
      { value: 0, header: headerRow.value[3].name, rowIndex: 3 },
      { value: 0, header: headerRow.value[4].name, rowIndex: 4 },
      { value: '', header: headerRow.value[5].name, rowIndex: 5 },
      { value: 0, header: headerRow.value[6].name, rowIndex: 6 }
    ])
  }

  function replaceIdx(initialIndex: number, repIndex: number) {
    headerRow.value[initialIndex].index = repIndex
    headerRow.value[repIndex].index = initialIndex
    headerRow.value.sort((a, b) => a.index - b.index)
  }

  function columnShowToggle(colIndex: number, show: boolean) {
    if (!table.value) return

    const bodyRows = table.value.rows

    for (let i = 0; i < bodyRows.length; i++) {
      const cell = bodyRows[i].cells[colIndex]

      cell.style.display = show ? '' : 'none'
    }
  }

  function removeRow(removeIndex: number) {
    console.log(removeIndex)
    bodyRows.splice(removeIndex, 1)
  }

  return { headerRow, bodyRows, table, addRow, columnShowToggle, removeRow, replaceIdx }
})

export default useGlobalStore
