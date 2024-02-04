<script setup lang="ts">
import Button from 'primevue/button'

function nothing() {
  console.log('ok')
}
</script>

<template>
  <div class="app">
    <div class="header">
      <Button style="background-color: #fbfcfd" text>
        <img src="./assets/combined-shape.png" />
      </Button>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
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

.header {
  padding: 40px;
}
</style>
