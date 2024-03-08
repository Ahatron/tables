<script setup
  lang="ts">
  import MyResults from '@/components/MyResults.vue';
  import ActionButton from '@/components/ActionButton.vue';
  import MyDropDown from '@/components/MyDropDown.vue';
  import ColumnOptions from '@/components/ColumnOptions.vue'
  import useGlobalStore from '@/stores/global.store'
  import { onMounted, ref } from 'vue'
  import ColumnResize from '@/utils/ColumnResize';
  import ColumnReplace from '@/utils/ColumnReplace';
  import RowReplace from '@/utils/RowReplace';

  const tableContainer = ref<HTMLDivElement | null>(null),
    table = ref<HTMLTableElement | null>(null),
    card = ref<HTMLDivElement | null>(null),
    globalStore = useGlobalStore()

  let columnResize: ColumnResize, columnReplace: ColumnReplace, rowReplace: RowReplace;

  onMounted(() => {
    if (table.value) {
      globalStore.table = table.value
      columnResize = new ColumnResize(table.value, card.value)
      columnReplace = new ColumnReplace(table.value, tableContainer.value)
      rowReplace = new RowReplace(table.value)
    }
  })

</script>

<template>
  <div ref="card"
    class="card shadow rounded pt-1 pb-3 d-flex flex-column"
    style="background-color: #fff">
    <column-options class="me-2" />

    <div ref="tableContainer"
      class="overflow-auto mt-2 mb-1 pb-3  w-100">
      <table ref="table"
        class="table position-relative  table-bordered border-start-0 mb-0">
        <thead>
          <tr>
            <template v-for="{ name, visible } of globalStore.headerRow"
              :key="name">
              <th v-show="visible"
                @mousedown="columnReplace.startDrag"
                @mouseenter="columnReplace.handleMouseOver"
                @mouseleave="columnReplace.mouseLeave">
                <span :style="{ 'min-width': name === '' ? '60px !important' : '' }"> {{ name }}</span>
                <div class="replace-left"
                  @mouseenter="columnReplace.replace"></div>
                <div class="replace-right"
                  @mouseenter="columnReplace.replace"></div>
                <div @mousedown.stop="columnResize.resizeStart"
                  class="resize-handler"></div>
              </th>
            </template>

          </tr>
        </thead>
        <TransitionGroup name="rows"
          tag="tbody">
          <tr v-for="row, i of globalStore.bodyRows"
            :key="row.rowIdx"
            @mouseenter="rowReplace.rowOver">
            <template v-for="cell of row.cells"
              :key="cell.header">
              <td v-if="cell.header === 'row number'"
                @mousedown="rowReplace.startRowDrag"
                class="action"
                style=" font-weight: 600; font-size: small; user-select: none; width: 30px !important;">
                <div>
                  <button class="p-0 me-3"
                    style="width: 10px;">
                    <img src="../assets/combined-shape.png">
                    <b class="ms-2">{{ i + 1 }}</b>
                  </button>
                </div>
              </td>
              <td v-else-if="cell.header === 'action'"
                class="user-select-none action"
                style="width: 20px !important;">
                <action-button :rowId="i" />
              </td>
              <td v-else-if="cell.header === 'product name' || cell.header === 'unit name'"
                v-show="cell.visible">
                <MyDropDown v-model="cell.value"
                  :name="cell.header"
                  class="w-100" />
              </td>
              <td v-else
                v-show="cell.visible">
                <div>
                  <input v-model="cell.value"
                    @input="() => typeof cell.value == 'number' && cell.value < 0 ? cell.value = 0 : cell.value"
                    type="number"
                    :name="cell.header"
                    :readonly="cell.header == 'total'"
                    class="w-100 py-1 px-2">
                </div>
              </td>
            </template>
          </tr>
        </TransitionGroup>
      </table>
    </div>
    <my-results class="align-self-end me-2" />
  </div>
</template>

<style scoped>
.action {
  cursor: pointer;
}

.action:hover {
  background-color: #dee2e6;
}


td,
th {
  padding: .8rem;
  vertical-align: middle;
  white-space: nowrap;
  font-size: small;
  background-color: white;
}

.rows-enter-active,
.rows-leave-active {
  transition: all 0.5s ease;
}

.rows-enter-from,
.rows-leave-to {
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
