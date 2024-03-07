<template>
  <div class="my-dropdown position-relative">
    <div class="d-inline-flex align-items-stretch w-100 my-dropdown__input"
      @click.stop="dropper = !dropper">
      <input v-model="selectedValue.name"
        type="text"
        :name="name"
        class="rounded-end-0 py-sm-1  border-end-0 w-100" />
      <button class="rounded-end w-auto border-start-0 p-0"
        style="background-color: #f6f5f3">
        <svg :class="dropper ? 'rotate' : ''"
          style="fill: #c0c0c0; transition: 0.2s"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24">
          <path d="M400-280v-400l200 200-200 200Z" />
        </svg>
      </button>
    </div>

    <li v-show="dropper"
      type="none"
      class="rounded shadow position-absolute my-dropdown__list">
      <ul v-for="item of matchedValues"
        :key="item.name"
        @click="selectedValue = item; emit('update:modelValue', item)"
        class="my-dropdown__list-item"
        style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
        {{
        item.name
      }}
      </ul>
    </li>
  </div>
</template>

<script setup
  lang="ts">
  import { ref, computed, watch } from 'vue'

  interface Product { name: string, weight: number }

  const props = defineProps<{ modelValue: Product | any, name: string }>()
  const emit = defineEmits(['update:modelValue'])


  const dropper = ref(false),
    variants = ref<Product[]>([
      { name: 'Мраморный щебень фр. 2-5 мм, 25кг', weight: 25 },
      { name: 'Мраморный щебень фр. 2-5 мм, 25кг (белый)', weight: 25 },
      { name: 'Мраморный щебень фр. 2-5 мм, 25кг (вайт)', weight: 25 },
      { name: 'Мраморный щебень фр. 2-5 мм, 25кг, возврат', weight: 25 },
      { name: 'Мраморный щебень фр. 2-5 мм, 1т', weight: 1000 },
    ]),
    selectedValue = ref(props.modelValue)

  watch(() => props.modelValue, (newValue) => {
    selectedValue.value = newValue;
  });

  const matchedValues = computed((): Product[] => {
    return variants.value
      .filter((item) =>
        item.name.toLowerCase().includes(selectedValue.value.name.toLowerCase())
      )
      .sort()
  })

  document.addEventListener('click', () => (dropper.value = false))
</script>

<style scoped>
.rotate {
  transform: rotateZ(90deg);
}

.my-dropdown__list {
  background-color: white;
  width: inherit;
  z-index: 4;
}

.my-dropdown__list-item {
  margin: 0;
  z-index: 4;
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
