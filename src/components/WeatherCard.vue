<script setup>
import { getWeather } from "@/services/weather";
import { ref } from "vue";

const ciudad = ref(null);
const error = ref("");

async function cargarweather() {
  try {
    ciudad.value = await getWeather();
  } catch {
    error.value = "No se pueden cargar los datos";
  }
}

cargarweather();
</script>

<template>
  <section class="card">
    <h2 class="card__title">El Tiempo</h2>
    <p v-if="ciudad">{{ ciudad.name }}</p>
    <p v-if="error">{{ error }}</p>
  </section>
</template>
