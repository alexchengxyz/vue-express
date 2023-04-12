import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import { createPinia } from 'pinia';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from './App.vue';
import router from './router';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';

const app = createApp(App)
  .use(createPinia())
  .use(router)
  .use(ElementPlus);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount('#app');
