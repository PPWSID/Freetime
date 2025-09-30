<script setup>
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title } from "chart.js";
import { ref } from "vue";
import CardSection from "./CardSection.vue";
import NoDataComponent from "./NoData.vue";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const chartData = ref({
  labels: ['Node.js', 'Vue', 'Golang', 'React', 'PHP'],
  datasets: [
    {
      label: 'Skill Level',
      data: [10, 20, 30, 40, 50],
      backgroundColor: ['#ff6f91','#00bcd4','#4caf50','#ffa726','#e53935'], // Dark theme colors
    }
  ]
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: { 
      position: 'top',
      labels: { color: '#ffffff' } // สีตัวอักษร legend
    },
    tooltip: { 
      enabled: true,
      titleColor: '#ffffff', 
      bodyColor: '#ffffff',
      backgroundColor: '#222222'
    },
    title: { 
      display: true, 
      text: 'Skill Level Bar Chart',
      color: '#ffffff'
    }
  },
  scales: {
    x: {
      ticks: { color: '#ffffff' }, // สี label แกน X
      grid: { color: '#444444' }   // สีเส้น grid แกน X
    },
    y: {
      ticks: { color: '#ffffff' }, // สี label แกน Y
      grid: { color: '#444444' }   // สีเส้น grid แกน Y
    }
  }
});
</script>

<!-- Original Template -->
<!-- <template>
  <div style="max-width: 500px; margin: auto; background-color: #1e1e2f; padding: 20px; border-radius: 12px;">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template> -->


<template>
    <v-card flat height="100%" width="100%" class="d-flex">
        <CardSection class="w-100">
            <div class="d-flex flex-column align-center px-4">

                <!-- Header Section -->
                <v-row  class="header-compo rounded-lg text-center mt-4">
                    <v-col class="d-flex align-center justify-center">
                    <span class="sukhum-b18" style="font-weight: bold;">Chart.js Bar Chart</span>
                    </v-col>
                </v-row>

                <!-- Chart-Section -->
                <v-row class="bar mb-8">
                    <v-col v-if="chartData.labels.length > 0" class="mr-1 d-flex flex-column align-center">
                        <div class="chart-container">
                            <Bar :data="chartData" :options="chartOptions" />
                        </div>
                    </v-col>
                </v-row>

                <!-- Label Section -->
                <div v-if="chartData.labels.length > 0" class="label-container">
                    <div v-for="(label, index) in chartData.labels"
                    :key="index" class="label-box">
                        <span class="label-color"
                        :style="{backgroundColor:chartData.datasets[0].backgroundColor[index] ||'#000',}">
                        </span>
                        <span class="sukhum-t14 label-text">{{ label === "other" ? "อื่นๆ" : label }}</span>
                    </div>
                </div>
                <div v-else class="no-data mb-10">
                    <NoDataComponent />
                </div>
            </div>
         </CardSection>
    </v-card>
</template>

<style scoped>
.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.header-compo {
  background-color: rgb(var(--v-theme-titleBackground));
  width: 100%;
}

.bar {
  margin-top: 85px;
}

.chart-container {
  width: 600px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto; /* สำหรับการจัดให้อยู่ตรงกลาง */
}

.label-container {
  padding-bottom: 40px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.label-box {
  display: flex;
  align-items: center;
  gap: 2px;
}

.label-color {
  display: inline-block;
  width: 24px !important;
  height: 12px !important;
  border-radius: 2px;
  flex-shrink: 0;
}

.label-text {
  line-height: 1;
}
</style>