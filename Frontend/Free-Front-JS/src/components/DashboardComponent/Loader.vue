<script setup>
const isLoading = defineModel({ type: Boolean });
</script>

<template>
  <v-overlay
    v-model="isLoading"
    contained
    persistent
    opacity="0.2"
    class="loader-data"
  >
    <v-progress-circular
      size="25"
      width="2"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </v-overlay>
</template>

<style scoped>
.loader-data {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>
