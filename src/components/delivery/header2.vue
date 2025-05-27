<template>
  <div class="container">
    <div class="title">{{ title }}</div>
    <div class="nav">
      <div
        class="nav-item"
        :class="{ active: activeItem === it1 }"
        @click="handleClick(it1, '/delivery/overview')"
      >
        {{ it1 }}
      </div>
      <div
        class="nav-item"
        :class="{ active: isRouteActive(['/delivery/basics']) }"
        @click="handleClick(it2, '/delivery/basics')"
      >
        {{ it2 }}
      </div>

      <div
        class="nav-item"
        :class="{ active: activeItem === it3 }"
        @click="handleClick(it3, '/delivery/aboutus')"
      >
        {{ it3 }}
      </div>
      <div
        class="nav-item"
        :class="{ active: activeItem === it4 }"
        @click="handleClick(it4, '/delivery/contactus')"
      >
        {{ it4 }}
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
    it1: { type: String, default: "" },
    it2: { type: String, default: "" },
    it3: { type: String, default: "" },
    it4: { type: String, default: "" },
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
      if (path === "/delivery/overview") {
        this.activeItem = this.it1;
      } else if (path === "/delivery/basics") {
        this.activeItem = this.it2;
      } else if (path === "/delivery/aboutus") {
        this.activeItem = this.it3;
      } else if (path === "/delivery/contactus") {
        this.activeItem = this.it4;
      } else {
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
  padding: 10px 60px;
  color: #292929;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-size: 28px;
  font-weight: 700;
}
.nav {
  display: flex;
  gap: 40px;
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
