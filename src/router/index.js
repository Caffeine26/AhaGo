import { createRouter, createWebHistory } from "vue-router";
import DeliveryLayout from "@/views/delivery/deliveryLayout.vue";
import LandingPage from "@/views/delivery/landingPage.vue";
import BasicsPage from "@/views/delivery/basics/basicsPage.vue";
import ProfilePage from "@/views/delivery/settings/profile.vue";
import AuthPanel from "@/components/AuthPanel.vue";
import NotificationPage from "@/views/delivery/settings/notificationProfile.vue";
import earningsProfile from "@/views/delivery/settings/earningsProfile.vue";
import ratingsProfile from "@/views/delivery/settings/ratingsProfile.vue";
import incomingDelivery from "@/views/delivery/settings/incomingDelivery.vue";
import deliveryHistory from "@/views/delivery/settings/deliveryHistory.vue";
import mapOrder from "@/views/delivery/mapOrder.vue";
import sectionPage from "@/views/delivery/basics/sectionPage.vue";
import settingsLayout from "@/views/delivery/settings/settingsLayout.vue";
import SectionDetail from '@/views/delivery/basics/SectionDetail.vue'; 
import AboutUs from "@/views/delivery/AboutUs.vue";
import ContactUs from "@/views/delivery/ContactUs.vue";
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
          props: true
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
          ]
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
  ],
});

export default router;
