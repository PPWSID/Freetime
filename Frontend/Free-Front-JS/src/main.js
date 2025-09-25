import './styles/main.scss';
import './styles/typo.scss';
import './styles/component.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';

const app = createApp(App);
const pinia = createPinia();

app.use(VueAxios, axios);
app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount('#app');
