import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { createPinia } from "pinia"
import SiderbarTree from "@/components/Sidebar/tree.vue"

const pinia = createPinia()
const app = createApp(App)

app.component("SiderbarTree", SiderbarTree)

app.use(pinia)
app.use(router)

app.mount("#app")
