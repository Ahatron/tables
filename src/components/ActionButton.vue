<template>
  <div>
    <button @click.stop="menu = !menu"
      class="border-0 m-0 p-0  align-items-center"
      style=" width: 10px; height: 20px">
      <img src="../assets/dots-vertical.png">
    </button>
    <button @click="globalStore.removeRow(rowId); globalStore.saveChanges()"
      v-if="menu"
      class="d-flex shadow position-absolute justify-content-start py-1 px-2 border-0 rounded product__btn">
      удалить
    </button>
  </div>
</template>
<script setup
  lang="ts">
  import useGlobalStore from '@/stores/global.store'
  import { ref, defineProps } from 'vue';

  const globalStore = useGlobalStore()

  defineProps(['rowId'])

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
  background-color: #eef3f8;
}

.product__btn:active {
  background-color: #818181;
}
</style>