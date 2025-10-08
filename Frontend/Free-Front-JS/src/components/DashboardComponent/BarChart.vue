<script setup>
    import { Bar } from "vue-chartjs";
    import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title } from "chart.js";
    import { ref, watch, reactive, computed , onMounted} from "vue";
    import CardSection from "./CardSection.vue";
    import NoDataComponent from "./NoData.vue";
    import dashboardService from "../../services/dashboardHttps";
    import { useFilterStore } from "../../stores/filter";

    ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);
    const filterStore = useFilterStore();

    // Chrat mock
   /*
    const chartData = ref({
      labels: mapCodeName(),
      datasets: [
        {
          label: 'Skill Level',
          data: [10, 20, 30, 40, 50],
          backgroundColor: ['#ff6f91','#00bcd4','#4caf50','#ffa726','#e53935'], // Dark theme colors
        }
      ]
    });
   */

    const codeColorMap = {
      Golang: '#0E2954',    // Cyan (Space Dark)
      'Node.js': '#1F6E8C', // Greenish Cyan
      PHP: '#2E8A99',       // Light Cyan/Blue
      React: '#84A7A1',     // Deep Cyan
      Vue: '#64ffda',       // Greenish
    };

    const chartData = computed(() => {
      const codeName = mapCodeName();
      const backgroundColor = codeName.map(code => codeColorMap[code] || '#ccc');
      // console.log("codeName" ,codeName );
      
      const countNumber = mapCodeTotal();
      return {
        labels: codeName,
        datasets: [
          {
            backgroundColor: backgroundColor,
            data: countNumber,
          },
        ],
      };
    });

    const chartOptions = ref({
      responsive: true,
      plugins: {
        legend: { 
          display : false,
          // position: 'bottom',
          // labels: { color: '#ffffff' }
        },
        tooltip: { 
          enabled: true,
          titleColor: '#ffffff', 
          bodyColor: '#ffffff',
          backgroundColor: '#222222'
        },
        title: { 
          display: true, 
          text: 'Summary Total Bar Chart',
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


    const Data = ref([]);

    async function fetchData(filterParams = {}) {
      try {
        const { data: response } = await dashboardService.getDataBarChart(filterParams);
        
        if (response.status) {
          Data.value= response.data
          // console.log(response.data);
          
          return response.data;
        } else {
          console.error('Error in response status: ', response);
          return null;
        }
      } catch (error) {
        console.error('Error fetching location data: ', error);
        return null;
      };
    };

    const mapCodeName = () => {
      return Data.value.map((data) => data.code);
    };

    const mapCodeTotal = () => {
      return Data.value.map((data) => data.total);
    };

    // onMounted(() => {
    //     fetchData();
    // });

    watch(
      () => filterStore.filter,
      async (newFilter) => {
        await fetchData(newFilter);
      },
      { deep: true, immediate: false }
    );

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