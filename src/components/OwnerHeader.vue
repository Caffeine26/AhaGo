<template>

    <div class="container">
    <div class="title">{{ title }}</div>
    <div class="nav">
      <div
        class="nav-item"
        :class="{ active: activeItem === it1 }"
        @click="handleClick(it1, '/owner/home')"
      >
        {{ it1 }}
      </div>
      <div
        class="nav-item"
        :class="{ active: isRouteActive(['/owner/' + restId + '/orders']) }"
        @click="handleClick(it2, '/owner/' + restId + '/orders')"
      >
        {{ it2 }}
      </div>

      <div
        class="nav-item"
        :class="{ active: activeItem === it3 }"
        @click="handleClick(it3, '/owner/'  + restId + '/transactions')"
      >
        {{ it3 }}
      </div>
      <div
        class="nav-item"
        :class="{ active: activeItem === it4 }"
        @click="handleClick(it4, '/owner/' + restId + '/menu')"
      >
        {{ it4 }}
      </div>

      <div
        class="nav-item"
        :class="{ active: activeItem === it5 }"
        @click="handleClick(it5, '/owner/profile/' + restId)"
      >
        {{ it5 }}
      </div>
    </div>
  </div>

  
</template>

<script>
export default {
  name: "AppHeader2",
  data() {
    return {
      activeItem: null,
    };
  },
  props: {
    title: { type: String, default: "" },
    restId: { type: String, default: "2"},
    it1: { type: String, default: "" },
    it2: { type: String, default: "" },
    it3: { type: String, default: "" },
    it4: { type: String, default: "" },
    it5: { type: String, default: "" },
  },
  methods: {
    handleClick(label, route) {
      this.activeItem = label;
      this.$router.push(route);
    },
    isRouteActive(routes) {
      return routes.some((route) => this.$route.path.startsWith(route));
    },
    updateActiveFromRoute(path) {
      if (path === "/owner/home") {
        this.activeItem = this.it1;
      } else if (path === "/owner/"+this.restId+'/orders') {
        this.activeItem = this.it2;
      } else if (path === "/owner/"+this.restId+'/transactions') {
        this.activeItem = this.it3;
      } else if (path === "/owner/"+this.restId+'/menu') {
        this.activeItem = this.it4;
      } 
        else if (path === "/owner/profile"+this.restId) {
        this.activeItem = this.it5;
      }
      else {
        this.activeItem = null;
      }
    },
  },
  watch: {
    "$route.path"(newPath) {
      this.updateActiveFromRoute(newPath);
    },
  },
  created() {
    this.updateActiveFromRoute(this.$route.path);
  },
};
</script>

<style scoped>

.container {
  width: 93%;
  background-color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #292929;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;

  
}
.title {
  font-size: 28px;
  font-weight: 700;
  padding-left: 60px;
}
.nav {
  display: flex;
  gap: 40px;
  padding-right: 60px;
}
.nav-item:hover {
  transform: scale(1.1);
}
.nav-item {
  cursor: pointer;
  font-weight: 500;
  transition: font-weight 0.3s ease-in-out;
  font-size: 22px;
}
.nav-item.active {
  font-weight: 700;
  border-bottom: 3px solid #9a0404;
}
</style>
