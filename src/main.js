import { createApp } from 'vue'
import App from './App.vue'
import router from '@/routing';
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiGithub, BiHeartFill } from "oh-vue-icons/icons";

addIcons(BiGithub, BiHeartFill);

const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.use(router);
app.mount('#app');

document.title = 'F1 season simulator';
