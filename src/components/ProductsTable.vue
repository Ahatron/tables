<script setup lang="ts">
import MetalGear from '@/assets/metal-gear.vue'
import CombinedShape from '@/assets/combined-shape.vue'
</script>

<template>
  <div class="shadow rounded pt-1 pb-3 d-flex flex-column"
    style="background-color: #fff">
    <button class="border-0 ms-auto me-2"
      style="background-color: inherit">
      <MetalGear />
    </button>

    <table class="table table-bordered border-start-0 mt-2">
      <thead>
        <th></th>
        <th></th>
        <th>Наименование еденицы</th>
        <th>Цена</th>
        <th>Кол-во</th>
        <th>Название товара</th>
        <th>Итого</th>
      </thead>
      <tbody>
        <tr>
          <td>
            <button class="p-0 me-1"
              style="width: 10px;">
              <CombinedShape :vw="10" />
            </button>
            <span style="font-size: small">1</span>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped> td {
   padding: 10px;
 }

 th + th {
   border-left: 1px solid #dee2e6;
 }

 tbody > tr,
 tbody > tr > td {
   border: 0;
 }
</style>
