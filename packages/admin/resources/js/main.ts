import { app } from './app'
import { createPinia } from 'pinia'
import { router } from './router'
import 'spack/spack'
import 'thetheme/thetheme'
import 'cooltipz-css'
import 'flatpickr/dist/flatpickr.css'
import './style.css'

app.use(createPinia()).use(router).mount('#app')
