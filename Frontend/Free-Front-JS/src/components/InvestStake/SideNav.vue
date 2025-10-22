<script setup>
    import { ref } from 'vue'

    // const selectedTab = ref('staking')
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
    <v-navigation-drawer app permanent color="#0e0e12" class="text-white">

        <div class="d-flex align-center pa-4">
            <v-img src="../../assets/icons/engagement.png" max-width="60"></v-img>
            <div class="nav-header-compo-text">
                <div class="font-weight-bold">Stakent® Engage</div>
                <small class="text-grey">Free Times Engagement</small>
            </div>
        </div>

        <v-divider class="my-2">  
        </v-divider>

        <!-- Menu Items -->
        <v-list density="comfortable" nav>
            <v-list-item v-for="(item, i) in menuItems" :key="i" :value="item.title"class="rounded-lg" 
            :class="{'bg-grey-darken-3': activeItem === item.title}" @click="activeItem = item.title">
                <template #prepend>
                    <v-icon>{{ item.icon }}
                    </v-icon>
                </template>

                <v-list-item-title>{{ item.title }}
                </v-list-item-title>

                <template v-if="item.badge" #append>
                    <v-chip
                        size="x-small"
                        color="purple"
                        label
                    >
                        {{ item.badge }}
                    </v-chip>
                </template>
            </v-list-item>
        </v-list>

        <v-divider class="my-2">  
        </v-divider>
        
        <!-- USER Profile -->
        <div class="user-banner-footer d-flex align-center pa-4">
            <v-img src="../../assets/icons/people.png" class="mr-2" max-width="40"/>
            <div class="nav-footter-compo-text">
                <div class="font-weight-bold">
                    <small style="font-size: 14px;">@PWSID_P</small>
                    <v-chip size="x-small" color="red" label>
                    <small style="font-size: 12px;"> Role </small>
                    </v-chip>

                </div>
                <small class="text-grey">Peerapon Permpoonmahasalkkkkkkkkkkkkkkhhhhhhhhhhhhhhhhhh</small>
            </div>
        </div>

    </v-navigation-drawer>
</template>

<style scoped>
.v-navigation-drawer {
  width: 260px;
  height: 100vh;;
  border-right: 1px solid #1f1f25;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
.nav-header-compo-text {
    align-items: center;
    margin-left: auto;
    padding-right: 15px;
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
    
    width: 260px;
    display: flex;
    align-self: flex-end ;
}

.user-banner-footer v-img {
    max-width: 40px;
    z-index: 1000;
    transform: translateY(-50%);

}

.nav-footter-compo-text {
    align-items: center;
    padding-right: 15px;
}

.nav-footter-compo-text small {
    display: inline-block;
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
}

</style>
