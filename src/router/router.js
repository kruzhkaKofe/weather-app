import HomePage from "@/pages/HomePage"
import HistoryPage from "@/pages/HistoryPage"
import DetailsPage from "@/pages/DetailsPage"

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
 {
		path: '/details',
		component: DetailsPage
 },
 
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URl),
	scrollBehavior (to) {
    if (to.hash) {
			return {
				el: to.hash,
				behavior: 'smooth'
			}
		}
  }
})

export default router; 