<script setup>
import { getWeather } from "@/services/weather";
import { ref } from "vue";
import despejado from "@/assets/weather/clear-day.svg";
import pocoNuboso from "@/assets/weather/partly-cloudy-day.svg";
import nuboso from "@/assets/weather/cloudy.svg";
import cubierto from "@/assets/weather/overcast.svg";
import lluvia from "@/assets/weather/rain.svg";
import tormenta from "@/assets/weather/thunderstorms.svg";
import nieve from "@/assets/weather/snow.svg";
import niebla from "@/assets/weather/fog.svg";

const ciudad = ref(null);
const error = ref("");

function iconoCielo(descripcion) {
  const d = descripcion.toLowerCase();
  if (d.includes("tormenta")) return tormenta;
  if (d.includes("lluvia") || d.includes("chubasco")) return lluvia;
  if (d.includes("nieve")) return nieve;
  if (d.includes("niebla") || d.includes("bruma")) return niebla;
  if (d.includes("despejado")) return despejado;
  if (d.includes("poco") || d.includes("intervalos")) return pocoNuboso;
  if (d.includes("cubierto")) return cubierto;
  return nuboso;
}

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
      <img
        :src="iconoCielo(ciudad.stateSky.description)"
        alt="Estado del cielo"
        width="80"
      />
      <p>{{ ciudad.temperatures.max }}°/ {{ ciudad.temperatures.min }}°</p>
      <p>{{ ciudad.stateSky.description }}</p>
    </div>
    <p v-if="error">{{ error }}</p>
  </section>
</template>
