import { createRouter, createWebHistory } from "vue-router";
import DisplayView from "../views/DisplayView.vue";
import AnalysisView from "../views/AnalysisView.vue";
import CompareView from "../views/CompareView.vue";
import RecommendView from "../views/RecommendView.vue";
const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/display",
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/display",
    name: "display",
    // component: () => import('../views/DisplayView.vue')
    component: DisplayView,
  },
  {
    path: "/analysis",
    name: "analysis",
    // component: () => import('../views/AnalysisView.vue')
    component: AnalysisView,
  },
  {
    path: "/compare",
    name: "compare",
    // component: () => import('../views/CompareView.vue')
    component: CompareView,
  },
  {
    path: "/recommend",
    name: "recommend",
    // component: () => import('../views/RecommendView.vue')
    component: RecommendView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
