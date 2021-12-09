import { createApp } from 'vue'
import App from './App.vue'
import apollo from './plugins/apollo'
import { DefaultApolloClient } from '@vue/apollo-composable'
import rules from "./plugins/rules"
import modal from "@/plugins/modal"
import "./index.css"
import router from '@/router'
import toast from "@/plugins/toast"

const app = createApp(App);

app.provide(DefaultApolloClient, apollo)
    .provide("$apollo", apollo)
    .provide("$global", app.config.globalProperties)
    .use(modal)
    .use(toast)
    .use(router)
    .mixin(rules)
    .mount('#app')
