<template>
  <v-menu v-model="isOpenMenu" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-select
        v-model="formattedDate"
        append-inner-icon="mdi-calendar-range"
        autocomplete
        hide-details
        hide-no-data
        v-bind="props"
      />
    </template>
    <v-locale-provider locale="th">
      <v-date-picker
        v-model="selectedDate"
        outlined
        dense
        color="#00ffff"
        :min="minDate"
        :max="maxDate"
        title="เลือกวันที่"
        header="ระบุวันที่"
        @update:model-value="handleChangeDate"
      />
    </v-locale-provider>
  </v-menu>
</template>

<script setup>
import { ref, computed } from 'vue';
import dayjs from 'dayjs';

const selectedDate = defineModel('modelValue', {
  type: Date,
  required: true
});

defineProps({
  maxDate: Date,
  minDate: Date
});

const isOpenMenu = ref(false);

const emptyString = '';

const formattedDate = computed(() => {
  return selectedDate.value ? formatDate(selectedDate.value) : emptyString;
});

function handleChangeDate(newDate) {
  selectedDate.value = newDate;
  isOpenMenu.value = false;
}

function formatDate(inputDate) {
  if (!inputDate) return emptyString;

  const dateInstance = dayjs(inputDate);
  const day = dateInstance.format('DD');
  const month = dateInstance.format('MM');
  const buddhistYear = dateInstance.year() + 543;

  return `${day}/${month}/${buddhistYear}`;
}
</script>

<style scoped>
:deep(.mdi-calendar-range::before) {
  color: #00bcd4 !important;
}

</style>
