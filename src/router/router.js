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
  history: createWebHistory(process.env.BASE_URl)
})

export default router; 