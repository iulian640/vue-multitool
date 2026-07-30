import axios from "axios";

export async function getWeather() {
  const response = await axios.get(
    `https://api.el-tiempo.net/json/v3/provincias/33`,
  );

  return response.data.ciudades.find((city) => city.id[0] === "33044");
}
