import { ref } from 'vue';
import { defineStore } from 'pinia';

const useLoadingStore = defineStore('loading', () => {
  const main = ref(false);
  const dialog = ref(false);
  const btn = ref(false);

  return {
    main,
    dialog,
    btn,
  };
});

export default useLoadingStore;
