<script setup lang="ts">
import ProductCard from './components/ProductCard.vue'
import MyHeader from './components/MyHeader.vue'
import AddRow from './components/AddRow.vue'
</script>

<template>
  <div class="app pt-3 px-3 h-100 w-100">
    <MyHeader class="mb-4" />
    <AddRow class="mb-4" />
    <ProductCard />
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

.p-dropdown-trigger {
  display: none;
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
