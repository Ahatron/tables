<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'

import InputNumber from 'primevue/inputnumber'

import Dropdown from 'primevue/dropdown'

import MyHeader from './components/MyHeader.vue'
import AddRow from './components/AddRow.vue'
import LinesButton from './components/LinesButton.vue'
</script>

<template>
  <div class="app pt-3 px-3 h-100 w-100">
    <MyHeader class="mb-4" />
    <AddRow class="mb-4" />
    <Card>
      <template #content>
        <p class="description mb-0">Номер строки</p>
        <div class="mb-1 d-flex">
          <LinesButton class="me-1" style="width: 12px; height: 20px"></LinesButton>
          <span style="font-size: small">1</span>
        </div>

        <p class="description mb-0">Действие</p>
        <Button
          class="border-0 m-0 p-0 align-items-center justify-content-end mb-2"
          style="background-color: #fff; width: 8px; height: 20px"
        >
          <i class="pi pi-ellipsis-v" style="color: #1253a2; font-size: small"></i>
        </Button>

        <p class="description">Наименование еденицы</p>
        <Dropdown class="my-input"></Dropdown>
        <p class="description">Цена</p>
        <InputNumber class="my-input"></InputNumber>
        <p class="description">Количество</p>
        <InputNumber class="my-input"></InputNumber>

        <p class="description">Название товара</p>
        <Dropdown class="my-input"></Dropdown>
        <p class="description">Итого</p>
        <InputNumber class="my-input"></InputNumber>
      </template>
    </Card>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}

.description {
  margin: 0;
  margin-bottom: 5px;
  color: #8f8f8f;
  font-size: x-small;
}

.my-input {
  width: 100%;
  margin-bottom: 15px;
}

.p-dropdown,
.p-inputnumber-input {
  outline: solid 1px #ccc !important;
}

.p-dropdown:focus-within,
.p-inputnumber-input:focus-within {
  outline: 2px black solid !important;
}

.p-input-text {
  padding: 0.6rem 0.9rem;
}

#app {
  width: 100%;
  height: 100%;
}

.app {
  background-color: #fbfcfd;
  width: 100%;
  height: 100%;
}

.p-card-body {
  padding: 15px;
  gap: 0;
}
</style>
