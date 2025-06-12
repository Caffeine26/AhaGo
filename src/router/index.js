import { createRouter, createWebHistory } from "vue-router";
import DeliveryLayout from "@/views/delivery/deliveryLayout.vue"; 
import LandingPage from "@/views/delivery/landingPage.vue";
import ProfilePage from "@/views/delivery/profile/profile.vue";
import AuthPanel from '@/components/AuthPanel.vue';
import MenuPage from "@/views/owner/MenuPage.vue";
import MenuNewCategory from "@/views/owner/MenuNewCategory.vue";
import MenuCreatePage from "@/views/owner/MenuCreatePage.vue";
import OwnerLandingPage from "@/views/owner/OwnerLandingPage.vue";
import OrdersPage from "@/views/owner/OrdersPage.vue";
import OrderDetails from "@/components/OrderDetails.vue";
import OrderDetailPage from "@/views/owner/OrderDetailPage.vue";
import MenuEditPage from "@/views/owner/MenuEditPage.vue";
import InvoicePage from "@/views/owner/InvoicePage.vue";
import TransactionPage from "@/views/owner/TransactionPage.vue";
import OwnerProfilePage from "@/views/owner/OwnerProfilePage.vue";
import OwnerProfileEdit from "@/views/owner/OwnerProfileEdit.vue";
import OwnerLogin from "@/views/owner/OwnerLogin.vue";
import OwnerSignup from "@/views/owner/OwnerSignup.vue";
import OwnerTrackings from "@/views/owner/OwnerTrackings.vue";

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
      path: "/owner",
      component: OwnerLandingPage,
    },
    {
      path: "/owner/menu",
      component: MenuPage
    },
    {
      path: "/owner/menu/addCategory",
      component: MenuNewCategory
    },
    {
      path: "/owner/menu/createItem",
      component: MenuCreatePage
    },
    {
      path: "/owner/menu/edit/:itemId",
      component: MenuEditPage
    },
    {
      path: "/owner/order",
      component: OrdersPage,
    },
    {
      path: "/owner/order/details/:orderId",
      component: OrderDetailPage
    },
    {
      path: "/owner/order/invoice/:orderId",
      component: InvoicePage
    },
    {
      path: "/owner/transactions",
      component: TransactionPage
    },
    {
      path: "/owner/profile/:restId",
      component: OwnerProfilePage
    },
    {
      path: "/owner/profile/:restId/edit",
      component: OwnerProfileEdit
    },
    {
      path: "/owner/profile/:restId/trackings",
      component: OwnerTrackings
    },
    {
      path: "/owner/login",
      component: OwnerLogin
    },
    {
      path: "/owner/signup",
      component: OwnerSignup
    }
  ],
});

export default router