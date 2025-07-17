/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApp } from 'vue'
import App from './App.vue'

let appInstance: any = null

function mountWidget() {
  if (document.getElementById('my-vue-widget-root')) return

  const el = document.createElement('div')
  el.id = 'my-vue-widget-root'
  el.style.position = 'fixed'
  el.style.bottom = '20px'
  el.style.left = '20px'
  el.style.zIndex = '9999'
  document.body.appendChild(el)

  appInstance = createApp(App)
  appInstance.mount('#my-vue-widget-root')

  return 'Widget mounted successfully'
}

function unmountWidget() {
  if (appInstance) {
    appInstance.unmount()
    const el = document.getElementById('my-vue-widget-root')
    el?.remove()
    appInstance = null
  }
}

// Expor na janela global
(window as any).MyWidget = {
  open: mountWidget,
  close: unmountWidget
}
