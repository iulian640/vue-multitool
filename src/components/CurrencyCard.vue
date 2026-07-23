<script setup>
import { ref, computed } from "vue";
import { getRates } from "../services/currency";

const origen = ref("EUR");
const destino = ref("USD");
const cantidad = ref("");
const rates = ref(null);

const resultado = computed(() => {
  if (!rates.value || !cantidad.value) return "";
  return (
    (cantidad.value / rates.value[origen.value]) *
    rates.value[destino.value]
  ).toFixed(2);
});

async function cargarTasas() {
  rates.value = await getRates();
}
cargarTasas();
</script>
<template>
  <section class="card">
    <h2 class="card__title">Divisas</h2>
    <select v-model="origen">
      <option value="EUR">EUR</option>
      <option value="USD">USD</option>
      <option value="JPY">JPY</option>
    </select>
    <input v-model="cantidad" type="number" placeholder="Cantidad" />
    <select v-model="destino">
      <option value="EUR">EUR</option>
      <option value="USD">USD</option>
      <option value="JPY">JPY</option>
    </select>
    <p>{{ resultado }}</p>
  </section>
</template>
