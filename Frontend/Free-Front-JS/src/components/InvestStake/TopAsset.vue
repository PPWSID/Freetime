<script setup>
import { ref } from "vue";

const assetItem = ref([
  { title: "NVDA", chance: "10.99", current_cost: "428.75", goal_cost: "567.43" },
  { title: "TSLA", chance: "2.01", current_cost: "428.75", goal_cost: "567.43" },
  { title: "VOO", chance: "5.66", current_cost: "428.75", goal_cost: "567.43" },
]);
</script>

<template>
    <v-row class="all-section-of-top-asset">
        <v-col v-for="(item, index) in assetItem" :key="index" cols="4">
            <v-card class="top-asset-card">
                
                <!-- Title -->
                <div class="title-asset-card">
                    <p>{{ item.title }}</p>
                    <v-divider></v-divider>
                </div>

                <!-- Body -->
                <div class="top-asset-body-card">

                    <div class="head-cost-container">
                        <p>ราคาปัจจุบัน</p>
                        <p>ราคาเป้าหมาย</p>
                    </div>

                    <div class="main-asset-container">
                        <p>{{ item.current_cost }}</p>
                        <p>→</p>
                        <p>{{ item.goal_cost }}</p>
                    </div>

                    <div class="footter-asset-container">
                        <small>USD</small>
                        <small>USD</small>
                    </div>
                </div>

                <!-- Footer -->
                <div class="footer-asset-body-card">
                value +{{ item.chance }}
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>

<style scoped>
.all-section-of-top-asset {
    width : 640px
}

.top-asset-card {
    border-radius: 10px;
    height: 150px;
    width : 200px;
    /* background-color: #0a1630; */
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.title-asset-card {
    padding: 4px 8px;
}

.title-asset-card p {
    font-weight: 600;
    font-size: 0.95rem;
    padding-top: 10px;
    padding-left : 7px;
}

.top-asset-body-card {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 5px;
    padding-right: 5px;
}

.head-cost-container,.footter-asset-container,
.main-asset-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    
}

.footter-asset-container p,
.head-cost-container p {
    font-size: 0.7rem;
    margin: 0;
    opacity: 0.8;
}

.main-asset-container p {
    font-size: 0.9rem;
    margin: 0;
    text-align: center;
}

.footer-asset-body-card {
    background-color: #017e81;
    text-align: center;
    font-size: 0.8rem;
    padding: 2px 0;
    border-radius: 0 0 10px 10px;
}
</style>
