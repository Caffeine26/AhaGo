import { createRouter, createWebHistory } from "vue-router";
import DeliveryLayout from "@/views/delivery/deliveryLayout.vue"; 
import LandingPage from "@/views/delivery/landingPage.vue";
import ProfilePage from "@/views/delivery/profile/profile.vue";
import AuthPanel from '@/components/AuthPanel.vue'
import DashboardView from "@/views/Admin/DashboardView.vue";
import OrderView from "@/views/Admin/OrderView.vue";
import MessageView from "@/views/Admin/MessageView.vue";
import MenuView from "@/views/Admin/MenuView.vue";
import MenuItemDetail from "@/views/Admin/MenuItemDetail.vue";
import MaketingPage from "@/views/Admin/MaketingPage.vue";
import OrderTracking from "@/views/Admin/OrderTracking.vue";
import Account from "@/views/Admin/Account.vue";
import Review from "@/views/Admin/Review.vue";
import Inventory from "@/views/Admin/Inventory.vue";
import Login from "@/views/Admin/Login.vue";
import Signup from "@/views/Admin/Signup.vue";


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
    {
       
          path: '/admin/dashboard',
          name: 'Dashboard',
          component: DashboardView,
        
    },
    {
          path: '/admin/orders',
          name: 'Orders',
          component:OrderView,
    },
    {
          path:'/admin/orders/:id',
          name:'OrderTracking',
          component: OrderTracking,
    },
    {
          path: '/admin/messages',
          name: 'Messages',
          component: MessageView,
    },
    {
          path: '/admin/menus',
          name: 'Menu',
          component: MenuView,
    },
    {
          path:'/admin/menus/:id',
          name: 'MenuItemDetail',
          component: MenuItemDetail,
    },
    {     
          path:'/admin/marketing',
          name:'MaketingPage',
          component: MaketingPage,

    },
    {
          path:'/admin/order-tracking',
          name:'OrderTracking',
          component: OrderTracking,
    },
    {
          path:'/admin/account',
          name: 'Account',
          component: Account,
    },
    {
          path:'/admin/review',
          name: 'Review',
          component: Review,
    },
    {
          path:'/admin/inventory',
          name: 'Inventory',
          component: Inventory,
    },
    {
          path: '/admin/login',
          name: 'Login',
          component: Login,
    },
    {     
          path: '/admin/signup',
          name: 'Signup',
          component: Signup,
          

    },

  ],
});

export default router