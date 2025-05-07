import { createRouter, createWebHistory } from 'vue-router'
import AuthPanel from '@/components/AuthPanel.vue'

const routes = [
  {
    path: '/',
    redirect: '/signin'
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: AuthPanel,
    props: { defaultPanel: 'login' }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: AuthPanel,
    props: { defaultPanel: 'register' }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: AuthPanel,
    props: { defaultPanel: 'forgot' }
  },
  {
    path: '/test-cards',
    name: 'TestCards',
    component: () => import('@/views/TestCards.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router