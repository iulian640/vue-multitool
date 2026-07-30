<script setup>
import { getWeather } from "@/services/weather";
import { ref } from "vue";
import clearDay from "@/assets/weather/clear-day.svg";
import partlyCloudy from "@/assets/weather/partly-cloudy-day.svg";
import cloudy from "@/assets/weather/cloudy.svg";
import overcast from "@/assets/weather/overcast.svg";
import rain from "@/assets/weather/rain.svg";
import thunderstorms from "@/assets/weather/thunderstorms.svg";
import snow from "@/assets/weather/snow.svg";
import fog from "@/assets/weather/fog.svg";

const city = ref(null);
const error = ref("");

function skyIcon(description) {
  const d = description.toLowerCase();
  if (d.includes("tormenta")) return thunderstorms;
  if (d.includes("lluvia") || d.includes("chubasco")) return rain;
  if (d.includes("nieve")) return snow;
  if (d.includes("niebla") || d.includes("bruma")) return fog;
  if (d.includes("despejado")) return clearDay;
  if (d.includes("poco") || d.includes("intervalos")) return partlyCloudy;
  if (d.includes("cubierto")) return overcast;
  return cloudy;
}

async function loadWeather() {
  try {
    city.value = await getWeather();
  } catch {
    error.value = "No se pueden cargar los datos";
  }
}

loadWeather();
</script>

<template>
  <section class="card">
    <h2 class="card__title">El Tiempo</h2>
    <div v-if="city">
      <p>{{ city.name }}</p>
      <img
        :src="skyIcon(city.stateSky.description)"
        alt="Estado del cielo"
        width="80"
      />
      <p>{{ city.temperatures.max }}°/ {{ city.temperatures.min }}°</p>
      <p>{{ city.stateSky.description }}</p>
    </div>
    <p v-if="error">{{ error }}</p>
  </section>
</template>
