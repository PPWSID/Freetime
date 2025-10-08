<script setup>
import { ref, watch, onMounted } from "vue";
import NoDataComponent from "./NoData.vue";
import CardSection from "./CardSection.vue";
import Loader from "./Loader.vue";
import dashboardService from "../../services/dashboardHttps";
import { useFilterStore } from "../../stores/filter";

const filterStore = useFilterStore();

// ----------------------------
// States
// ----------------------------
const tableSearchOptions = ref([{ code: '', status: '', text_show: 'ทั้งหมด' }]);
const selectedSearchCode = ref({ code: '', status: '', text_show: 'ทั้งหมด' });
const isLoading = ref(false);

const tableHeaders = ref([
  { title: 'ลำดับที่', value: 'no', align: 'center' },
  { title: 'Code', value: 'code' },
  { title: 'Status', value: 'status', align: 'center' },
  { title: 'Total', value: 'total', align: 'center' },
  {
    title: 'Child Element',
    align: 'center',
    children: [
      { title: 'Name', value: 'name', align: 'center' },
      { title: 'Created Date', value: 'createdAt', align: 'center' },
      { title: 'Updated Date', value: 'updatedAt', align: 'center' },
    ],
  },
]);

const tableItems = ref([]);
const tableTotalItemCount = ref(0);
const tableItemPerPage = ref(10);
const tableCurrentPage = ref(1);
const tableItemPerPageOptions = ref([
  { value: 5, title: '5' },
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' },
]);

let isLoadingTable = false;

// ----------------------------
// API functions
// ----------------------------
async function fetchTableList() {
  isLoading.value = true;
  try {
    const { data: response } = await dashboardService.getDataTableList();
    return response.status ? response.data : [];
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    isLoading.value = false;
  }
}

async function fetchTableData(filterParams = {}) {
  isLoading.value = true;
  try {
    const { data: response } = await dashboardService.getDataTable(filterParams);
    return response.status ? { data: response.data, count: response.count } : { data: [], count: 0 };
  } catch (error) {
    console.error(error);
    return { data: [], count: 0 };
  } finally {
    isLoading.value = false;
  }
}

// ----------------------------
// Load table items
// ----------------------------
async function loadTableItems({ page, itemsPerPage, customPayload }) {
  if (isLoadingTable) return;
  isLoadingTable = true;
  console.log("custumpayload :" ,customPayload);
  
  const start = (page - 1) * itemsPerPage;
  const payload = customPayload
    ? customPayload
    : { ...filterStore.filter.value, skip: start, limit: itemsPerPage };

    console.log("paylaod" ,payload);
    
  try {
    const { data, count } = await fetchTableData(payload);
    tableItems.value = data.map((item, index) => ({
      ...item,
      no: start + index + 1,
      createdAt: new Date(item.createdAt).toLocaleString(),
      updatedAt: new Date(item.updatedAt).toLocaleString(),
    }));
    tableTotalItemCount.value = count;
  } catch (error) {
    console.error(error);
  } finally {
    isLoadingTable = false;
  }
}

// ----------------------------
// Handle select code from autocomplete
// ----------------------------
const handleSelectCode = async (selectedObj) => {
  console.log("selectobj" ,selectedObj);
  
  if (!selectedObj || !selectedObj.code) return;

  const { code, status } = selectedObj;
  selectedSearchCode.value = {
    code,
    status: status ?? null,
    text_show: selectedObj.text_show
  };

  const payload = {
    ...filterStore.filter.value,
    code: code === 'ทั้งหมด' ? null : code,
    status: status === 'ทั้งหมด' ? null : status,
    skip: 0,
    limit: tableItemPerPage.value,
  };
  await loadTableItems({ page: 1, itemsPerPage: tableItemPerPage.value, customPayload: payload});
  console.log("Load Data");
  
}

// ----------------------------
// Mounted
// ----------------------------
onMounted(async () => {
  const codeList = await fetchTableList(filterStore.filter.value);
  tableSearchOptions.value = codeList.length ? [...codeList] : [{ code: '', status: '', text_show: 'ทั้งหมด' }];
  // load table initially
  // await loadTableItems({ page: 1, itemsPerPage: tableItemPerPage.value, });
});

// ----------------------------
// Watch filterStore
// ----------------------------
  // watch(
  //   () => filterStore.filter.value,
  //   async () => {
  //     if (selectedSearchCode) return
  //     await loadTableItems({ page: 1, itemsPerPage: tableItemPerPage.value });
  //   },
  //   { deep: true, immediate: false }
  // );

</script>

<template>
    <CardSection>
        <v-row>
            <!-- Header Section -->
            <v-col cols="auto" align-self="center" class="pr-0">
                <v-img width="24px" src="../../assets/icons/calendar-icon.svg"></v-img>
            </v-col>
            <v-col cols="10" sm="auto" align-self="center" class="align-center">
                <p class="sukhum-b14">รายการ</p>
            </v-col>

            <v-spacer></v-spacer>

            <!-- Search Section -->
            <v-col cols="auto" align-self="center" class="pr-0">
                <p class="sukhum-b14">Searching:</p>
            </v-col>

            <v-col md="3" align-self="center">
              <v-autocomplete
                v-model="selectedSearchCode"
                :items="tableSearchOptions"
                item-title="text_show"        
                :item-value="item => item"   
                label="ค้นหา"
                clearable
                :return-object="true"        
                hide-details
ล               @update:model-value="handleSelectCode"
                autocomplete class="select-box"
                clear-icon="mdi-close">
              </v-autocomplete>

            </v-col>

        </v-row>

        <!-- Table Section -->

        <v-row>
            <v-col>
                <v-data-table-server :items-per-page-options="tableItemPerPageOptions" v-model:items-per-page="tableItemPerPage"
                v-model:page="tableCurrentPage" :headers="tableHeaders" :items="tableItems"
                :items-length="tableTotalItemCount" item-key="code" :loading="isLoading"
                :search="selectedSearchCode" @update:options="loadTableItems" class="decor-table">
                <template v-slot:item.action="{ item }">
                    <v-btn @click="tableSearchOptions(item.code, item.text_show)" color="primary" variant="text"
                    class="d-flex align-center"><v-img class="v-col align-center" width="22px"
                        src="/src/assets/images/eye-icon.svg"></v-img>
                    <p class="v-col align-center pl-1">ดูรายละเอียด</p>
                    </v-btn>
                </template>

                <template v-slot:[`item.code`]="{ item }">
                    <p class="text-left">{{ item.code }}</p>
                </template>
                </v-data-table-server>
            </v-col>
        </v-row>


        <!-- More Detail DialogSection  -->
        <!-- <DetailDialog v-model="isOpenDetail" :code="selectedCode" :text_show="selectedName"
        @close="hideDetail" /> -->

        <Loader v-model="isLoading" />

        <!-- No data Component -->
        <!-- <NoDataComponent/ v-model = "loadTableItems"> -->
         
    </CardSection>
</template>
<!--  -->
<style>


.decor-table .v-table__wrapper>table>thead>tr:nth-child(1)>th {
  font-weight: 700;
  border-bottom: dashed #b9b9b9 !important;
  border-right: dashed #b9b9b9 !important;
  border-width: 1px !important;
}

.decor-table .v-table__wrapper>table>thead>tr:nth-child(2)>th {
  font-weight: 700;
  border-bottom: dashed #b9b9b9 !important;
  border-right: dashed #b9b9b9 !important;
  border-width: 1px !important;
}

/* .decor-table .v-table__wrapper>table>thead>tr:nth-child(1) {
  background-color: #f0f0f0;
}

.decor-table .v-table__wrapper>table>thead>tr:nth-child(2) {
  background-color: #f0f0f0;
} */

.decor-table .v-table__wrapper>table>tbody>tr>td {
  border-bottom: dashed #b9b9b9 !important;
  border-right: dashed #b9b9b9 !important;
  border-width: 1px !important;
}

.decor-table>hr {
  display: none;
}

.decor-table .v-table__wrapper {
  border-radius: 8px;
  border-left: dashed;
  border-top: dashed;
  /* border-color: #b9b9b9; */
  border-width: 1px !important;
}

</style>
