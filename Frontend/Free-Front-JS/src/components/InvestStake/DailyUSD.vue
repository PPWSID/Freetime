<script setup>
    import { ref,computed } from "vue"
    import { Chart as ChartJS,LineElement,PointElement,LinearScale,CategoryScale,Tooltip,Filler,} from "chart.js"
    import { Line } from "vue-chartjs"

    ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler)

    // ตัวอย่างข้อมูล
    const timeRange = ref('day')
    const changePercent = 6.25

    const timeLabels = ref({
        day: " Day",
        month: "Month",
        year: "Year",
    })


    const generateDayData = () => {
        const days = ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา']
        return days.map((day, i) => ({
            name: `${day} ${15 + i} ต.ค.`,
            value: 12 + Math.random() * 3 + Math.sin(i * 0.5) * 1.5,
        }))
    }

    const generateMonthData = () => {
        const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
        return months.map((month, i) => ({
            name: month,
            value: 10 + Math.random() * 5 + Math.sin(i * 0.3) * 2,
        }))
    }

    const generateYearData = () => {
        const years = ['2020', '2021', '2022', '2023', '2024']
        return years.map((year, i) => ({
            name: year,
            value: 8 + Math.random() * 8 + i * 1.5,
        }))
    }

    const chartRaw = computed(() => {
        switch (timeRange.value) {
            case 'day': return generateDayData()
            case 'month': return generateMonthData()
            case 'year': return generateYearData()
            default: return generateDayData()
        }
    })

    const currentRate = computed(() => chartRaw.value.at(-1)?.value || 13.62)

// คำนวณข้อมูลกราฟ
    const chartData = computed(() => ({
        labels :chartRaw.value.map(d => d.name),
        datasets: [
            {
                data: chartRaw.value.map(d => d.value),
                borderColor: "rgba(167,139,250,1)",
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.4,
                fill: true,
                backgroundColor: (ctx) => {
                    const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 120)
                    gradient.addColorStop(0, "rgba(167,139,250,0.4)")
                    gradient.addColorStop(1, "rgba(167,139,250,0)")
                    return gradient
                },
            },
        ],
    }))

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "#1f2937",
                titleColor: "#a78bfa",
                bodyColor: "#fff",
                displayColors: false,
                padding: 10,
                cornerRadius: 6,
                callbacks: {
                    label: (ctx) => `${ctx.formattedValue}`,
                    },
            },
        },
        scales: {
            x: {
                // grid: { color: "rgba(255,255,255,0.05)" },
                ticks: { display :false , callback: () => "",color: "#9ca3af" },
                border: { display: false }
            },
            y: {
                // grid: { color: "rgba(255,255,255,0.05)" },
                ticks: { display :false ,callback: () => "" ,color: "#9ca3af" },
                border: { display: false } 
            },
        },
        interaction: {
            mode: "index",      // hover ตาม index ของ dataset
            intersect: false,   // ไม่จำเป็นต้อง hover ตรง point
        },
        elements: {
            point: {
            radius: 0,        // จุดเล็กเพื่อไม่ให้แสดง
            hitRadius: 10,    // เพิ่มพื้นที่ hover ให้ tooltip
            hoverRadius: 4,   // เพิ่มขนาดจุดเมื่อ hover
            },
            line: {
            tension: 0.4,
            borderWidth: 2,
            },
        },
    }

</script>

<template>
    <div class="line-chart-container">

        <div class="Header-Daily-USD">
            <img src="../../assets/icons/money.png" alt="icon" class="Header-Daily-USD-Icons" />

            <div class="title">
                <div class="subtitle">Proof of Stake</div>
                <div class="main-title">USTD</div>
            </div>

            <div class="button-group">
            <button
                v-for="(label, key) in timeLabels"
                :key="key"
                @click="timeRange = key"
                :class="['range-btn', { active: timeRange === key }]"
            >
                {{ label }}
            </button>
            </div>

        </div>

        <div class="chart-box">
        <Line :data="chartData" :options="chartOptions" />
        </div>
        
    </div>
</template>

<style scoped>

.line-chart-container {
    border-radius: 12px;
    background-color: #0f172a;
    padding: 16px;
    color: white;
    width: 400px;
    /* overflow: hidden; */

}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.Header-Daily-USD {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}

.Header-Daily-USD-Icons {
    width: 32px;
    height: 32px;
    margin-right: 8px;
}

.title {
    display: flex;
    flex-direction: column;
    margin-right : 20px
}

.subtitle {
    font-size: 0.7rem;
    color: #9ca3af;
}

.main-title {
    font-weight: 600;
    font-size: 1rem;
}

.button-group {
    display: flex;
    justify-content: space-between;
    
}

.range-btn {
  background-color: #1f2937;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 12px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin: 10px;
}

.range-btn:hover {
  background-color: #374151; /* สีเข้มขึ้นเวลา hover */
}

.chart-box {
    height: 100px;
    max-height: 100px;
    position: relative;
}

.chart-box canvas {
    max-height: 100px !important;
}


</style>
