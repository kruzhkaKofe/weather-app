import HomePage from "@/views/HomePage";
import HistoryPage from "@/views/HistoryPage";
import DetailsPage from "@/views/DetailsPage";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/history",
    component: HistoryPage,
  },
  {
    path: "/details",
    component: DetailsPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URl),
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
  },
});

export default router;
