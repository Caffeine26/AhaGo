import AuthPanel from "@/components/AuthPanel.vue";
import AboutUs from "@/views/delivery/AboutUs.vue";
import BasicsPage from "@/views/delivery/basics/basicsPage.vue";
import SectionDetail from "@/views/delivery/basics/SectionDetail.vue";
import sectionPage from "@/views/delivery/basics/sectionPage.vue";
import ContactUs from "@/views/delivery/ContactUs.vue";
import DeliveryLayout from "@/views/delivery/deliveryLayout.vue";
import LandingPage from "@/views/delivery/landingPage.vue";
import LogIn from "@/views/delivery/authentication/LogIn.vue";
import mapOrder from "@/views/delivery/mapOrder.vue";
import deliveryHistory from "@/views/delivery/settings/deliveryHistory.vue";
import earningsProfile from "@/views/delivery/settings/earningsProfile.vue";
import incomingDelivery from "@/views/delivery/settings/incomingDelivery.vue";
import NotificationPage from "@/views/delivery/settings/notificationProfile.vue";
import ProfilePage from "@/views/delivery/settings/profile.vue";
import documentPage from "@/views/delivery/settings/documentPage.vue";
import ratingsProfile from "@/views/delivery/settings/ratingsProfile.vue";
import settingsLayout from "@/views/delivery/settings/settingsLayout.vue";
import SignUp from "@/views/delivery/authentication/SignUp.vue";
import deliverLayout from "@/views/delivery/authentication/deliverLayout.vue";
import { createRouter, createWebHistory } from "vue-router";
import MenuPage from "@/views/owner/MenuPage.vue";
import MenuNewCategory from "@/views/owner/MenuNewCategory.vue";
import MenuCreatePage from "@/views/owner/MenuCreatePage.vue";
import OwnerLandingPage from "@/views/owner/OwnerLandingPage.vue";
import OrdersPage from "@/views/owner/OrdersPage.vue";
import OrderDetailPage from "@/views/owner/OrderDetailPage.vue";
import MenuEditPage from "@/views/owner/MenuEditPage.vue";
import InvoicePage from "@/views/owner/InvoicePage.vue";
import TransactionPage from "@/views/owner/TransactionPage.vue";
import OwnerProfilePage from "@/views/owner/OwnerProfilePage.vue";
import OwnerProfileEdit from "@/views/owner/OwnerProfileEdit.vue";
import OwnerLogin from "@/views/owner/OwnerLogin.vue";
import OwnerSignup from "@/views/owner/OwnerSignup.vue";
import OwnerTrackings from "@/views/owner/OwnerTrackings.vue";
import HomePage from "@/views/client/HomePage.vue";
import CustomerLayout from "@/views/client/CustomerLayout.vue";
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
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      redirect: "/splash",
    },
    {
      path: "/splash",
      name: "Splash",
      component: HomePage,
    },
    {
      path: "/login",
      name: "SignIn",
      component: AuthPanel,
      props: { defaultPanel: "login" },
    },
    {
      path: "/signup",
      name: "SignUp",
      component: AuthPanel,
      props: { defaultPanel: "register" },
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: AuthPanel,
      props: { defaultPanel: "forgot" },
    },
    {
      path: "/test-cards",
      name: "TestCards",
      component: () => import("@/views/TestCards.vue"),
    },
    {
      path: "/",
      component: CustomerLayout,
      children: [
        {
      path: '/',
      name: 'ClientLanding',
      component: () => import('@/views/client/LandingPage.vue')
    },
    {
      path: '/store/:brandName',
      name: 'StoreDetails',
      component: () => import('@/views/client/StoreDetailsPage.vue')
    },
    {
      path: '/checkout/:brandName/:cartItems',
      name: 'checkout',
      component: () => import('@/views/client/CheckoutPage.vue'),
      props: true
    },
    {
      path: '/add-location',
      name: 'AddLocation',
      component: () => import('@/views/client/AddLocationPage.vue')
    },
    {
      path: '/order-confirmation',
      name: 'OrderConfirmation',
      component: () => import('@/views/client/OrderConfirmationPage.vue'),
      
    },
      ]
    },
    {
      path: "/delivery",
      component: DeliveryLayout,
      children: [
        {
          path: "overview",
          name: "deliveryLanding",
          component: LandingPage,
        },
        {
          path: "basics",
          name: "deliveryBasics",
          component: BasicsPage,
        },
        {
          path: "basics/:section/:buttonLink",
          name: "SectionDetail",
          component: SectionDetail,
          props: true,
        },
        {
          path: "basics/:section",
          name: "sectionPage",
          component: sectionPage,
        },
        {
          path: "settings",
          name: "settingsPage",
          component: settingsLayout,
          children: [
            {
              path: "profile",
              name: "profilePage",
              component: ProfilePage,
            },
            {
              path: "document",
              name: "documentPage",
              component: documentPage,
            },
            {
              path: "notification",
              name: "notificationPage",
              component: NotificationPage,
            },
            {
              path: "earnings",
              name: "earningsPage",
              component: earningsProfile,
            },
            {
              path: "ratings",
              name: "ratingsPage",
              component: ratingsProfile,
            },
            {
              path: "orders",
              name: "incomingDelivery",
              component: incomingDelivery,
            },
            {
              path: "history",
              name: "deliveryHistory",
              component: deliveryHistory,
            },
          ],
        },
        {
          path: "mapOrder/:id",
          name: "mapOrder",
          component: mapOrder,
          props: true,
        },
        {
          path: "aboutus",
          name: "aboutus",
          component: AboutUs,
        },
        {
          path: "contactus",
          name: "contactus",
          component: ContactUs,
        },
      ],
    },
    {
      path: "/deliver",
      component: deliverLayout,
      children: [
        {
          path: "login",
          name: "login",
          component: LogIn,
        },
        {
          path: "signup",
          name: "signup",
          component: SignUp,
        },
      ],
    },
    {
      path: "/owner",
      component: OwnerLandingPage,
    },
    {
      path: "/owner/:restId/menu",
      component: MenuPage
    },
    {
      path: "/owner/:restId/menu/addCategory",
      component: MenuNewCategory
    },
    {
      path: "/owner/:restId/menu/createItem",
      component: MenuCreatePage
    },
    {
      path: "/owner/:restId/menu/edit/:itemId",
      component: MenuEditPage
    },
    {
      path: "/owner/order",
      component: OrdersPage,
    },
    {
      path: "/owner/order/details/:orderId",
      component: OrderDetailPage,
    },
    {
      path: "/owner/order/invoice/:orderId",
      component: InvoicePage,
    },
    {
      path: "/owner/transactions",
      component: TransactionPage,
    },
    {
      path: "/owner/profile/:restId",
      component: OwnerProfilePage,
    },
    {
      path: "/owner/profile/:restId/edit",
      component: OwnerProfileEdit,
    },
    {
      path: "/owner/profile/:restId/trackings",
      component: OwnerTrackings,
    },
    {
      path: "/owner/login",
      component: OwnerLogin,
    },
    {
      path: "/owner/signup",
      component: OwnerSignup,
    },
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      component: DashboardView,
    },
    {
      path: "/admin/orders",
      name: "Orders",
      component: OrderView,
    },
    {
      path: "/admin/orders/:id",
      name: "OrderTracking",
      component: OrderTracking,
    },
    {
      path: "/admin/messages",
      name: "Messages",
      component: MessageView,
    },
    {
      path: "/admin/menus",
      name: "Menu",
      component: MenuView,
    },
    {
      path: "/admin/menus/:id",
      name: "MenuItemDetail",
      component: MenuItemDetail,
    },
    {
      path: "/admin/marketing",
      name: "MaketingPage",
      component: MaketingPage,
    },
    {
      path: "/admin/order-tracking",
      name: "OrderTracking",
      component: OrderTracking,
    },
    {
      path: "/admin/account",
      name: "Account",
      component: Account,
    },
    {
      path: "/admin/review",
      name: "Review",
      component: Review,
    },
    {
      path: "/admin/inventory",
      name: "Inventory",
      component: Inventory,
    },
    {
      path: "/admin/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/admin/signup",
      name: "Signup",
      component: Signup,
    },
  ],
});

export default router;
