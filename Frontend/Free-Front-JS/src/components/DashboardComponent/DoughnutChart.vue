<script setup>
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { ref } from "vue";
import CardSection from "./CardSection.vue";
import NoDataComponent from "./NoData.vue";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const chartData = ref({
  labels: ['Node.js', 'Vue', 'Golang', 'React', 'PHP'],
  datasets: [
    {
      label: 'Skill Level',
      data: [10, 20, 30, 40, 50],
      backgroundColor: ['#ff80b5','#00bcd4','#22c55e','#f59e0b','#ef4444'],
      hoverOffset: 4
    }
  ]
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: { position: 'bottom'},
    tooltip: { enabled: true },
    // title: { display: true, text: 'Chart.js Doughnut Chart' } 
  }
});
</script>

<template>
    <v-card flat height="100%" width="100%" class="d-flex">

        <CardSection class="w-100" >
            <div class="d-flex flex-column align-center px-4">

                <!-- Top Section LOGO + Header -->
                <v-row class="header-compo rounded-lg text-center mt-4">
                  <v-col class="d-flex align-center justify-center">
                    <!-- <img src="" width="31px" height="31px" alt="Public Health Icon" class="mr-3"/>  -->
                     <!--ใส่ logo หรือไม่ใส่ ก็ได้  -->
                    <span class="sukhum-b18" style="font-weight: bold;">Chart.js Doughnut Chart</span>

                  </v-col>
                </v-row>

                <!-- Chart-Section -->
                <v-row class="doughnut-section mb-8">
                  <v-col v-if="chartData.labels.length > 0" class="mr-1 d-flex flex-column align-center">
                    <div class="chart-container">
                      <Doughnut :data="chartData" :options="chartOptions" />
                    </div>
                  </v-col>
                </v-row>

                <!-- Label  -->
                <div v-if="chartData.labels.length > 0" class="label-container">
                  <div v-for="(label, index) in chartData.labels" :key="index" class="label-box">
                    <span class="label-colors" 
                    :style="{ backgroundColor: chartData.datasets[0].backgroundColor[index] ||'#000',}">
                    </span>
                    <span class="sukhum-t14 label-text">
                      {{ label === "other" ? "อื่นๆ" : label }}
                    </span>
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

.doughnut-section {
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

.label-colors {
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