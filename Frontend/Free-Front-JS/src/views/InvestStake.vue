<script setup>
    import SideNav from '../components/InvestStake/SideNav.vue';
    import TopAsset from '../components/InvestStake/TopAsset.vue';
    import DailyUSD from '../components/InvestStake/DailyUSD.vue';
</script>

<template>
    <v-app>
        <!-- Sidebar -->
        <SideNav class="side-nav" />

        <!-- Main Content -->
        <v-main class="content-area">
            <v-container fluid>
                <v-row class="d-flex" align="stretch" dense>

                <!-- TopAsset: cols=8 -->
                  <v-col
                    cols="12"
                    sm="12"
                    md="8"
                    lg="8"
                    class="d-flex"
                  >
                    <TopAsset class="flex-grow-1" />
                  </v-col>

                  <!-- DailyUSD: cols=4 -->
                  <v-col
                    cols="12"
                    sm="12"
                    md="4"
                    lg="4"
                    class="d-flex"
                  >
                    <DailyUSD class="flex-grow-1" />
                  </v-col>
              </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<style scoped>

.app-layout {
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
}

.side-nav {
  height: 100vh;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  height: 100vh;
}
</style>