<template>
  <div class="my-dropdown">
    <div
      class="d-inline-flex align-items-stretch w-100 my-dropdown__input"
      @click.stop="dropper = !dropper"
    >
      <input
        @input="findValues"
        :value="selectedValue"
        type="text"
        class="rounded-start border-end-0 p-2 w-100"
      />
      <button class="rounded-end w-auto border-start-0" style="background-color: #f6f5f3">
        <svg
          :class="dropper ? 'rotate' : ''"
          style="fill: #c0c0c0; transition: 0.2s"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M400-280v-400l200 200-200 200Z" />
        </svg>
      </button>
    </div>

    <li v-if="dropper" @click.stop type="none" class="rounded shadow my-dropdown__list">
      <ul
        v-for="item of matchedValues"
        :key="item"
        @click="selectedValue = item"
        class="my-dropdown__list-item"
      >
        {{
          item
        }}
      </ul>
    </li>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dropper = ref(false),
  values = ref([
    'Мраморный щебень фр. 2-5 мм, 25кг',
    'Мраморный щебень фр. 2-5 мм, 25кг (белый)',
    'Мраморный щебень фр. 2-5 мм, 25кг (вайт)'
  ]),
  selectedValue = ref(''),
  matchedValues = ref(values.value)

function findValues() {
  if (selectedValue.value) {
    matchedValues.value = values.value.filter((item: string) =>
      item.startsWith(selectedValue.value)
    )
  } else {
    matchedValues.value = values.value
  }
}

document.addEventListener('click', () => (dropper.value = false))
</script>

<style scoped>
.rotate {
  transform: rotateZ(90deg);
}
.my-dropdown__list-item {
  margin: 0;
  padding: 10px 10px;
}
.my-dropdown__list-item:hover {
  background-color: #f6f5f3;
}
.my-dropdown__list-item:active {
  background-color: #d4d4d4;
}

.my-dropdown__list::marker {
  marker: none;
}
.my-dropdown__input:focus {
  outline: 1px black solid;
}
.my-dropdown__input > input,
button {
  border: 2px solid #ccc;
}
</style>
