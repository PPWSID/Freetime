<script setup>
    import { ref } from 'vue'

    const drawer = ref(true)
    const rail = ref(false)

    const activeItem = ref('Dashboard')

    const menuItems = [
    { title: 'Dashboard', icon: 'mdi-pause-circle-outline' },
    { title: 'Assets', icon: 'mdi-layers-outline' },
    { title: 'Staking Providers', icon: 'mdi-account-group-outline' },
    { title: 'Staking Calculator', icon: 'mdi-calculator-variant-outline' },
    { title: 'Data API', icon: 'mdi-database-outline' },
    { title: 'Liquid Staking', icon: 'mdi-water-outline', badge: 'Beta' },
    { title: 'Active Staking', icon: 'mdi-lightning-bolt', badge: 6 },
    ]
</script>

<template>
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent color="#0e0e12" class="text-white fill-height">
        <div class="d-flex flex-column fill-height" style="justify-content: space-between;">
            <!-- Header -->
            <div :class="['header-container', 'd-flex', 'flex-column']" @click="rail = false" style="cursor: pointer;">
                <!-- แบ่ง divider -->
                <div :class="['header-container-no-divider', 'd-flex']">
                     <!-- Logo -->
                    <v-img src="../../assets/icons/engagement.png" :max-width="rail ? 100 : 100" :max-height="rail ? 100 : 100" class="mr-2 cover" />

                    <!-- Text -->
                    <div v-if="!rail" class="nav-header-compo-text ml-2">
                        <div class="font-weight-bold">Stakent® Engage</div>
                        <small class="text-grey">Free Times Engagement</small>
                    </div>
        
                    <!-- Toggle Button -->
                    <v-btn v-if="!rail" icon @click.stop="rail = !rail"  class="d-flex" style="height: 40px; width: 40px; align-self: center; margin-right: 15px; min-width: 0;">
                        <v-icon :max-width="rail ? 60 : 60" >{{ rail ? 'mdi-cube' : 'mdi-chevron-left' }}</v-icon>
                    </v-btn>
                </div>

                <v-divider class="my-2"></v-divider>
            </div>

            <!-- Menu Items -->
            <v-list density="comfortable" nav>

                <v-divider class="my-2" style="margin: 0px 0px; padding: 0px 0px;"></v-divider>

                <v-list-item
                    v-for="(item, i) in menuItems"
                    :key="i"
                    :value="item.title"
                    class="rounded-lg"
                    :class="{ 'bg-grey-darken-3': activeItem === item.title }"
                    @click="activeItem = item.title ,rail = false "
                >
                    <template #prepend>
                        <v-icon>{{ item.icon }}</v-icon>
                    </template>

                    <v-list-item-title v-if="!rail">{{ item.title }}</v-list-item-title>

                    <template v-if="item.badge && !rail" #append>
                        <v-chip size="x-small" color="purple" label>{{ item.badge }}</v-chip>
                    </template>
                </v-list-item>

                <v-divider class="my-2" style="margin: 0px 0px; padding: 0px 0px;"></v-divider>
            </v-list>

            <!-- Footer -->
            <div class="user-banner-footer d-flex flex-column" :class="{ 'rail-footer': rail }" @click="rail = false" style="cursor: pointer;">
                
                <v-divider class="my-2" style="margin: 0px 0px; padding: 0px 0px;"></v-divider>

                <div :class="['user-container', 'd-flex']">

                    <!-- Avatar / Icon -->
                    <v-img src="../../assets/icons/people.png" :max-width="rail ? 60 : 60" :max-height="rail ? 60 : 60" class="mr-2 cover"/>
                    
                    <!-- USER INFO -->
                    <div v-if="!rail" class="nav-footer-compo-text">
                        <div class="font-weight-bold d-flex flex-row">
                            <small>@PWSID_Ppppppppppppppppppppppppppppp</small>
                            <v-chip class="d-flex" size="x-small" color="red" label style="align-self: center; margin-left: 10px;">
                                <small>Role</small>
                            </v-chip>
                        </div>
                        <small class="text-grey text-truncate">Peerapon Permpoonmahasalkkkkkkkkkkkkkkhhhhhhhhhhhhhhhhhh</small>
                    </div>
                </div>
                
            </div>
            
        </div>
    </v-navigation-drawer>
</template>

<style scoped>

.v-navigation-drawer {
    width: 260px;
    height: 100vh;
    border-right: 1px solid #1f1f25;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    transition: width 0.5s ease;
}


.header-container {
    margin-top: 10px;
    width: 100%;
}

.header-container-no-divider {
    margin-left: 10px
}

.nav-header-compo-text {
    align-items: center;
    margin-left: 12px;
    padding-right: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: opacity 0.3s ease;
    /* height: 20%; */
}

.v-list {
    width: 100%;
}
.v-list-item {
    color: #cfcfcf;
    font-weight: 500;
    }

.v-list-item:hover {
    background-color: #1a1a22 !important;
}

.v-btn-toggle {
    background-color: #1a1a22;
    border-radius: 12px;
}

.v-btn-toggle .v-btn {
    color: #dcdcdc;
}

.v-btn-toggle .v-btn.v-btn--active {
    background-color: #4f46e5 !important;
    color: white !important;
}

.user-banner-footer {
    width: 100%;
    display: flex;
    padding-bottom: 20px;
    /* padding-left: 20px; */
    /* align-self: flex-end ; */
}

/* .user-banner-footer.rail-footer {
    display: none;
} */

.user-container {
    margin-top: 15px;
    /* padding-bottom: 20px; */
    /* padding-left: 20px; */
}
.user-container .rail-footer {
    /* margin-left: 10px; */
    display: flex;
    justify-content: center;
}

.nav-footer-compo-text {
    /* margin-left: 12px; */
    padding-right: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* height: 100%; */
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: opacity 0.3s ease;
    
}

.nav-footer-compo-text small {
    display: inline-block;
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
}

v-divider {
    padding: 0px 0px;
    margin: 0px 0px;
    flex-grow: 0;
    align-self: stretch;
}
</style>
