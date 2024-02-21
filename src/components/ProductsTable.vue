<script setup lang="ts">
import MetalGear from '@/assets/metal-gear.vue'
import CombinedShape from '@/assets/combined-shape.vue'
import DotsVertical from '@/assets/DotsVertical.vue';
import MyDropDown from './MyDropDown.vue';
import { ref, onMounted } from 'vue'

const theadCells = ref(['Наименование еденицы', 'Цена', 'Кол-во', 'Наименование товара', 'Итого']),
  verticalLine = document.createElement('div');

let startX = 0, startWidth = 0, tableContainer = ref<HTMLDivElement>(), table = ref<HTMLTableElement>(),
  thElem: HTMLTableCellElement, resizeElem: HTMLElement, card: HTMLElement;

onMounted(() => {
  card = document.body.querySelector('.card:has(.table)') as HTMLElement;
})

function resizeStart(e: MouseEvent | any) {
  resizeElem = e.target as HTMLElement;
  thElem = e.target.parentElement;
  startX = e.clientX;
  startWidth = thElem.clientWidth - resizeElem.offsetWidth - 9;
  const container = tableContainer.value as HTMLDivElement,
    thRight = thElem.getBoundingClientRect().right,
    deltaX = e.clientX - startX,
    newWidth = startWidth + deltaX;

  if (table.value)
    table.value.append(verticalLine);
  verticalLine.style.display = 'block';
  verticalLine.style.position = 'absolute';
  verticalLine.style.top = '0';
  verticalLine.style.bottom = '0';
  verticalLine.style.width = '2px';
  verticalLine.style.backgroundColor = '#dee2e6';
  verticalLine.style.left = thRight - resizeElem.offsetWidth + container.scrollLeft + 'px';

  thElem.style.width = `${newWidth}px`;


  document.addEventListener('mousemove', resizing);
  document.addEventListener('mouseup', resizeEnd);
}

function resizing(e: MouseEvent) {
  const container = tableContainer.value as HTMLDivElement,
    thRight = thElem.getBoundingClientRect().right,
    cardRight = card.getBoundingClientRect().right - 50,
    clientX = e.clientX <= cardRight ? e.clientX : cardRight,
    deltaX = clientX - startX,
    newWidth = startWidth + deltaX;

  verticalLine.style.left = thRight - resizeElem.offsetWidth + container.scrollLeft + 'px';


  thElem.style.width = `${newWidth}px`;
}

function resizeEnd() {
  verticalLine.style.display = 'none';
  document.removeEventListener('mousemove', resizing);
  document.removeEventListener('mouseup', resizeEnd)
}


let initialIndex = ref<number | null>(null);
const col1 = ref<HTMLTableCellElement | null>(null),
  col1Rect = col1.value?.getBoundingClientRect()
const col2 = ref<HTMLTableCellElement | null>(null),
  col2Rect = col2.value?.getBoundingClientRect();
let left1 = 0, left2 = 0, right1 = 0, right2 = 0;
const position1 = ref(''), position2 = ref('')

function startDrag(e: MouseEvent, index: number) {
  if (initialIndex.value === null)
    initialIndex.value = index;

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
};

let repColIdx: number | null = null;

function handleMouseMove(e: MouseEvent) {
  if (table.value && repColIdx !== null && col1Rect && col2Rect) {
    let cell = table.value.rows[0].cells[repColIdx + 1];
    let rRect = cell.getBoundingClientRect();
    console.log(e.clientX, ~~rRect.x, ~~rRect.right, cell)

    left1 = col1Rect.left
    left2 = col2Rect.left
    right1 = col1Rect.right
    right2 = col2Rect.right

    position1.value = left1 + ' ' + right1
    position2.value = left2 + ' ' + right2
  }
};

function handleMouseOver(e: MouseEvent, index: number) {
  if (initialIndex.value === null || initialIndex.value === index) {
    e.preventDefault()
    return false;
  }

  if (table.value) {
    const rRect = table.value.rows[0]?.cells[index + 2].getBoundingClientRect();
    repColIdx = index
    for (let i = 1; i < table.value.rows.length; i++) {
      const row = table.value.rows[i],
        selectedCell = row?.cells[initialIndex.value + 2],
        replacementCell = row?.cells[index + 2]

      if (initialIndex.value > index &&
        e.clientX <= rRect.left + rRect.width) {

        if (i === 1) [theadCells.value[index], theadCells.value[initialIndex.value]] =
          [theadCells.value[initialIndex.value], theadCells.value[index]]

        selectedCell.after(replacementCell)
      } else if (initialIndex.value < index &&
        e.clientX >= rRect.right - rRect.width) {

        if (i === 1) [theadCells.value[index], theadCells.value[initialIndex.value]] =
          [theadCells.value[initialIndex.value], theadCells.value[index]]

        selectedCell.before(replacementCell)
      } else {
        e.preventDefault()
        return false;
      }
    }
    initialIndex.value = index
  }
}

function handleMouseUp() {
  initialIndex.value = null;
  repColIdx = -1;
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
};

</script>

<template>
  <div class="card shadow rounded pt-1 pb-3 d-flex flex-column"
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
              @mouseover="handleMouseOver($event, index)"> <span> {{ header }}</span>
              <div @mousedown.stop="resizeStart"
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
            <td ref="col2">
              <div>
                <input type="text"
                  class="w-100 py-1 px-2">
              </div>{{ position1 }}
            </td>
            <td ref="col1">
              <div>
                <input type="text"
                  class="w-100 py-1 px-2">
              </div>{{ position2 }}
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
