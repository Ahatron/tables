<script setup lang="ts">
import MyResults from '@/components/MyResults.vue';
import CombinedShape from '@/assets/combined-shape.vue'
import ActionButton from './ActionButton.vue';
import MyDropDown from '@/components/MyDropDown.vue';
import ColumnOptions from '@/components/ColumnOptions.vue'
import useGlobalStore from '@/stores/global.store'
import { onMounted, ref } from 'vue'

const globalStore = useGlobalStore()

const
  tableContainer = ref<HTMLDivElement>(),
  table = ref<HTMLTableElement>(),
  card = ref<HTMLDivElement>()

onMounted(() => {
  globalStore.table = table.value
})


let startX = 0,
  startWidth = 0,
  thElem: HTMLTableCellElement,
  rsCollIdx: number | null;


function resizeStart(e: MouseEvent) {
  if (!table.value) return false

  const resizeElem = e.currentTarget as HTMLDivElement

  thElem = resizeElem.parentElement as HTMLTableCellElement;
  startX = e.clientX;
  startWidth = thElem.clientWidth - resizeElem.offsetWidth + 1;

  const deltaX = e.clientX - startX,
    newWidth = startWidth + deltaX;

  const headers = Array.from(table.value.rows[0].cells)
  rsCollIdx = headers.findIndex(cell => cell === thElem);

  // headers.forEach(cell => cell.style.width = cell.offsetWidth - resizeElem.offsetWidth + 'px')

  const rows = table.value.rows

  for (let i = 0; i < rows.length; i++) {
    const cell = rows[i].cells[rsCollIdx] as HTMLTableCellElement;
    cell.style.borderRight = '3px solid #dee2e6'
  }

  thElem.style.width = `${newWidth}px`;


  document.addEventListener('mousemove', resizing);
  document.addEventListener('mouseup', resizeEnd);
}

function resizing(e: MouseEvent) {
  if (card.value) {
    const cardRight = card.value.getBoundingClientRect().right - 50,
      clientX = e.clientX <= cardRight ? e.clientX : cardRight,
      deltaX = clientX - startX,
      newWidth = startWidth + deltaX;


    thElem.style.width = `${newWidth}px`;
  }
}

function resizeEnd() {
  if (table.value && rsCollIdx !== null) {
    const rows = table.value.rows

    for (let i = 0; i < rows.length; i++) {
      const cell = rows[i].cells[rsCollIdx] as HTMLTableCellElement;

      cell.style.borderRight = ''
    }
  }

  rsCollIdx = null
  document.removeEventListener('mousemove', resizing);
  document.removeEventListener('mouseup', resizeEnd)
}


let initialIndex: number | null = null,
  repIndex: number | null = null,
  toLeft: boolean | null = null,
  rightHandler: HTMLDivElement | null,
  leftHandler: HTMLDivElement | null,
  shiftX = 0;
const collCopyContainer = document.createElement('div');

function startDrag(e: MouseEvent) {
  const target = e.currentTarget as HTMLTableCellElement
  if (initialIndex !== null || !table.value) return false

  initialIndex = Array.from(table.value.rows[0].cells).findIndex(cell => cell === target);

  const rows = table.value.rows,
    selectedCell = rows[0].cells[initialIndex] as HTMLTableCellElement,
    highlighting = document.createElement('div'),
    cellRect = selectedCell.getBoundingClientRect()


  table.value.append(collCopyContainer)

  collCopyContainer.style.opacity = '0.8'
  collCopyContainer.style.pointerEvents = 'none'
  collCopyContainer.style.position = 'absolute'
  collCopyContainer.style.zIndex = '5'
  collCopyContainer.style.top = '0'
  shiftX = (e.clientX - cellRect.left) + 16
  if (tableContainer.value) collCopyContainer.style.left = e.pageX - shiftX + tableContainer.value.scrollLeft + 'px'

  collCopyContainer.style.width = cellRect.width + 'px'



  for (let i = 0; i < rows.length; i++) {
    const cell = rows[i].cells[initialIndex] as HTMLTableCellElement,
      copy = cell.cloneNode(true) as HTMLTableCellElement,
      newTR = document.createElement('tr')

    collCopyContainer.append(newTR)

    newTR.classList.add('border-0', 'd-flex', 'flex-column', i > 0 ? 'align-items-center' : 'align-items-start')

    newTR.style.backgroundColor = 'white'

    newTR.append(copy)

    copy.classList.add('border-0', 'w-100')
    copy.style.height = cell.offsetHeight + 'px'
  }


  collCopyContainer.append(highlighting)

  highlighting.style.position = 'absolute'
  highlighting.style.top = '0'
  highlighting.style.left = '0'
  highlighting.style.right = '0'
  highlighting.style.bottom = '0'
  highlighting.style.backgroundColor = 'rgba(0, 0, 255, 0.3)'
  highlighting.style.zIndex = '6'

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
}

function handleMouseMove(e: MouseEvent) {
  if (table.value && initialIndex !== null && tableContainer.value) {
    collCopyContainer.style.left = e.pageX - shiftX + tableContainer.value.scrollLeft + 'px'
  }
}

function handleMouseOver(e: MouseEvent) {
  if (initialIndex === null || !table.value) return false;

  const target = e.currentTarget as HTMLTableCellElement

  repIndex = Array.from(table.value.rows[0].cells).findIndex(cell => cell === target);

  const rColl = table.value.rows[0].cells[repIndex],
    sColl = table.value.rows[0].cells[initialIndex]

  rightHandler = rColl.querySelector('.replace-right') as HTMLDivElement
  leftHandler = rColl.querySelector('.replace-left') as HTMLDivElement


  if (initialIndex > repIndex) {
    toLeft = true;
    leftHandler.style.width = sColl.offsetWidth + 'px'
  } else if (initialIndex < repIndex
  ) {
    toLeft = false
    rightHandler.style.width = sColl.offsetWidth + 'px'
  } else {
    return false;
  }
}

function replace() {
  if (table.value && initialIndex !== null && repIndex !== null) {

    [globalStore.theadCells[initialIndex], globalStore.theadCells[repIndex]] =
      [globalStore.theadCells[repIndex], globalStore.theadCells[initialIndex]]

    for (let i = 0; i < table.value.rows.length; i++) {
      const row = table.value.rows[i],
        selectedCell = row.cells[initialIndex],
        replacementCell = row.cells[repIndex]

      if (toLeft) {
        selectedCell.after(replacementCell)
      } else {
        selectedCell.before(replacementCell)
      }
    }
    initialIndex = repIndex
  }
}

function mouseLeave() {
  if (rightHandler) rightHandler.style.width = '0'
  if (leftHandler) leftHandler.style.width = '0'
}

function handleMouseUp() {
  initialIndex = null;
  repIndex = null;
  toLeft = null;

  collCopyContainer.innerHTML = ''
  collCopyContainer.remove()

  if (rightHandler) rightHandler.style.width = '0'
  if (leftHandler) leftHandler.style.width = '0'

  rightHandler = null;
  leftHandler = null;

  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
};


let selectedRowIdx: number | null = null, selectedRow: HTMLTableRowElement, shiftY = 0;
const dropRow: HTMLTableRowElement = document.createElement('tr'),
  dropRowContent: HTMLTableCellElement = document.createElement('td')


function startRowDrag(e: MouseEvent) {
  if (!table.value) return false;

  const target = e.currentTarget as HTMLTableCellElement,
    row = target.parentElement as HTMLTableRowElement,
    index = Array.from(table.value.rows).findIndex(item => item === row),
    rowTop = row.getBoundingClientRect().top,
    tableTop = table.value.getBoundingClientRect().top

  selectedRowIdx = index
  selectedRow = row
  shiftY = e.clientY - rowTop

  row.after(dropRow)
  dropRow.append(dropRowContent)

  dropRowContent.textContent = '...'
  dropRowContent.style.color = 'transparent'
  dropRowContent.style.border = 'none'

  dropRow.classList.add('user-select-none', 'rounded-2')
  dropRow.style.outline = '4px dashed #a6b7d4'
  dropRow.style.outlineOffset = '-3px'
  dropRow.style.height = row.clientHeight + 'px'

  row.classList.add('position-absolute', 'shadow', 'opacity-75')
  row.style.top = e.clientY - tableTop - shiftY + 'px'
  row.style.zIndex = '5'
  row.style.pointerEvents = 'none'

  for (let i = 0; i < row.children.length; i++) {
    const firstRowCellWidth = table.value.rows[0].cells[i].offsetWidth
    row.cells[i].style.width = firstRowCellWidth + 'px'
  }

  document.addEventListener("mousemove", rowMove);
  document.addEventListener('mouseup', rowDragEnd);
}

function rowMove(e: MouseEvent) {
  if (!table.value) return false;

  const tableTop = table.value.getBoundingClientRect().top

  selectedRow.style.top = e.clientY - tableTop - shiftY + 'px'
}

function rowOver(e: MouseEvent) {
  if (!table.value || selectedRowIdx === null) return false;

  const row = e.target as HTMLTableRowElement,
    index = Array.from(table.value.rows).findIndex(item => item === row)


  if (selectedRowIdx < index) {
    row.after(dropRow)
  } else if (selectedRowIdx > index) {
    row.before(dropRow)
  }

  selectedRowIdx = index
}

function rowDragEnd() {
  if (!table.value) return false

  selectedRow.classList.remove('position-absolute', 'shadow', 'opacity-75')
  selectedRow.classList.add('w-100')
  selectedRow.style.pointerEvents = ''

  selectedRowIdx = null

  dropRow.after(selectedRow)
  dropRow.remove()

  for (let i = 0; i < selectedRow.cells.length; i++) {
    selectedRow.cells[i].style.width = ''
  }

  const rows = table.value.rows
  for (let i = 1; i < rows.length; i++) {
    const count = rows[i].querySelector('b') as HTMLElement
    count.textContent = `${i}`
  }


  document.removeEventListener('mousemove', rowMove)
  document.removeEventListener('mouseup', rowDragEnd)
}

</script>

<template>
  <div ref="card"
    class="card shadow rounded pt-1 pb-3 d-flex flex-column"
    style="background-color: #fff">
    <column-options />


    <div ref="tableContainer"
      class="overflow-auto mt-2 mb-1 pb-3  w-100">
      <table ref="table"
        class="table position-relative  table-bordered border-start-0 mb-0">
        <thead>
          <tr>
            <th v-for="({ name }, i) in globalStore.theadCells"
              :key="name"
              @mousedown="startDrag"
              @mouseenter="handleMouseOver"
              @mouseleave="mouseLeave">
              <span :style="{ 'min-width': i > 1 ? '60px !important' : '' }"> {{ name }}</span>
              <div class="replace-left"
                @mouseenter="replace"></div>
              <div class="replace-right"
                @mouseenter="replace"></div>
              <div @mousedown.stop="resizeStart"
                class="resize-handler"></div>
            </th>
          </tr>
        </thead>
        <TransitionGroup name="list"
          tag="tbody">
          <tr v-for="(row, i) in globalStore.rows"
            :key="row.id"
            @mouseenter="rowOver">
            <td @mousedown="startRowDrag"
              style=" font-weight: 600; font-size: small; user-select: none; width: 30px !important;">
              <div>
                <button class="p-0 me-3"
                  style="width: 10px;">
                  <CombinedShape :vw="10" />
                  <b class="ms-2">{{ i + 1 }}</b>
                </button>
              </div>
            </td>
            <td class="user-select-none "
              style="width: 20px !important;">
              <action-button :rowId="row.id" />
            </td>
            <td>
              <MyDropDown class="w-100 " />
            </td>
            <td>
              <div>
                <input type="number"
                  class="w-100 py-1 px-2">
              </div>
            </td>
            <td>
              <div>
                <input type="number"
                  class="w-100 py-1 px-2">
              </div>
            </td>
            <td>
              <MyDropDown class="w-100 " />

            </td>
            <td>
              <div>
                <input type="number"
                  class="w-100 py-1 px-2">
              </div>
            </td>
          </tr>
        </TransitionGroup>
      </table>
    </div>
    <my-results class="align-self-end me-2" />
  </div>
</template>

<style scoped>
td,
th {
  padding: .8rem;
  vertical-align: middle;
  white-space: nowrap;
  font-size: small;
  background-color: white;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

td {
  text-align: center;
}


thead > tr > th:first-child {
  border-left: none;
}

thead > tr > th:last-child {
  border-right: none;
}


th > span {
  display: inline-block;
  padding: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: inherit;
  max-width: 100%;
  background-color: transparent;
}


.replace-left,
.replace-right {
  position: absolute;
  width: 0;
  height: 100%;
  transition: .05s;
  background-color: rgba(0, 0, 255, 0.5);
}

.replace-left {
  left: 0;
  top: 0;
}

.replace-right {
  right: 0;
  top: 0;
}

th {
  position: relative;
  user-select: none;
}

.dark {
  background-color: #00000041;
}

.resize-handler {
  position: absolute;
  right: -9px;
  top: 0;
  bottom: 0;
  width: 17px;
  cursor: col-resize;
  background: transparent;
  z-index: 3;
  content: '';
  padding: 0;
}

.resize-handler:active {
  cursor: grabbing;
}

th:last-child > .resize-handler {
  display: none;
}

thead > th:nth-child(2) {
  text-overflow: ellipsis;
  overflow: hidden;
  width: 1%;
}



th:hover {
  background-color: #dee2e6;
}

th + th {
  border-left: 1px solid #dee2e6;
}

tbody > tr,
tbody > tr > td {
  border: 0;
}
</style>
