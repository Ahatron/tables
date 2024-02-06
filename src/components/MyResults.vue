<template>
  <div>
    <div class="my-container mb-1">
      <div class="my-row">
        <div class="my-row__data">Сумма:</div>
        <div class="my-row__value">152 212 руб</div>
      </div>
      <div class="my-row">
        <div class="my-row__data">Кол-во:</div>
        <div class="my-row__value">24 шт</div>
      </div>
      <div class="my-row">
        <div class="my-row__data">Общий вес:</div>
        <div class="my-row__value">2 322 кг</div>
      </div>
    </div>

    <div class="my-container">
      <div class="my-row">
        <div class="my-row__data" style="color: black; font-weight: 600">Общая сумма:</div>
        <div class="my-row__value">152 212 руб</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.my-container {
  display: grid;
  flex-direction: column;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  background-color: #f0f0f0;
}

.my-row {
  display: flex;
  padding: 15px;
}
.my-row__data {
  width: 50%;
  color: #8f8f8f;
  font-weight: 400;
}
.my-row__data:nth-child(4) {
  color: black;
}
.my-row__value {
  font-weight: 500;
  margin-left: auto;
}
</style>
