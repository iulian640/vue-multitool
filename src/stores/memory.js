import { defineStore } from "pinia";
import { ref } from "vue";

export const useMemoryStore = defineStore("memory", () => {
  const stored = ref(null);

  function save(value) {
    stored.value = value;
  }

  function clear() {
    stored.value = null;
  }

  return { stored, save, clear };
});
