import { createApp } from 'vue'
import App from './App.vue'
import apollo from './plugins/apollo'
import { DefaultApolloClient } from '@vue/apollo-composable'
import rules from "./plugins/rules"
import modal from "@/plugins/modal"
import "./index.css"
import router from '@/router'

createApp(App).provide(DefaultApolloClient, apollo)
    .provide("$apollo", apollo)
    .use(modal)
    .use(router)
    .mixin(rules)
    .mount('#app')
