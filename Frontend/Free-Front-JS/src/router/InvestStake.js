export default [
  {
    path: "/investstake",
    name: "InvestStake-main",
    component: () => import("../views/InvestStake.vue"),
  },
  {
    path: "/investstake/nav",
    name: "InvestStake-nav",
    component: () => import("../components/InvestStake/SideNav.vue"),
  },
  {
    path: "/investstake/banner",
    name: "InvestStake-banner",
    component: () => import("../components/InvestStake/BannerUser.vue"),
  }
]