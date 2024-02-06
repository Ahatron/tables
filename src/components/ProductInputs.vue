<template>
  <div>
    <label class="description w-100"
      >Наименование еденицы
      <MyDropDown class="w-100 mt-1 mb-2" />
    </label>

    <label class="description w-100"
      >Цена
      <input type="number" class="w-100 mt-1 mb-2" />
    </label>

    <label class="description w-100"
      >Количество
      <input type="number" class="w-100 mt-1 mb-2" />
    </label>

    <label class="description w-100"
      >Название товара
      <MyDropDown class="w-100 mt-1 mb-2" />
    </label>

    <label class="description w-100"
      >Итого
      <input type="number" class="w-100 mt-1 mb-2" />
    </label>
  </div>
</template>

<script setup lang="ts">
import MyDropDown from './MyDropDown.vue'
</script>
