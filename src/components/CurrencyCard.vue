<script setup>
import { ref, computed } from "vue";
import { getRates } from "../services/currency";

const from = ref("EUR");
const to = ref("USD");
const amount = ref("");
const rates = ref(null);
const apiError = ref("");

const result = computed(() => {
  if (!rates.value || !amount.value) return "";
  return (
    (amount.value / rates.value[from.value]) *
    rates.value[to.value]
  ).toFixed(2);
});

async function loadRates() {
  try {
    rates.value = await getRates();
  } catch {
    apiError.value = "No se pueden cargar las tasas";
  }
}
loadRates();
</script>
<template>
  <section class="card">
    <h2 class="card__title">Divisas</h2>
    <select v-model="from">
      <option value="EUR">EUR</option>
      <option value="USD">USD</option>
      <option value="JPY">JPY</option>
    </select>
    <input v-model="amount" type="number" placeholder="Cantidad" />
    <select v-model="to">
      <option value="EUR">EUR</option>
      <option value="USD">USD</option>
      <option value="JPY">JPY</option>
    </select>
    <p>{{ result }}</p>
    <p>{{ apiError }}</p>
  </section>
</template>
