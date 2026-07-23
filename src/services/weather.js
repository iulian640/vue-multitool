import axios from "axios";

export async function getWeather() {
  const respuesta = await axios.get(
    `https://api.el-tiempo.net/json/v3/provincias/33`,
  );

  console.log(respuesta.data.ciudades[0]);
  return respuesta.data.ciudades.find((ciudad) => ciudad.id[0] === "33044");
}
