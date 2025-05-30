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
import ratingsProfile from "@/views/delivery/settings/ratingsProfile.vue";
import settingsLayout from "@/views/delivery/settings/settingsLayout.vue";
import SignUp from "@/views/delivery/authentication/SignUp.vue";
import deliverLayout from "@/views/delivery/authentication/deliverLayout.vue";
import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/signin",
    },
    {
      path: "/signin",
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
          path: "mapOrder",
          name: "mapOrder",
          component: mapOrder,
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
      ]
    }
  ],
});

export default router;
