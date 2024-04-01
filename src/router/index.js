import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('../views/Authentication/Login.vue'),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('../views/Authentication/Register.vue'),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: () => import('../views/Admin/Dashboard.vue')
    },
    {
      path: '/admin/brands',
      name: 'brands',
      component: () => import('@/views/Admin/Brand.vue')
    }
  ]
})

/* Guest Routes Configuration */
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresGuest && auth.isLoggedIn && auth.token !== '') {
    next('/admin/dashboard')
  } else {
    next()
  }
})

/* Protection Reset Password Route Configuration */
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresToken && !auth.verifiedOTP) {
    next('/auth/forget-password')
  } else {
    next()
  }
})

/* Protected Routes Configuration */
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && auth.token === '' && !auth.isLoggedIn) {
    next('/auth/login')
  } else {
    next()
  }
})

/* NProgress Configuration */
router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
})
router.afterEach(() => {
  NProgress.done()
})
export default router
