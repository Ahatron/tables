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
        <button
          v-if="menu"
          class="d-flex shadow position-absolute justify-content-start py-1 px-2 border-0 rounded product__btn"
        >
          удалить
        </button>
      </div>

      <label class="description w-100"
        >Наименование еденицы
        <MyDropDown class="w-100 mb-2" />
      </label>

      <label class="description w-100"
        >Цена
        <input type="number" class="w-100 mb-2" />
      </label>

      <label class="description w-100"
        >Количество
        <input type="number" class="w-100 mb-2" />
      </label>

      <label class="description w-100"
        >Название товара
        <MyDropDown class="w-100 mb-2" />
      </label>

      <label class="description w-100"
        >Итого
        <input type="number" class="w-100 mb-2" />
      </label>
    </template>
  </Card>
</template>
<script setup lang="ts">
import Card from 'primevue/card'
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
  width: 179px;
  font-size: small;
  z-index: 9999;
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
