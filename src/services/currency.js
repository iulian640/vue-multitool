import axios from "axios";

const API_KEY = import.meta.env.VITE_CURRENCYFREAKS_API_KEY;
const BASE_URL = "https://api.currencyfreaks.com/v2.0";

export async function getRates() {
  const respuesta = await axios.get(
    `${BASE_URL}/rates/latest?apikey=${API_KEY}`,
  );
}
