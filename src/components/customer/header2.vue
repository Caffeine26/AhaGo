  <template>
    <div class="container">
      <div class="Logo" @click="goToOverview" style="cursor: pointer">
        <img class="logo" src="@/assets/main/logo.png" alt="Logo" />
        <div class="title" v-html="title"></div>
      </div>

      <div class="nav">
        <ul>Help</ul>
        <div class="acc">
          <ul v-if="!userLoggedIn" @click="goToLogin">Login</ul>
          <ul v-if="!userLoggedIn" class="sign" @click="goToSignup">Sign Up</ul>

          <div v-if="userLoggedIn" class="user-section" @click.stop="toggleDropdown">
            <img :src="authUser.img_src || defaultAvatar" alt="User" class="user-avatar" />
            <span class="user-name">{{ authUser.firstname || authUser.firstName || 'User' }}</span>
            <img
              src="@/assets/down.png"
              alt="arrow"
              :class="['arrow-icon', { 'is-open': showDropdown }]"
            />
            <ProfileDropdown v-if="showDropdown" :logout="logout" class="dropdown" />
          </div>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import { useRouter } from "vue-router";
  import { defineProps, ref, computed } from "vue";
  import ProfileDropdown from './ProfileDropdown.vue';
  import { useAuthStore } from '@/stores/authenticationStore';

  const authStore = useAuthStore();

  const props = defineProps({
    title: { type: String, default: "" },
    ownerUrl: { type: Boolean, default: false },
    goToAccount: Function,
    userLoggedIn: { type: Boolean, required: true },
    logout: Function,
    basePath: { type: String, default: "" }
  });

  const router = useRouter();
  const showDropdown = ref(false);

  const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
  };

  const buildRoute = (path) => {
    return props.basePath ? `/${props.basePath}/${path}` : `/${path}`;
  };

  const goToLogin = () => router.push(buildRoute("login"));
  const goToSignup = () => router.push(buildRoute("signup"));
  const goToOverview = () => router.push(buildRoute(""));
  const logout = () => router.push(buildRoute("login"))
  // Use a computed to get reactive user data from authStore.user
  const authUser = computed(() => authStore.user || {});

  </script>

  <style scoped>
  .container {
    width: 100vw;
    background-color: #292929;
    color: white;
    padding: 10px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .Logo {
    gap: 10px;
    display: flex;
    align-items: center;
  }
  .logo {
    height: 80px;
    width: auto;
  }
  .title {
    font-size: 32px;
    white-space: nowrap;
  }
  .sign {
    padding: 10px;
    background-color: white;
    border-radius: 20px;
    color: #292929;
    cursor: pointer;
    white-space: nowrap;
  }
  .nav,
  .acc {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    font-size: 20px;
  }
  .account img {
    border-radius: 20px;
    height: 40px;
    width: 40px;
    object-fit: cover;
  }
  .user-avatar {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  .user-name {
    color: white;
    font-weight: 500;
  }
  .arrow-icon {
    height: 12px;
    width: 12px;
    transition: transform 0.3s ease;
    filter: invert(1);
  }
  .arrow-icon.is-open {
    transform: rotate(180deg);
  }
  .user-section {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
  
  @media (max-width: 768px) {
    .container {
      padding: 0px 1rem;
    }
    .title {
      font-size: 24px;
    }
    .nav,
    .acc {
      font-size: 16px;
      gap: 10px;
    }
    .logo {
      height: 40px;
    }
  }
  </style> 