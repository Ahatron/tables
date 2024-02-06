<script setup lang="ts">
import ProductCard from './components/ProductCard.vue'
import MyHeader from './components/MyHeader.vue'
import AddRow from './components/AddRow.vue'
import MyResults from './components/MyResults.vue'
</script>

<template>
  <div class="app p-3 h-100 w-100">
    <MyHeader class="mb-4" />
    <AddRow class="mb-4" />
    <ProductCard v-for="n in 3" :key="n" class="mb-4" />
    <MyResults class="w-100 mb-3"></MyResults>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;

  box-sizing: border-box;
}

.description {
  margin: 0;
  margin-bottom: 5px;
  color: #8f8f8f;
  font-size: x-small;
}
input {
  padding: 8px 10px;
  border: 2px solid #ccc;

  border-radius: 5px;
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

.app {
  background-color: #fbfcfd;
}

.p-card-body {
  padding: 15px;
  gap: 0;
}
</style>
