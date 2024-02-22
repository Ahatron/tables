<script setup lang="ts">
import MetalGear from '@/assets/metal-gear.vue'
import CombinedShape from '@/assets/combined-shape.vue'
import DotsVertical from '@/assets/DotsVertical.vue';
import MyDropDown from './MyDropDown.vue';
import { ref } from 'vue'

const theadCells = ref(['Наименование еденицы', 'Цена', 'Кол-во', 'Наименование товара', 'Итого']),
  tableContainer = ref<HTMLDivElement>(),
  table = ref<HTMLTableElement>(),
  card = ref<HTMLDivElement>()

let startX = 0, startWidth = 0, thElem: HTMLTableCellElement, resizeElem: HTMLElement, rsCollIdx: number | null;



function resizeStart(e: MouseEvent, index: number) {
  resizeElem = e.target as HTMLDivElement;
  thElem = resizeElem.parentElement as HTMLTableCellElement;
  startX = e.clientX;
  startWidth = thElem.clientWidth - resizeElem.offsetWidth + 1;
  const
    deltaX = e.clientX - startX,
    newWidth = startWidth + deltaX;

  rsCollIdx = index

  if (table.value) {
    const rows = table.value.rows
    for (let i = 0; i < rows.length; i++) {
      const cell = rows[i].cells[index + 2] as HTMLTableCellElement;

      cell.style.borderRight = '3px solid #dee2e6'
    }
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
      const cell = rows[i].cells[rsCollIdx + 2] as HTMLTableCellElement;

      if (i > 0)
        cell.style.borderRight = 'none'
      else cell.style.borderRight = '1px solid #dee2e6'
    }
  }

  rsCollIdx = null
  document.removeEventListener('mousemove', resizing);
  document.removeEventListener('mouseup', resizeEnd)
}


const initialIndex = ref<number | null>(null),
  repIndex = ref<number | null>(null),
  toLeft = ref<boolean | null>(null)

let rightHandler: HTMLDivElement | null, leftHandler: HTMLDivElement | null, shiftX = 0,
  collCopyContainer = document.createElement('div');

function startDrag(e: MouseEvent, index: number) {
  if (initialIndex.value === null)
    initialIndex.value = index;

  if (table.value) {
    const rows = table.value.rows,
      selectedCell = rows[0].cells[initialIndex.value + 2] as HTMLTableCellElement,
      highlighting = document.createElement('div'),
      cellRect = selectedCell.getBoundingClientRect()

    table.value.append(collCopyContainer)

    collCopyContainer.style.pointerEvents = 'none'
    collCopyContainer.style.position = 'absolute'
    collCopyContainer.style.zIndex = '5'
    collCopyContainer.style.top = '0'
    shiftX = (e.clientX - cellRect.left) + 16
    if (tableContainer.value) collCopyContainer.style.left = e.pageX - shiftX + tableContainer.value.scrollLeft + 'px'

    collCopyContainer.style.width = cellRect.width + 'px'



    for (let i = 0; i < rows.length; i++) {
      const cell = rows[i].cells[initialIndex.value + 2] as HTMLTableCellElement,
        copy = cell.cloneNode(true) as HTMLTableCellElement,
        newTR = document.createElement('tr')

      collCopyContainer.append(newTR)

      newTR.style.border = 'none'

      newTR.style.display = 'flex'
      newTR.style.flexDirection = 'column'
      newTR.style.alignItems = 'stretch'
      newTR.style.backgroundColor = 'white'

      newTR.append(copy)

      copy.style.border = 'none'


    }



    collCopyContainer.append(highlighting)

    highlighting.style.position = 'absolute'
    highlighting.style.top = '0'
    highlighting.style.left = '0'
    highlighting.style.right = '0'
    highlighting.style.bottom = '0'
    highlighting.style.backgroundColor = 'rgba(0, 0, 255, 0.3)'
    highlighting.style.zIndex = '6'
  }

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
}


function handleMouseMove(e: MouseEvent) {
  if (table.value && initialIndex.value !== null && tableContainer.value) {
    collCopyContainer.style.left = e.pageX - shiftX + tableContainer.value.scrollLeft + 'px'
  }
}

function handleMouseOver(e: MouseEvent, index: number) {
  if (initialIndex.value === null || initialIndex.value === index) {
    return false;
  }

  console.log('over')

  repIndex.value = index

  if (table.value) {
    const rColl = table.value.rows[0]?.cells[index + 2],
      sColl = table.value.rows[0]?.cells[initialIndex.value + 2]

    rightHandler = rColl.querySelector('.replace-right') as HTMLDivElement
    leftHandler = rColl.querySelector('.replace-left') as HTMLDivElement


    if (initialIndex.value > index) {
      toLeft.value = true;
      leftHandler.style.width = sColl.offsetWidth + 'px'
    } else if (initialIndex.value < index
    ) {
      toLeft.value = false
      rightHandler.style.width = sColl.offsetWidth + 'px'
    } else {
      return false;
    }
  }
}

function replace() {
  if (table.value && initialIndex.value !== null && repIndex.value !== null) {

    [theadCells.value[repIndex.value], theadCells.value[initialIndex.value]] =
      [theadCells.value[initialIndex.value], theadCells.value[repIndex.value]]

    for (let i = 1; i < table.value.rows.length; i++) {
      const row = table.value.rows[i],
        selectedCell = row.cells[initialIndex.value + 2],
        replacementCell = row.cells[repIndex.value + 2]

      if (toLeft.value) {
        selectedCell.after(replacementCell)
        if (leftHandler) leftHandler.style.width = '0'
      } else {
        selectedCell.before(replacementCell)
        if (rightHandler) rightHandler.style.width = '0'
      }
    }
    console.log('replaced')
    initialIndex.value = repIndex.value
  }
}

function mouseLeave() {
  if (rightHandler) rightHandler.style.width = '0'
  if (leftHandler) leftHandler.style.width = '0'
}

function handleMouseUp() {
  initialIndex.value = null;
  repIndex.value = null;
  toLeft.value = null;

  collCopyContainer.innerHTML = ''
  collCopyContainer.remove()

  if (rightHandler) rightHandler.style.width = '0'
  if (leftHandler) leftHandler.style.width = '0'

  rightHandler = null;
  leftHandler = null;

  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
};

</script>

<template>
  <div ref="card"
    class="card shadow rounded pt-1 pb-3 d-flex flex-column"
    style="background-color: #fff">
    <button class="border-0 ms-auto  me-2 "
      style="background-color: inherit; ">
      <MetalGear />
    </button>


    <div ref="tableContainer"
      class="overflow-x-auto overflow-y-auto mt-2 w-100">
      <table ref="table"
        class="table position-relative  table-bordered border-start-0 mb-0">
        <thead>
          <tr>
            <th style="width: 30px;"></th>
            <th style="width: 20px;"></th>
            <th v-for="(header, index) in theadCells"
              :key="header"
              @mousedown="startDrag($event, index)"
              @mouseenter="handleMouseOver($event, index)"
              @mouseleave="mouseLeave"> <span> {{ header }}</span>
              <div class="replace-left"
                @mouseenter="replace"></div>
              <div class="replace-right"
                @mouseenter="replace"></div>
              <div @mousedown.stop="resizeStart($event, index)"
                class="resize-handler"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 4"
            :key="n">
            <td style=" font-weight: 600; font-size: small;">
              <button class="p-0 me-1"
                style="width: 10px;">
                <CombinedShape :vw="10" />
              </button>
              {{ n }}
            </td>
            <td>
              <button class=" m-0 p-0">
                <DotsVertical />
              </button>
            </td>
            <td>
              <MyDropDown class="w-100 " />
            </td>
            <td>
              <div>
                <input type="text"
                  class="w-100 py-1 px-2">
              </div>
            </td>
            <td>
              <div>
                <input type="text"
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
        </tbody>
      </table>
    </div>
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
  min-width: 60px;
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
