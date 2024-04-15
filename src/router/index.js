import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/new_home.vue'),
    },
    {
      path: '/member_center',
      component: () => import('@/views/member_center.vue'),

     },
    {
      path: '/member_center/track',
      component: () => import('@/views/member_track.vue'),
    },
    {
      path: '/member_center/customer_feedback',
      component: () => import('@/views/member_feedback.vue'),
    },
    {
      path: '/member_center/member_data',
      component: () => import('@/views/member_data.vue'),
    },
    {
      path: '/member_center/member_data_update',
      component: () => import('@/views/member_data_update.vue'),
    },
    {
      path: '/member_center/member_reset_password',
      component: () => import('@/views/member_reset_password.vue'),
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
          component: () => import("@/views/payment/Paypal.vue") // Assumes that Paypal.vue is in the `views` folder
      },
      {
          path: '/successPage',
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
      {
          path: "/uploadPhotos",
          component: () => import("@/views/upload_page.vue"),
      },



  ]
})

export default router
