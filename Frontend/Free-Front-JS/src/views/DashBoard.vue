<script setup>
import FilterComponent from "../components/DashboardComponent/FilterComponent.vue";
import BannerComponent from "../components/DashboardComponent/Banner.vue";
import DoughnutChart from "../components/DashboardComponent/DoughnutChart.vue";
import BarChart from '../components/DashboardComponent/BarChart.vue'
import Table from "../components/DashboardComponent/Table.vue"; 
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
          <v-col cols='12'>
                <FilterComponent />
          </v-col>
        
          <v-row>
              <v-col cols='12' sm='6' md="6">
                <DoughnutChart />
              </v-col>
              <v-col cols='12' sm='6' md='6'>
                <BarChart />
              </v-col>
          </v-row>
          <v-row>
            
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <Table />
            </v-col>
          </v-row>
      </v-container>
</template>
