import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', () => {
  const main = ref(false);
  const dialog = ref(false);
  const btn = ref(false);

  return {
    main,
    dialog,
    btn,
  }
});