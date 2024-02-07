<script setup lang="ts">
import MetalGear from '@/assets/metal-gear.vue'
import CombinedShape from '@/assets/combined-shape.vue'
import DotsVertical from '@/assets/DotsVertical.vue';
import MyDropDown from './MyDropDown.vue';

let startX = 0;

function dragStartHandler(e: DragEvent) {
  console.log('start')
  startX = e.clientX
}
function dragHandler(e: DragEvent | any) {
  const target = e.target,
    targetRect = target.getBoundingClientRect(),
    parent = target.parentElement,
    rectParent = parent.getBoundingClientRect();

  console.log(e.clientX - startX)
  parent.width = rectParent.width + (e.clientX - startX)
}
function dragEnd(e: DragEvent | any) {
  console.log(e.target?.parentElement)
  const parent = e.target?.parentElement,
    rectParent = parent.getBoundingClientRect();



  parent.width = rectParent.width + (e.clientX - startX)
}
</script>

<template>
  <div class="shadow rounded pt-1 pb-3 d-flex flex-column"
    style="background-color: #fff">
    <button class="border-0 ms-auto me-2"
      style="background-color: inherit">
      <MetalGear />
    </button>

    <table class="table table-responsive  table-bordered border-start-0 mt-2">
      <thead>
        <th></th>
        <th></th>
        <th> <span> Наименование еденицы</span>
          <div @dragstart="dragStartHandler"
            @drag="dragHandler"
            @dragend="dragEnd"
            class="resize-handler"></div>
        </th>
        <th> <span> Цена</span>
          <div @dragstart="dragStartHandler"
            @drag="dragHandler"
            @dragend="dragEnd"
            class="resize-handler"></div>
        </th>
        <th> <span> Кол-во</span>
          <div @dragstart="dragStartHandler"
            @drag="dragHandler"
            @dragend="dragEnd"
            class="resize-handler"></div>
        </th>
        <th> <span> Название товара</span>
          <div @dragstart="dragStartHandler"
            @drag="dragHandler"
            @dragend="dragEnd"
            class="resize-handler"></div>
        </th>
        <th> <span> Итого</span>
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
  user-select: none;

}


th {
  position: relative;
}

.resize-handler {
  position: absolute;
  right: -9px;
  top: 0;
  bottom: 0;
  width: 5px;
  cursor: col-resize;
  background: transparent;
  z-index: 3;
}

thead > th:nth-child(2) {
  text-overflow: ellipsis;
  overflow: hidden;
  width: 1%;
}

th + th {
  border-left: 1px solid #dee2e6;
}


th:nth-child(3),
tr > td:nth-child(3) {
  border-right: 2px solid #dee2e6;
}

tbody > tr,
tbody > tr > td {
  border: 0;
}
</style>
