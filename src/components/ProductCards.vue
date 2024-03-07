<template>
  <TransitionGroup name="list"
    tag="div">
    <div v-for="(row, index) in globalStore.bodyRows"
      :key="row.rowIdx"
      class="card p-3 shadow mb-4">
      <p class="description mb-0">Номер строки</p>
      <div class="mb-1">
        <button class="me-1">
          <img src="../assets/combined-shape.png">
        </button>
        <span style="font-size: small">{{ index + 1 }}</span>
      </div>

      <p class="description mb-0">Действие</p>
      <div class="position-relative">
        <action-button :rowId="row.rowIdx" />
        <div>
          <template v-for="(cell, index) of row.cells"
            :key="cell.header">
            <label v-if="cell.header == 'product name' || cell.header == 'unit name'"
              class="description w-100"> {{ globalStore.headerRow[index].name }}
              <MyDropDown v-model="cell.value"
                :name="cell.header"
                class="w-100 mt-1 mb-2" />
            </label>
            <label v-else-if="cell.header == 'total' || cell.header == 'count' || cell.header == 'price'"
              class="description w-100">{{ globalStore.headerRow[index].name }}
              <input type="number"
                v-model="cell.value"
                :name="cell.header"
                class="w-100 mt-1 mb-2" />
            </label>
          </template>
        </div>
      </div>
    </div>
  </TransitionGroup>
</template>

<script setup
  lang="ts">
  import MyDropDown from '@/components/MyDropDown.vue'
  import ActionButton from '@/components/ActionButton.vue';
  import useGlobalStore from '@/stores/global.store'

  const globalStore = useGlobalStore()
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
