<template>
  <header class="header">
    <h2 class="text-2xl font-bold">{{ title }}</h2>
    <div class="header-right">
      <input
        type="text"
        placeholder="Search..."
        class="search-input"
        v-model="searchText"
        @input="$emit('search', searchText)"
      />

      <div class="user-info" v-if="user">
        <img :src="userImageToUse" alt="Profile" class="user-img" />
        <span class="user-name">👤 {{ userNameToUse }}</span>
      </div>
    </div>
  </header>
</template>

<script>
import axios from "axios";
import defaultUserImage from "@/assets/Kuromi.jpg";

export default {
  name: "DashboardHeader",
  props: {
    title: {
      type: String,
      default: "Dashboard",
    },
  },
  data() {
    return {
      searchText: "",
      user: null,
    };
  },
  computed: {
    userImageToUse() {
      if (!this.user) return defaultUserImage;
      return this.user.img_src
        ? `http://localhost:8300/storage/${this.user.img_src}`
        : defaultUserImage;
    },
    userNameToUse() {
      if (!this.user) return "Guest";
      const profile = this.user.admin_profile;
      return profile?.firstname
        ? `${profile.firstname} ${profile.lastname}`
        : this.user.email;
    },
  },
  methods: {
    async fetchCurrentUser() {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const res = await axios.get(`http://localhost:8300/api/users/${userId}`);
        this.user = res.data;
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    },
  },
  mounted() {
    this.fetchCurrentUser();
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-right: 12px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-input {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  width: 220px;
}

.search-input:focus {
  outline: none;
  border-color: #24a152;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #24a152;
}

.user-name {
  font-weight: 500;
  font-size: 14px;
}
</style>
