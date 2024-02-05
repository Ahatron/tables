<template>
  <div>
    <div class="d-inline-flex align-items-stretch w-100 my-dropdown">
      <input type="text" class="rounded-start border-end-0 p-2 w-100" />
      <button class="rounded-end w-auto border-start-0" style="background-color: #f6f5f3">
        <svg
          style="fill: #c0c0c0"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M400-280v-400l200 200-200 200Z" />
        </svg>
      </button>
    </div>
    <div class="rounded shadow"></div>
  </div>
</template>

<script setup lang="ts">
//
</script>

<style scoped>
.my-dropdown > input,
button {
  border: 1px solid #ccc;
}

input {
  outline-width: 1px !important;
}
</style>
