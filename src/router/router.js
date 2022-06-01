import HomePage from "@/pages/HomePage"
import HistoryPage from "@/pages/HistoryPage"

import { createRouter, createWebHistory } from "vue-router"

const routes = [
	{
		path: '/',
		component: HomePage
 },
 {
		path: '/history',
		component: HistoryPage
 },
  
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URl),
	scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
			return {
				el: to.hash,
				top: 20,
				behavior: 'smooth'
			}
		}
  }
})

export default router; 