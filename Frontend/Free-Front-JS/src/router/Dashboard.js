export default [
  {
    path: "/dashboard",
    name: "Dashboard-main",
    component: () => import("../views/DashBoard.vue"),
  },
  {
    path: "/dashboard/doughnut",
    name: "Dashboard-doughnut",
    component: () => import("../components/DashboardComponent/DoughnutChart.vue"),
  }
]