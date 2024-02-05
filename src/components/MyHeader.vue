<template>
  <div class="d-flex align-items-start mb-3">
    <LinesButton class="mt-3 me-4" />
    <h1>Проведение ТО и мелкий ремонт</h1>
  </div>
  <div class="mb-4">
    <a class="my-a" style="color: #1253a2" href="#">Общее</a>
    <a class="my-a" style="color: #000000" href="#">Товар списания</a>
    <a class="my-a" style="color: #1253a2" href="#">Доп. расходы</a>
  </div>
</template>

<script setup lang="ts">
import LinesButton from './LinesButton.vue'
</script>

<style>
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
