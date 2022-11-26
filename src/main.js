import { createApp } from 'vue'
import App from './App.vue'
import router from '@/routing';

const app = createApp(App);
app.use(router);
app.mount('#app');

document.title = 'F1 season simulator';
