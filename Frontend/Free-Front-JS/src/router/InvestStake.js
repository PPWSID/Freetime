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
    component: () => import("../components/InvestStake/SideNav.vue"),
  },
  {
    path: "/investstake/topasset",
    name: "InvestStake-topasset",
    component: () => import("../components/InvestStake/TopAsset.vue"),
  },
  {
    path: "/investstake/dailyusd",
    name : "InvestStake-dailyusd",
    component : () => import("../components/InvestStake/DailyUSD.vue"),
    }
]