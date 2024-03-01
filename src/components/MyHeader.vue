<template>
  <div>
    <div class="d-flex align-items-start mb-3">
      <LinesButton class="mt-2 me-4 d-sm-none" />
      <h1>Проведение ТО и мелкий ремонт</h1>
    </div>
    <div class="mb-4 d-flex">
      <span>
        <a style="color: #1253a2"
          href="#">Общее</a>
        <a style="color: #000000"
          href="#">Товар списания</a>
        <a style="color: #1253a2"
          href="#">Доп. расходы</a>
      </span>


    </div>
  </div>
</template>

<script setup lang="ts">
import LinesButton from './LinesButton.vue'
</script>

<style scoped>
a {
  text-decoration: none !important;
  font-weight: bolder !important;
}

a + a {
  margin-left: 20px;
}

a:hover {
  color: #6ba9f4 !important;
}
</style>
