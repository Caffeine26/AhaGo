<template>
  <div class="trending-menus">
    
    <div class="menu-list">
      <div class="menu-card" v-for="menu in menus" :key="menu.id">
        <img :src="menu.img_url" :alt="menu.name" />
        <div class="menu-info">
          <h4>{{ menu.name }}</h4>
          <p>${{ menu.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrendingMenus',
  props: {
    menus: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.trending-menus {
  background: white;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
}
.trending-menus h3 {
  margin-bottom: 15px;
}
.menu-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}
.menu-card {
  width: 250px;
  height:270px;

  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  background: #fafafa;
  text-align: center;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.menu-card img {
  width: 90%;
  height: 200px;
  object-fit: cover;
}
.menu-info {
  padding: 10px;
}
.menu-info h4 {
  margin: 0;
  font-size: 14px;
}
.menu-info p {
  margin: 5px 0 0;
  color: #da3333;
}
</style>
