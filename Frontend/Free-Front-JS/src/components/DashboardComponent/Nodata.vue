<template>
  <v-card
    style="position: relative"
    class="d-flex justify-center align-center elevation-0 ma-0 mb-15"
  >
    <div>
      <img
        src="../../assets/images/info-icon.webp"
        alt=""
        :height="imgHeight"
        class="ma-0"
      />
      <div class="d-flex justify-center ma-0">ไม่มีข้อมูล</div>
    </div>
  </v-card>
</template>

<script setup>
const props = defineProps({
  imgHeight: { type: [String, Number], default: "200" },
});
</script>
