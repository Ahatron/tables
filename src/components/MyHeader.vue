<template>
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

    <div class="ms-auto position-relative">
      <button @click.stop="menu = !menu"
        class="border-0 d-none d-sm-inline p-1 pe-2"
        style="background-color: inherit">
        <MetalGear />
      </button>
      <div @click.stop
        v-if="menu"
        class="shadow rounded position-absolute me-2"
        style="background-color: white; right: 0; ">
        <button class="py-1 menu-btn rounded-top px-2 border-0">
          Отображение столбцов
          <PathSvg class="ms-auto" />
        </button>
        <button class="py-1 menu-btn rounded-bottom px-2 border-0">
          Порядок столбцов
          <PathSvg class="ms-auto" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MetalGear from '@/assets/metal-gear.vue'

import LinesButton from './LinesButton.vue'
import PathSvg from '@/assets/path-svg.vue'
import { ref } from 'vue'
const menu = ref(false)

document.addEventListener('click', () => {
  menu.value = false
})
</script>

<style scoped>
.menu-btn {
  display: inline-flex;
  width: 179px;
  font-size: small;
  background-color: #fff;
  transition: 0.2s;
}

.menu-btn:hover {
  background-color: #eef3f8;
}

.menu-btn:active {
  background-color: #818181;
}

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
