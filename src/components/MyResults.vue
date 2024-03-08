<script setup
  lang="ts">
  import useGlobalStore from '@/stores/global.store';

  const globalStore = useGlobalStore()
</script>
<template>
  <div>
    <div class="my-container mb-1">
      <div class="my-row p-2">
        <div class="my-row__data me-5">Сумма:</div>
        <div class="my-row__value">{{ globalStore.priceSum }} руб</div>
      </div>
      <div class="my-row p-2">
        <div class="my-row__data me-5">Кол-во:</div>
        <div class="my-row__value">{{ globalStore.totalCount }} шт</div>
      </div>
      <div class="my-row p-2">
        <div class="my-row__data me-5">Общий вес:</div>
        <div class="my-row__value">{{ globalStore.totalWeight }} кг</div>
      </div>
    </div>

    <div class="my-container">
      <div class="my-row p-2">
        <div class="my-row__data me-5"
          style="color: black; font-weight: 600">Общая сумма:</div>
        <div class="my-row__value">{{ globalStore.totalSum }} руб</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.my-container {
  display: grid;
  flex-direction: column;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  background-color: #f0f0f0;
}

.my-row {
  display: flex;
}

.my-row__data {
  width: 50%;
  color: #8f8f8f;
  font-weight: 400;
  white-space: nowrap;
}

.my-row__data:nth-child(4) {
  color: black;
}

.my-row__value {
  font-weight: 500;
  margin-left: auto;
  white-space: nowrap;

}
</style>
