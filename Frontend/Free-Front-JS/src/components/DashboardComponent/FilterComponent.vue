<script setup>
    import { computed, onMounted, reactive, ref, watch } from 'vue';
    import dayjs from 'dayjs';
    import CardSection from "./CardSection.vue";
    import DatePickerComponent from './DatePickerComponent.vue';
    import LoaderDataComponent from './Loader.vue';
    import dashboardService from '../../services/dashboardHttps';
    import { useFilterStore } from '../../stores/filter';
    import { isNull } from 'lodash';
    import { useLoaderStore } from '../../stores/loader';
    import { storeToRefs } from 'pinia';

    const loaderStore = useLoaderStore();
    const filterStore = useFilterStore();
    const { isLoading, isAllLoadingComplete } = storeToRefs(loaderStore);
    const { setLoading } = loaderStore;

    let isClearing = false
    const isInitializing = ref(false);
    const isDefaultValue = (value) => (value === 'ทั้งหมด' ? null : value);
    const isSearchEnabled = computed(() => {
        return (
            !isNull(selectedFilters.code) &&
            !isNull(selectedFilters.status) &&
            isAllLoadingComplete.value
        );
    });

    const filterData = reactive({
        codeData: [],
        statusData: [],
    });

    const selectedFilters = reactive({
    code: 'ทั้งหมด',
    status: 'ทั้งหมด',
    startDate: dayjs().startOf('month').toDate(),
    endDate: dayjs().toDate()
    });

    const currentDay = dayjs().toDate();

    async function fetchFilterData(filterParams = {}) {
        setLoading('filtersetup', true);
        try {
            const { data: response } =
            await dashboardService.getFilter(filterParams);
            // console.log("Filter List" , data);              
            
            if (response.status) {
            return response.data;
            } else {
            console.error('Error in response status: ', response);
            return null;
            }
        } catch (error) {
            console.error('Error fetching location data: ', error);
            return null;
        } finally {
            setLoading('filtersetup', false);
        }
    };

    async function initFilterData() {
        const data = await fetchFilterData();

        if (data) {
            filterData.codeData = data.code

            filterData.statusData = data.status
        }
        
    }


    async function submitSearchFilter() {
        try {
            const payload = {
                code: isDefaultValue(selectedFilters.code),
                status: isDefaultValue(selectedFilters.status),
                start_date: dayjs(selectedFilters.startDate).format('YYYY-MM-DD'),
                end_date: dayjs(selectedFilters.endDate).format('YYYY-MM-DD')
            };

            filterStore.setFilter(payload);
        } catch (error) {
            console.error('Error in submitSearchFilter:', error);
        }
    }

    function handleClear(key) {
        isClearing = true;
        selectedFilters[key] = "ทั้งหมด";

        // const updateMap = {
        //     code: updateSelectedCode,
        //     status: updateSelectedStatus,
        // };

        // มันจะเลือก key และส่งทั้งหมดเป็นการ reset ค่าไปให้ function นั้นๆ
        // if (updateMap[key]) {
        //     updateMap[key]("ทั้งหมด");
        // }

        // selectedFilters[key] = (key === 'code' || key === 'status') ? '' : 'ทั้งหมด';

        
        // console.log("selectedFilters :" ,selectedFilters);
        
        setTimeout(() => {
            isClearing = false;
        }, 0);
    }

    function startInitialization() {
        isInitializing.value = true;
    }

    function endInitialization() {
        isInitializing.value = false;
    }

    onMounted(async () => {
        startInitialization();
        await initFilterData();
        await submitSearchFilter();
        endInitialization();
    });

    // function createFilterWatcher(filterKey, updateFunction) {
    //     watch(
    //         () => selectedFilters[filterKey],
    //         async (newValue) => {
    //         if (isInitializing.value) return; // skip ตอน init
    //         if (isClearing) return true;
    //         else return await updateFunction(newValue);
    //         }
    //     );
    // }

    // createFilterWatcher("code", updateSelectedCode);
    // createFilterWatcher("status", updateSelectedStatus);

    // async function updateSelectedCode(newtype) {
    //     if (!newtype) return;
    //     selectedFilters.code = "ทั้งหมด";

    //     const typesForLoop = ["code"];

    //     for (const type of typesForLoop) {
    //         const payload = {
    //         code: isDefaultValue(newtype),
    //         };

    //         const response = await fetchFilterData(payload);

    //         if (response) {
    //         updateFilterType(type ,response);
    //         }
    //     }
    // }

    // async function updateSelectedStatus(newtype) {
    //     if (!newtype) return;
    //     selectedFilters.status = "ทั้งหมด";

    //     const typesForLoop = ["status"];

    //     for (const type of typesForLoop) {
    //         const payload = {
    //         code: isDefaultValue(newtype),
    //         };

    //         const response = await fetchFilterData(payload);

    //         if (response) {
    //         updateFilterType(type ,response);
    //         }
    //     }
    // }

    // async function updateFilterType(type, data) {
    //     switch (type) {
    //         case "area":
    //         filterData.codeData = data || [];
    //         break;
    //         case "province":
    //         filterData.statusData = data || [];
    //         break;
    //     }
    // }

</script>

<template>
    <CardSection>
        <v-row dense class="pa-4">
            <!-- code -->

            <v-col  cols="2" class="pa-0">
                <v-row>
                    <v-col md="4" sm="5" cols="2" align-self="center" class="pa-1">
                        <p>Code:</p>
                    </v-col>
                    <v-col md="8" sm="7" cols="10" class="filter-compo-disabled pa-1">
                        <v-autocomplete
                        :error="isNull(selectedFilters.code)"
                        clearable
                        @click:clear="handleClear('code')"
                        placeholder="กรุณาเลือก Code"
                        autocomplete
                        hide-details
                        v-model="selectedFilters.code"
                        :items="filterData.codeData"
                        clear-icon="mdi-close"
                        ></v-autocomplete>
                    </v-col>
                </v-row>
            </v-col>

            <!-- status -->
            <v-col  cols="2" class="pa-0">
                <v-row>
                    <v-col md="4" sm="5" cols="2" align-self="center" class="pa-1">
                        <p class="pl-sm-2">Status:</p>
                    </v-col>
                    <v-col md="8" sm="7" cols="10" class="filter-compo-disabled pa-1">
                        <v-autocomplete
                        :error="isNull(selectedFilters.status)"
                        clearable
                        @click:clear="handleClear('status')"
                        placeholder="กรุณาเลือก status"
                        autocomplete
                        hide-details
                        v-model="selectedFilters.status"
                        :items="filterData.statusData"
                        clear-icon="mdi-close"
                        ></v-autocomplete>
                    </v-col>
                </v-row>
            </v-col>
            
            <!-- Date Picker -->
            <v-col  cols="3" class="pa-0">
                <v-row>
                    <v-col md="4" sm="5" cols="4" align-self="center" class="pa-1">
                        <p class="pl-md-2">วันที่เริ่มต้น:</p>
                    </v-col>
                    <v-col md="8"sm="7"cols="8"align-self="center"class="calendar-datepicker-filter-compo pa-1">
                        <DatePickerComponent v-model="selectedFilters.startDate" :maxDate="selectedFilters.endDate"/>
                    </v-col>
                </v-row>
            </v-col>
            
            <v-col  cols="3" class="pa-0">
                <v-row>
                    <v-col md="4" sm="5" cols="4" align-self="center" class="pa-1">
                        <p class="pl-sm-2">วันที่สิ้นสุด:</p>
                    </v-col>
                    <v-col md="8"sm="7"cols="8"align-self="center"class="calendar-datepicker-filter-compo pa-1">
                        <DatePickerComponent v-model="selectedFilters.endDate":minDate="selectedFilters.startDate":maxDate="currentDay"/>
                    </v-col>
                </v-row>
            </v-col>

            <!-- Button search -->
            <v-col md="2"sm="3"cols="2" align-self="center" class="d-flex justify-end pl-5"  >
                <v-btn :disabled="!isSearchEnabled"block color="primary"@click="submitSearchFilter">ค้นหา</v-btn>
            </v-col>
        </v-row>
        <LoaderDataComponent v-model="isLoading.filtersetup" />
    </CardSection>
</template>

<style>
.filter-compo-disabled .v-autocomplete .v-field.v-field {
  opacity: 1 !important;
}

.filter-compo-disabled .v-field--disabled .v-field__clearable > .v-icon {
  opacity: 0.3 !important;
}

.filter-compo-disabled .v-field--disabled .v-field__append-inner > .v-icon {
  opacity: 0.3 !important;
}

.calendar-datepicker-filter-compo .v-field__append-inner > .v-icon {
  opacity: 1 !important;
}
</style>
