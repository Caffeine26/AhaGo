import { createRouter, createWebHistory } from "vue-router";
import AppVue from "@/App.vue";
import DeliveryLayout from "@/views/delivery/deliveryLayout.vue"; 
import LandingPage from "@/views/delivery/landingPage.vue";
import ProfilePage from "@/views/delivery/profile/profile.vue";
import AuthPanel from '@/components/AuthPanel.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    },
    {
      path: "/",
      name: "home",
      component: AppVue,
    },
    {
      path: "/delivery",
      component: DeliveryLayout, 
      children: [
        {
          path: "",
          name: "deliveryLanding",
          component: LandingPage,
        },
        {
          path: "profile",
          name: "profilePage",
          component: ProfilePage,
        },
      ],
    },
  ],
});

export default router