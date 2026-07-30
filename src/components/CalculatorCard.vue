<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const display = ref("0");
const previousValue = ref(null);
const operator = ref(null);
const hasError = ref(false);
const MAX_DIGITS = 10;
const digits = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
const ops = ["+", "-", "x", "÷"];
const decimal = ".";
const displayText = computed(() => display.value.replace(".", ","));

function pressDigit(digit) {
  if (hasError.value) return;
  if (display.value.length >= MAX_DIGITS) return;
  else if (display.value === "0") {
    display.value = digit;
  } else {
    display.value += digit;
  }
}

function handleKeydown(event) {
  if (event.target.tagName === "INPUT" || event.target.tagName === "SELECT")
    return;
  if (digits.includes(event.key)) {
    pressDigit(event.key);
  } else if (event.key === "Enter") {
    pressEquals();
  } else if (event.key === "*") {
    pressOperator("x");
  } else if (event.key === "/") {
    pressOperator("÷");
  } else if (event.key === "+") {
    pressOperator("+");
  } else if (event.key === "-") {
    pressOperator("-");
  } else if (event.key === "Backspace") {
    pressBackspace();
  } else if (event.key === "," || event.key === ".") {
    pressDecimal();
  }
}

onMounted(() => window.addEventListener("keydown", handleKeydown));
onUnmounted(() => window.removeEventListener("keydown", handleKeydown));

function pressCE() {
  if (hasError.value) return;

  display.value = "0";
}

function pressC() {
  display.value = "0";
  operator.value = "";
  previousValue.value = "";
  hasError.value = false;
}

function pressDecimal() {
  if (hasError.value) return;
  else if (!display.value.includes(decimal)) {
    display.value += decimal;
  }
}

function pressOperator(op) {
  if (hasError.value) return;

  if (display.value === "-") return;
  else if (op === "-" && display.value === "0") {
    display.value = "-";
    return;
  } else if (operator.value !== null) {
    pressEquals();
  }

  previousValue.value = display.value;
  operator.value = op;
  display.value = "0";
}

function pressBackspace() {
  if (hasError.value) return;
  display.value = display.value.slice(0, -1);
  if (display.value === "") {
    display.value = "0";
  }
}

function pressEquals() {
  if (hasError.value) return;
  if (display.value === "-") return;
  if (!operator.value) return;

  const a = Number(previousValue.value);
  const b = Number(display.value);
  let result;
  if (operator.value === "+") {
    result = a + b;
  } else if (operator.value === "-") {
    result = a - b;
  } else if (operator.value === "x") {
    result = a * b;
  } else if (operator.value === "÷") {
    if (display.value === "0") {
      display.value = "Sin definir";
      hasError.value = true;
      return;
    } else {
      result = a / b;
    }
  }
  display.value = String(Number(result.toFixed(8)));
  operator.value = null;
}
</script>

<template>
  <section class="card">
    <h2 class="card__title">Calculadora</h2>
    <div class="calc__display">{{ displayText }}</div>
    <p class="calc__expression">{{ previousValue }} {{ operator }}</p>
    <div class="calc__keys">
      <button class="key--danger" @click="pressCE()">CE</button>
      <button class="key--danger" @click="pressC()">C</button>
      <button @click="pressBackspace()">⌫</button>
      <button class="key--op" @click="pressOperator('÷')">÷</button>

      <button @click="pressDigit('7')">7</button>
      <button @click="pressDigit('8')">8</button>
      <button @click="pressDigit('9')">9</button>
      <button class="key--op" @click="pressOperator('x')">x</button>

      <button @click="pressDigit('4')">4</button>
      <button @click="pressDigit('5')">5</button>
      <button @click="pressDigit('6')">6</button>
      <button class="key--op" @click="pressOperator('-')">-</button>

      <button @click="pressDigit('1')">1</button>
      <button @click="pressDigit('2')">2</button>
      <button @click="pressDigit('3')">3</button>
      <button class="key--op" @click="pressOperator('+')">+</button>

      <button class="key--zero" @click="pressDigit('0')">0</button>
      <button @click="pressDecimal()">,</button>
      <button class="key--equals" @click="pressEquals()">=</button>
    </div>
  </section>
</template>
