import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useLoaderStore = defineStore('loader', () => {
  const isLoading = ref({
    latestUpdateDate: false,
  });

  const isAllLoadingComplete = computed(() => {
    for (const key in isLoading.value) {
      if (isLoading.value[key]) return false;
    }
    return true;
  });

  function setLoadingAll(value) {
    for (const key in isLoading.value) {
      isLoading.value[key] = value;
    }
  }

  function setLoading(key, value) {
    isLoading.value[key] = value;
  }

  return {
    isLoading,
    setLoading,
    isAllLoadingComplete,
    setLoadingAll
  };
});
