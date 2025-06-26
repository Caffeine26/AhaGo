<template>
  <div>
    <Header
      :userLoggedIn="userLoggedIn"
      :userProfileImg="user?.img_src"
      title="<span style='color: #9A0404;'>AhaGo</span>"
      @go-to-account="goToAccount"
      @toggle-dropdown="toggleDropdown"
    />
    <div v-if="showDropdown" class="dropdown-wrapper">
      <ProfileDropdown :logout="handleLogout" />
    </div>
    <div class="favorites-page">
      <h1>My Favourites</h1>
      <div v-if="favoriteProducts.length > 0" class="favorites-list">
        <ProductCard
          v-for="product in favoriteProducts"
          :key="product.id"
          :title="product.title"
          :image="product.image"           
          :price="product.price"
          :category="product.category"
          :deliveryTime="product.deliveryTime"
          :deliveryPrice="product.deliveryPrice"
          :rating="product.rating"
          :productId="product.id"
          :is-favorite="true"
          @toggle-favorite="toggleFavorite(product)"
        />
      </div>
      <div v-else class="empty-favorites">
        <h2>No Favourites Saved</h2>
        <p>
          You'll see all your favorites here, to make ordering even faster. Just
          look for the <span class="heart">&hearts;</span>
        </p>
        <button @click="findFavorites">Let's find some favourites</button>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useFavoritesStore } from '@/stores/favorites';
import { useAuthStore } from '@/stores/authenticationStore';
import { storeToRefs } from 'pinia';
import ProductCard from '@/components/product_cards/ProductCard.vue';
import Header from '@/components/customer/header2.vue';
import AppFooter from '@/components/AppFooter.vue';
import ProfileDropdown from '@/components/customer/ProfileDropdown.vue';

const router = useRouter();
const route = useRoute();
const favoritesStore = useFavoritesStore();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const userLoggedIn = ref(false);
const showDropdown = ref(false);

const favoriteProducts = computed(() => favoritesStore.favoriteProducts);

const findFavorites = () => {
  router.push('/');
};

const toggleFavorite = (product) => {
  favoritesStore.toggleFavorite(product);
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const handleLogout = () => {
  authStore.logout();
  showDropdown.value = false;
  router.push('/login');
};

const goToAccount = () => {
  router.push('/profile-settings');
};

onMounted(async () => {
  const storedRole = localStorage.getItem('role');
  const token = localStorage.getItem(`${storedRole}_token`);

  if (storedRole !== 'customer') {
    authStore.logout();
    return router.push('/login');
  }

  if (token && storedRole === 'customer') {
    authStore.role = storedRole;
    if (!user.value) {
      await authStore.fetchProfile();
    }
    userLoggedIn.value = !!user.value;
  } else {
    userLoggedIn.value = false;
  }
});

// Close dropdown on route change
watch(() => route.fullPath, () => {
  showDropdown.value = false;
});
</script>

<style scoped>
.favorites-page {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
}
h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
}
.favorites-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}
.empty-favorites {
  text-align: center;
  padding: 4rem 2rem;
  background-color: #fff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-column: 1 / -1;
}
.empty-favorites h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
.empty-favorites p {
  color: #6b7280;
  margin-bottom: 2rem;
  max-width: 400px;
}
.empty-favorites .heart {
  color: #9a0404;
}
.empty-favorites button {
  background-color: #9a0404;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}
.empty-favorites button:hover {
  background-color: #7f1d1d;
}
</style>