<template>
  <Card class="p-0">
    <template #content>
      <Button
        class="rounded-3 p-2 pe-3 border-0 my-btn"
        style="background-color: #2f8cff; font-size: small"
      >
        <i class="pi pi-plus me-2" style="color: #1253a2; font-size: small"></i>Добавить строку
      </Button>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'
</script>

<style>
.my-btn:hover {
  background-color: #1463c4 !important;
}
</style>
