import { createRouter, createWebHistory } from "vue-router";
import DeliveryLayout from "@/views/delivery/deliveryLayout.vue"; 
import LandingPage from "@/views/delivery/landingPage.vue";
import ProfilePage from "@/views/delivery/profile/profile.vue";
import AuthPanel from '@/components/AuthPanel.vue'
import HomePage from '@/views/client/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/splash'
    },
    {
      path: '/splash',
      name: 'Splash',
      component: HomePage
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
      path: '/client',
      name: 'ClientLanding',
      component: () => import('@/views/client/LandingPage.vue')
    },
    {
      path: '/store/:brandName',
      name: 'StoreDetails',
      component: () => import('@/views/client/StoreDetailsPage.vue')
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