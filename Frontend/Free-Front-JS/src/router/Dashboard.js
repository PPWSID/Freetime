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
  },
  {
    path: "/dashboard/bar",
    name: "Dashboard-bar",
    component: () => import("../components/DashboardComponent/BarChart.vue"),
  },
  {
    path: "/dashboard/table",
    name: "Dashboard-table",
    component: () => import("../components/DashboardComponent/Table.vue"),
  },
]