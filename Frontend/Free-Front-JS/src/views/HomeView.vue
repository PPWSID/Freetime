<script setup>
import HelloWorldComponent from '@/components/HelloWorld.vue';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
// import '../styles/style.css'

// const roleStore = useRoleStore();
// const filterStore = useFilterStore();
// const route = useRoute();

// onBeforeMount(() => {
//   roleStore.setUserRole(route.query);
//   filterStore.setFilter({});
// });
</script>

<template>
  <BannerComponent />
  <v-container class="ma-0 px-0 px-sm-2 px-md-6" width="100%" fluid="true">
    <!-- <v-row>
      <v-col>
        <FilterComponent />
      </v-col>
    </v-row> -->
    <v-row>
      <v-col>
        <HelloWorldComponent />
      </v-col>
    </v-row>
  </v-container>
</template>
