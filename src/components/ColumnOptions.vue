<template>
  <div class="ms-auto position-relative">
    <button @click.stop="menu = !menu"
      class="border-0 d-none d-sm-inline p-1 pe-2"
      style="background-color: inherit">
      <MetalGear />
    </button>

    <div @click.stop
      v-if="menu"
      class="options shadow rounded position-absolute me-2"
      style="background-color: white; right: 0; ">
      <button @click="showOptions = !showOptions"
        class="py-1 menu-btn rounded-top px-2 border-0">
        Отображение столбцов
        <PathSvg :class="['ms-auto', showOptions ? 'rotate' : '']"
          style="transition: 0.2s;" />
      </button>
      <form v-if="showOptions"
        id="checkboxForm"
        class="d-flex flex-column p-1">
        <template v-for="(col, index) in globalStore.headerRow"
          :key="col.name">
          <label v-if="col.name.length > 1"
            class="p-2"
            @click="col.visible = !col.visible; globalStore.columnShowToggle(index, col.visible)">
            <input type="checkbox"
              :value="col.name"
              :checked="col.visible"
              :name="col.name"> {{ col.name }}
          </label>
        </template>
      </form>
      <button class="py-1 menu-btn rounded-bottom px-2 border-0">
        Порядок столбцов
        <PathSvg class="ms-auto" />
      </button>
    </div>
  </div>
</template>

<script setup
  lang="ts">
  import MetalGear from '@/assets/metal-gear.vue'
  import PathSvg from '@/assets/path-svg.vue'
  import useGlobalStore from '@/stores/global.store';
  import { ref } from 'vue'

  const menu = ref(false),
    showOptions = ref(false),
    globalStore = useGlobalStore()

  document.addEventListener('click', () => {
    menu.value = false
    showOptions.value = false
  })
</script>

<style scoped>
.options {
  z-index: 6;
}

form {
  font-size: small;
}

.rotate {
  transform: rotate(90deg);
}

.menu-btn {
  display: inline-flex;
  width: 15rem;
  font-size: small;
  background-color: #fff;
  transition: 0.2s;
}

.menu-btn:hover {
  background-color: #eef3f8;
}

.menu-btn:active {
  background-color: #818181;
}
</style>