<template>
  <div class="p-4 card shadow ">
    <button class="rounded-3 me-auto  p-2 pe-3 my-btn"
      @click="globalStore.addRow"
      style="background-color: #2f8cff; font-size: small; color: white;">
      <i class="pi pi-plus me-2"
        style="color: #1253a2; font-size: small"></i>Добавить строку
    </button>
  </div>
</template>

<script setup lang="ts">
import useGlobalStore from '@/stores/global.store';

const globalStore = useGlobalStore()
</script>

<style>
.my-btn:hover {
  background-color: #1463c4 !important;
}
</style>
