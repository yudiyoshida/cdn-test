
// import { createPinia } from 'pinia';
// import { createApp } from 'vue';
// import App from './App.vue';
// import router from './router';

import { defineCustomElement } from "vue";


// const app = createApp(App);

// app.use(createPinia());
// app.use(router);(

// app.mount('#app');

const MyApp = defineCustomElement({
  props: {},
  emits: {},
  template: `...`, 
});

customElements.define('my-app', MyApp);

document.body.appendChild(new MyApp());