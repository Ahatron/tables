<template>
  <Card>
    <template #content>
      <p class="description mb-0">Номер строки</p>
      <div class="mb-1 d-flex">
        <LinesButton class="me-1" style="width: 12px; height: 20px"></LinesButton>
        <span style="font-size: small">1</span>
      </div>

      <p class="description mb-0">Действие</p>
      <div class="position-relative">
        <button
          @click.stop="menu = !menu"
          class="border-0 m-0 p-0 mb-2 align-items-center"
          style="background-color: #fff; width: 10px; height: 20px"
        >
          <i class="pi pi-ellipsis-v w-100" style="color: #1253a2; font-size: small"></i>
        </button>
        <div
          v-show="menu"
          class="position-absolute my-menu rounded-2 shadow p-2"
          style="width: 179px; z-index: 9999; background-color: #fff; font-size: small"
        >
          <button
            class="d-flex justify-content-start py-1 px-2 w-100 border-0 rounded product__btn"
          >
            удалить
          </button>
        </div>
      </div>

      <p class="description">Наименование еденицы</p>
      <MyDropDown> </MyDropDown>
      <p class="description">Цена</p>
      <InputNumber class="my-input"></InputNumber>
      <p class="description">Количество</p>
      <InputNumber class="my-input"></InputNumber>

      <p class="description">Название товара</p>
      <MyDropDown></MyDropDown>
      <p class="description">Итого</p>
      <InputNumber class="my-input"></InputNumber>
    </template>
  </Card>
</template>
<script setup lang="ts">
import Card from 'primevue/card'
import InputNumber from 'primevue/inputnumber'
import MyDropDown from './MyDropDown.vue'
import LinesButton from './LinesButton.vue'
import { ref } from 'vue'

const menu = ref(false)

document.addEventListener('click', () => {
  menu.value = false
})
</script>

<style scoped>
.product__btn {
  background-color: #fff;
  transition: 0.2s;
  color: red;
}

.product__btn:hover {
  background-color: #cfcfcf;
}

.product__btn:active {
  background-color: #818181;
}
</style>
