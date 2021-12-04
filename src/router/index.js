import { createWebHistory, createRouter } from "vue-router"
import generatedRoutes from 'virtual:generated-pages'


const history = createWebHistory();

const router = createRouter({ history, routes: generatedRoutes });


export default router;