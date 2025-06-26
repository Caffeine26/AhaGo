<template>
  <aside class="sidebar">
    <div class="logo">
      <img src="@/assets/ahago-logo.png" alt="Logo" />
    </div>
    <nav class="menu">
      <ul>
        <li v-for="item in menuItems" :key="item.name">
          <router-link :to="item.path">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      menuItems: [
        { name: 'Dashboard', path: '/admin/dashboard', icon: 'fas fa-tachometer-alt' },
        { name: 'Order', path: '/admin/orders', icon: 'fas fa-receipt' },
        { name: 'Message', path: '/admin/messages', icon: 'fas fa-envelope' },
        { name: 'Menu', path: '/admin/menus', icon: 'fas fa-utensils' },
        { name: 'Management', path: '/admin/management', icon: 'fas fa-boxes' },
        { name: 'Account', path: '/admin/account', icon: 'fas fa-user' },
        { name: 'Review', path: '/admin/review', icon: 'fas fa-star' },
        { name: 'Marketing', path: '/admin/marketing', icon: 'fas fa-bullhorn' }
      ]
    };
  }
};
</script>

<style scoped>
.sidebar {
  width: 100%;
  height: 100%;
  background-color: #2d2d2d;
  color: white;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
}

.logo {
  text-align: center;
  margin-bottom: 30px;
  padding: 0 20px;
}

.logo img {
  width: 120px;
  max-width: 100%;
}

.menu {
  flex: 1;
  overflow-y: auto;
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  margin: 15px 0;
}

.menu a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  transition: all 0.3s ease;
}

.menu a:hover {
  background-color: #444;
}

.menu a i {
  margin-right: 10px;
  width: 20px;
  text-align: center;
}

.menu a.router-link-exact-active {
  background-color: #444;
  border-left: 4px solid #f39c12;
  padding-left: 16px;
}
</style>