import { createRouter, createWebHistory } from "vue-router";
import AppVue from "@/App.vue";
import DeliveryLayout from "@/views/delivery/deliveryLayout.vue"; // new layout
import LandingPage from "@/views/delivery/landingPage.vue";
import ProfilePage from "@/views/delivery/profile/profile.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppVue,
    },
    {
      path: "/delivery",
      component: DeliveryLayout, // handles shared layout only
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

export default router;
