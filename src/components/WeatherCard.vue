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
    <div v-if="ciudad">
      <p>{{ ciudad.name }}</p>
      <p>{{ ciudad.temperatures.max }}°/ {{ ciudad.temperatures.min }}°</p>
      <p>{{ ciudad.stateSky.description }}</p>
    </div>
    <p v-if="error">{{ error }}</p>
  </section>
</template>
