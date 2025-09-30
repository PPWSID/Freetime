<script setup>
import { onMounted, ref } from "vue";

const latestUpdateDate = ref("ไม่มีข้อมูล เวลา 00:00 น.");

// async function fetchLatestUpdateDate() {
//   try {
//     const { data: response } = await dashboardService.getLatestUpdateDate();
//     if (response.status) {
//       latestUpdateDate.value = response.data;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// onMounted(async () => {
//   await fetchLatestUpdateDate();
// });
</script>

<template>
  <v-row class="background-banner ma-0 pl-4 pl-sm-10 pt-9 d-flex flex-column">
    <v-col class="d-flex align-center flex-grow-0 px-0 pt-0 pb-1">
      <img
        src="../../assets/icons/dashboard.png"
        width="68px"
        height="68px"
        alt="Public Health Icon"
        class="mr-5"
      />
      <h1 class="pa-0 ma-0 sukhum-b28">Dashboard Free Time Chart</h1>
    </v-col>

    <v-col class="d-flex align-center flex-grow-0 date-banner-text">
      <v-icon size="20px" color="primary" class="mr-1">
        mdi-check-circle-outline
      </v-icon>
      <span class="sukhum-b16">ข้อมูลอัปเดตวันที่ {{ latestUpdateDate }}</span>
    </v-col>
  </v-row>
</template>

<style scoped>
.background-banner {
  width: 100%;
  background-size: cover;
  background-position: left;
}

@media (max-width: 600px) {
  .background-banner .sukhum-b16 {
    font-size: 13px !important;
  }
}

.date-banner-text {
  padding: 0 0 0 86px;
}
</style>
