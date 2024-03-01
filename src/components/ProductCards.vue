<template>
  <TransitionGroup name="list"
    tag="div">
    <div v-for="(row, index) in globalStore.rows"
      :key="row.id"
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
        <action-button :rowId="row.id" />
        <ProductInputs />
      </div>
    </div>
  </TransitionGroup>
</template>
<script setup lang="ts">
import ProductInputs from '@/components/ProductInputs.vue'
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


