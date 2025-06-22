import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favoriteProducts: [],
  }),
  actions: {
    toggleFavorite(product) {
      const index = this.favoriteProducts.findIndex((p) => p.id === product.id);
      if (index === -1) {
        this.favoriteProducts.push(product);
      } else {
        this.favoriteProducts.splice(index, 1);
      }
    },
  },
  persist: true,
}); 