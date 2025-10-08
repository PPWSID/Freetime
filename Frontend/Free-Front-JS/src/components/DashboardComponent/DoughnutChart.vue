<script setup>
    import { Doughnut } from "vue-chartjs";
    import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
    import { ref, watch, reactive, computed , onMounted} from "vue";
    import CardSection from "./CardSection.vue";
    import NoDataComponent from "./NoData.vue";
    import dashboardService from "../../services/dashboardHttps";
    import { useFilterStore } from "../../stores/filter";


    ChartJS.register(ArcElement, Tooltip, Legend, Title);

    const filterStore = useFilterStore();
    const Data = ref([]);

    async function fetchData(filterParams = {}) {
      try {
        const { data: response } = await dashboardService.getDataDoughnutData(filterParams);        
        if (response.status) {
          Data.value= response.data
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

    const codeColorMap = {
      Golang: '#0E2954',    // Cyan (Space Dark)
      'Node.js': '#1F6E8C', // Greenish Cyan
      PHP: '#2E8A99',       // Light Cyan/Blue
      React: '#84A7A1',     // Deep Cyan
      Vue: '#64ffda',       // Greenish
    };


    const chartData = computed(() => {
      const codeName = mapCodeName();
      const countNumber = mapCountNumber();
      // const backgroundColor = ['#ff80b5','#4dd0e1','#22c55e','#f59e0b','#ef4444']
      // const backgroundColor = [
      //   '#0E2954', // Golang - Cyan
      //   '#1F6E8C', // Node.js - Greenish Cyan
      //   '#2E8A99', // PHP - Light Cyan/Blue
      //   '#84A7A1', // React - Deep Cyan
      //   '#64ffda'  // Vue - Greenish
      // ];

      const backgroundColor = codeName.map(code => codeColorMap[code] || '#ccc');
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
    
    const mapCodeName = () => {
      return Data.value.map((data) => data.code);
    };

    const mapCountNumber = () => {
      const total = Data.value.reduce((sum, data) => {
        return sum + Number(data.count);
      }, 0);
      
      const percentages = Data.value.map((data) => {
        const percentage = (Number(data.count) / total) * 100;
        return percentage.toFixed(2);
      });

      // คำนวณผลรวมของเปอร์เซ็นต์ทั้งหมด
      const totalPercentage = percentages.reduce(
        (sum, percentage) => sum + parseFloat(percentage),0
      );

      // หักลบค่าที่ขาดจาก 100% และปรับปรุงเปอร์เซ็นต์สุดท้าย
      const difference = 100 - totalPercentage;
      percentages[percentages.length - 1] = (
        parseFloat(percentages[percentages.length - 1]) + difference
      ).toFixed(2);

      return percentages;
    };


    const chartOptions = reactive({
        responsive: true,
        plugins: {
            datalabels: false,
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                  label: (context) => {
                    return `ร้อยละ : ${context.raw}%`;
                  },
                  labelColor: (context) => {
                    const code = context.chart.data.labels[context.dataIndex];
                    return {
                      backgroundColor: codeColorMap[code] || '#ccc',
                      borderRadius: 2,
                    };
                  },
                },
                bodyFont: {
                  size: 14,
                },
                padding: {
                  top: 16,
                  bottom: 16,
                  left: 20,
                  right: 20,
                },
                boxPadding: 8,
                titleMarginBottom: 15,
                cornerRadius: 10,
                multiKeyBackground: "transparent",
                borderColor: "transparent",
                boxWidth: 18,
                boxHeight: 18,
            },
        },
    });

    // Mounted Api ตอนเข้าหน้าเว็ป
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