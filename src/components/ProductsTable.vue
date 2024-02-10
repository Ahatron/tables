<script setup lang="ts">
import MetalGear from '@/assets/metal-gear.vue'
import CombinedShape from '@/assets/combined-shape.vue'
import DotsVertical from '@/assets/DotsVertical.vue';
import MyDropDown from './MyDropDown.vue';
import { ref } from 'vue'

const theadCells = ref([{
  header: 'Наименование еденицы',
  id: 1
}, {
  header: 'Цена',
  id: 2
}, {
  header: 'Кол-во',
  id: 3
}, {
  header: 'Наименование товара',
  id: 4
}, {
  header: 'Итого',
  id: 5
}]),
  verticalLine = document.createElement('div');

let startX = 0, startWidth = 0, tableContainer: HTMLDivElement, table: HTMLTableElement,
  thElem: HTMLTableCellElement, resizeElem: HTMLElement, card: HTMLElement;

function resizeStart(e: MouseEvent | any) {
  card = document.body.querySelector('.card:has(.table)') as HTMLElement;
  tableContainer = card.querySelector('div.overflow-y-auto') as HTMLDivElement;
  table = card.querySelector('table') as HTMLTableElement;
  resizeElem = e.target as HTMLElement;
  thElem = e.target.parentElement;
  startX = e.clientX;
  startWidth = thElem.clientWidth - resizeElem.offsetWidth - 3;
  const thRight = thElem.getBoundingClientRect().right,
    deltaX = e.clientX - startX,
    newWidth = startWidth + deltaX;

  table.append(verticalLine);
  verticalLine.style.display = 'block';
  verticalLine.style.position = 'absolute';
  verticalLine.style.top = '0';
  verticalLine.style.bottom = '0';
  verticalLine.style.width = '2px';
  verticalLine.style.backgroundColor = '#dee2e6';
  verticalLine.style.left = thRight - resizeElem.offsetWidth + tableContainer.scrollLeft + 'px';

  thElem.style.width = `${newWidth}px`;


  document.addEventListener('mousemove', resizing);
}

function resizing(e: MouseEvent) {
  const
    thRight = thElem.getBoundingClientRect().right,
    cardRight = card.getBoundingClientRect().right - 50,
    clientX = e.clientX <= cardRight ? e.clientX : cardRight,
    deltaX = clientX - startX,
    newWidth = startWidth + deltaX;

  verticalLine.style.left = thRight - resizeElem.offsetWidth + tableContainer.scrollLeft + 'px';


  thElem.style.width = `${newWidth}px`;
}

document.addEventListener('mouseup', () => {
  verticalLine.style.display = 'none';
  document.removeEventListener('mousemove', resizing);
});

function onDragStart(e: DragEvent, id: number) {
  const dataTransfer = e.dataTransfer as DataTransfer
  dataTransfer.dropEffect = 'move'
  dataTransfer.effectAllowed = 'move'
  dataTransfer.setData('itemId', id.toString())
}

function onDrop(e: DragEvent, columnCount: number) {
  const dataTransfer = e.dataTransfer as DataTransfer
  const itemId = parseInt(dataTransfer.getData('itemId'))
  theadCells.value = theadCells.value.map((th) => {
    if (th.id == itemId)
      [th.id, theadCells.value[columnCount - 1].id] = [columnCount, th.id]
    return th
  }).sort((a, b) => a.id - b.id)
}
</script>

<template>
  <div class="card shadow rounded pt-1 pb-3 d-flex flex-column"
    style="background-color: #fff">
    <button class="border-0 ms-auto  me-2 "
      style="background-color: inherit; ">
      <MetalGear />
    </button>


    <div class="overflow-y-auto mt-2 w-100">
      <table class="table position-relative  table-bordered border-start-0 mb-0">
        <thead>
          <th style="width: 30px;"></th>
          <th style="width: 20px;"></th>
          <th v-for="n in theadCells.length"
            :key="n"
            @dragover.prevent
            @dragenter.prevent
            @drop="onDrop($event, n)"> <span> {{ theadCells[n - 1].header }}</span>
            <div class="column-drag"
              draggable="true"
              @dragstart="onDragStart($event, theadCells[n - 1].id)"></div>
            <div @mousedown="resizeStart"
              class="resize-handler"></div>
          </th>
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
            <td class="w-auto">
              <MyDropDown class="w-100 " />

            </td>
            <td>
              <input type="number"
                class="w-100 py-1 px-2">
            </td>
            <td>
              <input type="number"
                class="w-100 py-1 px-2">
            </td>
            <td class="w-auto">
              <MyDropDown class="w-100 " />

            </td>
            <td>
              <input type="number"
                class="w-100 py-1 px-2">
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
  padding: 10px;
  vertical-align: middle;
  white-space: nowrap;
  font-size: small;
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

.column-drag {
  position: absolute;
  top: 0;
  left: 0;
  right: 5px;
  bottom: 0;
  padding: 0;
  background-color: transparent;
}

th {
  position: relative;
  max-width: 10%;
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
