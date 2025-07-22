import './assets/main.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App)

app.use(createPinia());
app.mount('#app')

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { createApp } from 'vue'
// import WidgetApp from './App.vue'

// const WidgetSingleton = () => {
//   let appInstance: ReturnType<typeof createApp> | null = null
//   let containerEl: HTMLElement | null = null
//   let propsData: Record<string, any> = {}

//   function createContainer() {
//     const el = document.createElement('div')
//     el.id = 'my-widget-container'
//     el.style.position = 'fixed'
//     el.style.bottom = '20px'
//     el.style.left = '20px'
//     el.style.zIndex = '999999'
//     document.body.appendChild(el)
//     return el
//   }

//   function mount() {
//     if (appInstance) return

//     containerEl = createContainer()
//     appInstance = createApp(WidgetApp, propsData)
//     appInstance.mount(containerEl)
//   }

//   function unmount() {
//     if (appInstance && containerEl) {
//       appInstance.unmount()
//       containerEl.remove()
//       appInstance = null
//       containerEl = null
//     }
//   }

//   function updateProps(newProps: Record<string, any>) {
//     propsData = { ...propsData, ...newProps }

//     if (appInstance) {
//       unmount()
//       mount()
//     }
//   }

//   return {
//     open(config: Record<string, any> = {}) {
//       updateProps(config)
//       mount()
//     },
//     close() {
//       unmount()
//     },
//     update(config: Record<string, any> = {}) {
//       updateProps(config)
//     }
//   }
// }

// // Expor no objeto global
// (window as any).MyWidget = WidgetSingleton()