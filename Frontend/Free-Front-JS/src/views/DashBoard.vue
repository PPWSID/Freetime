<script setup>
import BannerComponent from "../components/DashboardComponent/Banner.vue";
import DoughnutChart from "../components/DashboardComponent/DoughnutChart.vue";
import BarChart from '../components/DashboardComponent/BarChart.vue'
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// onBeforeMount(() => {
//   roleStore.setUserRole(route.query);
//   filterStore.setFilter({});
// });
</script>

<template>
  <BannerComponent />
   <v-container class="ma-0 px-2 px-sm-2 px-md-6" fluid>
    <v-row>
      <v-col>
        <DoughnutChart />
      </v-col>
      <v-col>
        <BarChart />
      </v-col>
    </v-row>
  </v-container>
</template>
