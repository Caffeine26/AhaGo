<template>
    <div class="container">
      <div class="title">{{ title }}</div>
      <div class="nav">
        <div class="nav-item" :class="{ active: activeItem === it1 }" @click="setActive(it1)">
          {{ it1 }}
        </div>
        <div class="nav-item" :class="{ active: activeItem === it2 }" @click="setActive(it2)">
          {{ it2 }}
        </div>
        <div class="nav-item" :class="{ active: activeItem === it3 }" @click="setActive(it3)">
          {{ it3 }}
        </div>
        <div class="nav-item" :class="{ active: activeItem === it4 }" @click="setActive(it4)">
          {{ it4 }}
        </div>
        <div class="nav-item" :class="{ active: activeItem === it5 }" @click="setActive(it5)">
          {{ it5 }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Header2",
    data() {
      return {
        activeItem: null, // Track which item is clicked
      };
    },
    props: {
      title: { type: String, default: "" },
      it1: { type: String, default: "" },
      it2: { type: String, default: "" },
      it3: { type: String, default: "" },
      it4: { type: String, default: "" },
      it5: { type: String, default: "" },
    },
    methods: {
      setActive(item) {
        this.activeItem = item; // Set the clicked item as active
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
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
    border-bottom: 3px solid #bf0000; 
  }
  </style>
  