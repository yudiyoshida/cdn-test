import './assets/main.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';

const mount = () => {
  const el = document.createElement('div');
  document.body.appendChild(el);

  createApp(App)
    .use(createPinia())
    .mount(el);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}