<template>
  <div class="sidebar">
    <img class="polygon-image" :src="polygon2" alt="Polygon" />

    <!-- Profile Section -->
    <div class="section">
      <h3 class="section-title">Personal</h3>
      <ul class="nav">
        <SidebarItem
          :icon="profile"
          label="Edit Profile"
          :active="activeItem === 'Edit Profile'"
          to="/delivery/settings/profile"
        />
        <SidebarItem
          :icon="id"
          label="My Documents"
          :active="activeItem === 'My Documents'"
          to="/delivery/settings/document"
        />
        <SidebarItem
          :icon="bell"
          label="Notifications"
          :active="activeItem === 'Notifications'"
          to="/delivery/settings/notification"
        />
      </ul>
    </div>

    <!-- Business Section -->
    <div class="section">
      <h3 class="section-title">Business</h3>
      <ul class="nav">
        <SidebarItem
          :icon="money"
          label="Track earnings"
          :active="activeItem === 'Track earnings'"
          to="/delivery/settings/earnings"
        />
        <SidebarItem
          :icon="star"
          label="Customer Satisfaction"
          :active="activeItem === 'Customer Satisfaction'"
          to="/delivery/settings/ratings"
        />
      </ul>
    </div>

    <!-- Deliveries Section -->
    <div class="section">
      <h3 class="section-title">Deliveries</h3>
      <ul class="nav">
        <SidebarItem
          :icon="order"
          label="Incoming Orders"
          :active="activeItem === 'Incoming Orders'"
          to="/delivery/settings/orders"
        />
        <SidebarItem
          :icon="box"
          label="Past Deliveries"
          :active="activeItem === 'Past Deliveries'"
          to="/delivery/settings/history"
        />
      </ul>
    </div>

    <!-- Logout -->
    <div class="logout-wrapper">
      <SidebarItem
        :icon="exit"
        label="Log Out"
        :active="false"
        @click="logout"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { defineProps } from "vue";

import SidebarItem from "@/components/delivery/sideBarItem.vue";

import bell from "@/assets/delivery/icons/bell.svg";
import box from "@/assets/delivery/icons/box.svg";
import money from "@/assets/delivery/icons/money.svg";
import polygon2 from "@/assets/delivery/icons/Polygon 2.svg";
import profile from "@/assets/delivery/icons/profile.svg";
import star from "@/assets/delivery/icons/star.svg";
import order from "@/assets/delivery/icons/order.svg";
import id from "@/assets/delivery/icons/id.svg";
import exit from "@/assets/delivery/icons/exit.svg";

const props = defineProps({
  defaultActive: { type: String, default: "" },
});

const route = useRoute();
const router = useRouter();

const activeItem = computed(() => {
  const path = route.path;

  switch (path) {
    case "/delivery/settings/profile":
      return props.defaultActive || "Edit Profile";
    case "/delivery/settings/document":
      return "My Documents";
    case "/delivery/settings/notification":
      return "Notifications";
    case "/delivery/settings/earnings":
      return "Track earnings";
    case "/delivery/settings/ratings":
      return "Customer Satisfaction";
    case "/delivery/settings/orders":
      return "Incoming Orders";
    case "/delivery/settings/history":
      return "Past Deliveries";
    default:
      return "";
  }
});

const logout = () => {
  router.push("/driver/login"); // Redirect to login page
};
</script>

<style scoped>
.sidebar {
  width: 290px;
  background-color: #9a0404;
  color: white;
  padding: 40px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
  border-bottom-right-radius: 60px;
  position: relative;

  display: flex;
  flex-direction: column;
}

.polygon-image {
  position: absolute;
  top: -1px;
  left: 360px;
  width: 137px;
  height: 121px;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
}

.nav {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  z-index: 1;
  gap: 10px;
  display: flex;
  flex-direction: column;
}

.logout-wrapper {
  /* display: flex;
  align-items: end;
  justify-content: end; */
}
</style>
