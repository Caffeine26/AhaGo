<template>
  <div class="sidebar">
    <!-- Polygon Image -->
    <img class="polygon-image" :src="polygon2" alt="Polygon" />

    <!-- Profile Section -->
    <div class="section">
      <h3 class="section-title">Profile</h3>
      <ul class="nav">
        <transition name="sidebar-item">
          <SidebarItem
            :icon="profile"
            label="Edit Profile"
            :active="activeItem === 'Edit Profile'"
            @click="setActive('Edit Profile')"
          />
        </transition>
        <transition name="sidebar-item">
          <SidebarItem
            :icon="bell"
            label="Notifications"
            :active="activeItem === 'Notifications'"
            @click="setActive('Notifications')"
          />
        </transition>
      </ul>
    </div>

    <!-- Business Section -->
    <div class="section">
      <h3 class="section-title">Business</h3>
      <ul class="nav">
        <transition name="sidebar-item">
          <SidebarItem
            :icon="money"
            label="Track earnings"
            :active="activeItem === 'Track earnings'"
            @click="setActive('Track earnings')"
          />
        </transition>
        <transition name="sidebar-item">
          <SidebarItem
            :icon="star"
            label="Rate by clients"
            :active="activeItem === 'Rate by clients'"
            @click="setActive('Rate by clients')"
          />
        </transition>
        <transition name="sidebar-item">
          <SidebarItem
            :icon="comment"
            label="Customer feedback"
            :active="activeItem === 'Customer feedback'"
            @click="setActive('Customer feedback')"
          />
        </transition>
        <transition name="sidebar-item">
          <SidebarItem
            :icon="box"
            label="Past deliveries"
            :active="activeItem === 'Past deliveries'"
            @click="setActive('Past deliveries')"
          />
        </transition>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import SidebarItem from "@/components/delivery/sideBarItem.vue";
import polygon2 from "@/assets/delivery/icons/Polygon 2.svg";
import profile from "@/assets/delivery/icons/profile.svg";
import bell from "@/assets/delivery/icons/bell.svg";
import money from "@/assets/delivery/icons/money.svg";
import comment from "@/assets/delivery/icons/comment.svg";
import box from "@/assets/delivery/icons/box.svg";
import star from "@/assets/delivery/icons/star.svg";

const activeItem = ref("Edit Profile"); 

const setActive = (label) => {
  activeItem.value = label;
};
</script>

<style scoped>
.sidebar {
  width: 260px;
  height: 100vh;
  background-color: #9a0404;
  color: white;
  padding: 40px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
  border-bottom-right-radius: 60px;
  position: relative;
}

.polygon-image {
  position: absolute;
  top: -1px;
  left: 331px;
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
}
</style>
