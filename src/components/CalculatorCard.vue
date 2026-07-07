<script setup>
import { ref } from "vue";

const display = ref("0");
const previousValue = ref(null);
const operator = ref(null);

function pressDigit(digit) {
  if (display.value === "0") {
    display.value = digit;
  } else {
    display.value += digit;
  }
}
</script>

<template>
  <section class="card">
    <h2 class="card__title">Calculadora</h2>
    <div class="calc__display">{{ display }}</div>
    <button @click="pressDigit('7')">7</button>
  </section>
</template>
