<script setup>
import { ref } from "vue";

const display = ref("0");
const previousValue = ref(null);
const operator = ref(null);
const digits = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
const ops = ["+", "-", "x", "÷"];

function pressDigit(digit) {
  if (display.value === "0") {
    display.value = digit;
  } else {
    display.value += digit;
  }
}

function pressOperator(op) {
  previousValue.value = display.value;
  operator.value = op;
  display.value = "0";
}
</script>

<template>
  <section class="card">
    <h2 class="card__title">Calculadora</h2>
    <div class="calc__display">{{ display }}</div>
    <p>debug: {{ previousValue }} {{ operator }}</p>
    <button v-for="d in digits" :key="d" @click="pressDigit(d)">{{ d }}</button>
    <button v-for="op in ops" :key="op" @click="pressOperator(op)">
      {{ op }}
    </button>
  </section>
</template>
