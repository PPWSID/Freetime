import { defineStore } from 'pinia';
import Filter from '../dto/filter';
import { ref } from 'vue';

export const useFilterStore = defineStore('filter', () => {
  let filter = ref(new Filter());

  function setFilter(payload) {
    const newFilter = new Filter(payload);
    filter.value = newFilter;
  }

  return {
    filter,
    setFilter
  };
});
