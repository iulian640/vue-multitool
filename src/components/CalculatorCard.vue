<script setup>
import { ref, computed } from "vue";

const display = ref("0");
const previousValue = ref(null);
const operator = ref(null);
const digits = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
const ops = ["+", "-", "x", "÷"];
const decimal = ".";
const displayText = computed(() => display.value.replace(".", ","));

function pressDigit(digit) {
  if (display.value === "0") {
    display.value = digit;
  } else {
    display.value += digit;
  }
}

function pressCE(){
  display.value = '0';
}

function pressC(){
  display.value = '0';
  operator.value = "";
  previousValue.value = ""
}
function pressComa() {
  if(!display.value.includes(decimal)) {
    display.value += decimal; }

}

function pressOperator(op) {
  previousValue.value = display.value;
  operator.value = op;
  display.value = "0";
}

function pressEquals() {
  if (operator.value === "+") {
    display.value = String(Number(previousValue.value) + Number(display.value));
  } else if (operator.value === "-") {
    display.value = String(Number(previousValue.value) - Number(display.value));
  } else if (operator.value === "x") {
    display.value = String(Number(previousValue.value) * Number(display.value));
  } else if (operator.value === "÷") {
    display.value = String(Number(previousValue.value) / Number(display.value));
  }
}
</script>

<template>
  <section class="card">
    <h2 class="card__title">Calculadora</h2>
    <div class="calc__display">{{ displayText }}</div>
    <p class="calc__expression"> {{ previousValue }} {{ operator }}</p>
    <button v-for="d in digits" :key="d" @click="pressDigit(d)">{{ d }}</button>
    <button v-for="op in ops" :key="op" @click="pressOperator(op)">
      {{ op }}
    </button>
    <button @click="pressEquals()">=</button>
    <button @click="pressComa()">,</button>
    <button @click="pressCE()">CE</button>
    <button @click="pressC()">C</button>
  </section>
</template>
