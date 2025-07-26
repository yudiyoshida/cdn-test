import { defineCustomElement } from "vue";
import AppCe from "./App.ce.vue";

const MyApp = defineCustomElement(AppCe);

customElements.define('my-app', MyApp);

document.body.appendChild(new MyApp());