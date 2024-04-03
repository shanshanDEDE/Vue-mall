import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomePage.vue'),
    },
    {
      path: '/MemberCenter',
      component: () => import('@/views/MemberCenter.vue'),
     },
    {
      path: '/MemberCenter/track',
      component: () => import('@/views/MemberTrack.vue'),
    },
    {
      path: '/MemberCenter/MemberFeedback',
      component: () => import('@/views/MemberFeedback.vue'),
    },
    {
      path: '/MemberCenter/MemberData',
      component: () => import('@/views/MemberData.vue'),
    },
    {
      path: '/MemberCenter/MemberDataUpdate',
      component: () => import('@/views/MemberDataUpdate.vue'),
    },
    {
      path: '/MemberCenter/MemberResetPassword',
      component: () => import('@/views/MemberResetPassword.vue'),
    },


    {
      path: '/MemberCenter/MemberOrders',
      component: () => import('@/views/MemberOrders.vue'),
    },


    {
      path: "/login",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/register",
      component: () => import("@/views/RegisterPage.vue"),
    },
    {
      path: "/forget",
      component: () => import("@/views/ForgetPassword.vue"),
    },
    {
      path: "/OLoginSuccess",
      component: () => import("@/views/Oath2LoginSuccess.vue"),
    },
    ]
})

export default router
