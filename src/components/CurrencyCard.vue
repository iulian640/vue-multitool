<script setup>
import { ref } from "vue";
const origen = ref("EUR");
const destino = ref("USD");
const cantidad = ref("");
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
    <p>Resultado</p>
  </section>
</template>
