import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from "@/stores/userStore";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/new_home.vue'),
    },
    {
      path: '/MemberCenter',
      component: () => import('@/views/MemberCenter.vue'),
      meta: { requiresAuth: true }
     },
    {
      path: '/MemberCenter/track',
      component: () => import('@/views/MemberTrack.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/MemberCenter/MemberFeedback',
      component: () => import('@/views/MemberFeedback.vue'),
      // meta: { requiresAuth: true }
    },
    {
      path: '/MemberCenter/MemberData',
      component: () => import('@/views/MemberData.vue'),
      // meta: { requiresAuth: true }
    },
    {
      path: '/MemberCenter/MemberDataUpdate',
      component: () => import('@/views/MemberDataUpdate.vue'),
      // meta: { requiresAuth: true }
    },
    {
      path: '/MemberCenter/MemberResetPassword',
      component: () => import('@/views/MemberResetPassword.vue'),
      // meta: { requiresAuth: true }
    },
    {
      path: '/MemberCenter/CustomerFeedbackAdd',
      component: () => import('@/views/CustomerFeedbackAdd.vue'),
      // meta: { requiresAuth: true }
    },


    {
      path: '/MemberCenter/MemberOrders',
      component: () => import('@/views/MemberOrders.vue'),
      // meta: { requiresAuth: true }
    },

    {
      path: '/MemberCenter/CustomerRight',
      component: () => import('@/views/CustomerRights.vue'),
    },

    {
      path: '/MemberCenter/UserRight',
      component: () => import('@/views/UserRights.vue'),
    },

    {
      path: '/MemberCenter/CommonProblems',
      component: () => import('@/views/CommonProblem.vue'),
    },


    {
      path: '/MemberCenter/CustomerFeedbackUpdate',
      name: 'CustomerFeedbackUpdate',
      component: () => import('@/views/CustomerFeedbackUpdate.vue'),
      props: true // 允许通过 props 接收参数
    },

    {
      path: '/MemberCenter/OrderFeedbackUpdate',
      name: 'OrderFeedbackUpdate',
      component: () => import('@/views/OrderFeedbackUpdate.vue'),
      props: true // 允许通过 props 接收参数
    },

    {
      path: "/product",
      component: () => import("@/views/product_page.vue"),
    },
        {
          path: "/product/iphoneIndex",
          component: () => import("@/views/iphone_page.vue"),
        },
        {
          path: "/product/ipadIndex",
          component: () => import("@/views/ipad_page.vue"),
        },
        {
          path: "/product/macbookIndex",
          component: () => import("@/views/macbook_page.vue"),
        },
        {
          path: "/product/detail",
          component: () => import("@/views/product_detail_page.vue"),
        },
    {
      path: "/findUs",
      component: () => import("@/views/FindUs.vue"),
    },
    {
      path: "/cart",
      component: () => import("@/views/Cart.vue"),
    },
      {
          path: "/checkout",
          component: () => import("@/views/payment/Checkout.vue"),
      },

      {
          path: '/paypal',
          name: 'paypal',
          component: () => import("@/views/payment/Paypal.vue")
      },
      {
          path: '/stripe',
          name: 'stripe',
          component: () => import("@/views/payment/Stripe.vue")
      },
      {
          path: '/successPage',
          name: 'successPage',
          component: () => import("@/views/payment/success.vue")

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

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.matched.some(record => record.meta.requiresAuth) && !userStore.isLoggedIn) {
    sessionStorage.setItem('redirectRoute', to.fullPath); // 保存尝试访问的完整路径

      var myModal = new bootstrap.Modal(document.getElementById('blockedAccountModal'));
      myModal.show();


  } else {
    // 確保一定要調用 next()
    next();
  }
});

export default router
