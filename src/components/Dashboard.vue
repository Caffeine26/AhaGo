<template>
    <div class="dashboard-container">
      <!-- Sidebar -->
      <div class="sidebar">
        <div class="logo">
          <img src="@/assets/Mymelody.jpg" alt="Logo" />
          <h2>Admin Panel</h2>
        </div>
        <ul class="nav-list">
          <li :class="{ active: currentSection === 'dashboard' }" @click="setSection('dashboard')">
            <div v-if="currentSection === 'dashboard'" class="active-indicator"></div>
            <i class="fas fa-tachometer-alt"></i> Dashboard
          </li>
          <li :class="{ active: currentSection === 'order' }" @click="setSection('order')">
            <div v-if="currentSection === 'order'" class="active-indicator"></div>
            <i class="fas fa-box"></i> Order
          </li>
          <li :class="{ active: currentSection === 'message' }" @click="setSection('message')">
            <div v-if="currentSection === 'message'" class="active-indicator"></div>
            <i class="fas fa-envelope"></i> Message
          </li>
          <li :class="{ active: currentSection === 'menu' }" @click="setSection('menu')">
            <div v-if="currentSection === 'menu'" class="active-indicator"></div>
            <i class="fas fa-utensils"></i> Menu
          </li>
          <li :class="{ active: currentSection === 'inventory' }" @click="setSection('inventory')">
            <div v-if="currentSection === 'inventory'" class="active-indicator"></div>
            <i class="fas fa-cogs"></i> Inventory
          </li>
          <li :class="{ active: currentSection === 'account' }" @click="setSection('account')">
            <div v-if="currentSection === 'account'" class="active-indicator"></div>
            <i class="fas fa-user-cog"></i> Account
          </li>
          <li :class="{ active: currentSection === 'review' }" @click="setSection('review')">
            <div v-if="currentSection === 'review'" class="active-indicator"></div>
            <i class="fas fa-star"></i> Review
          </li>
          <li :class="{ active: currentSection === 'marketing' }" @click="setSection('marketing')">
            <div v-if="currentSection === 'marketing'" class="active-indicator"></div>
            <i class="fas fa-bullhorn"></i> Marketing
          </li>
        </ul>
      </div>
  
      <!-- Main Content -->
      <div class="main-content">
        <h2>{{ sectionTitle }}</h2>
        <div v-if="currentSection === 'dashboard'">
          <p>Dashboard content goes here...</p>
        </div>
        <div v-if="currentSection === 'order'">
          <p>Order content goes here...</p>
        </div>
        <div v-if="currentSection === 'message'">
          <p>Message content goes here...</p>
        </div>
        <div v-if="currentSection === 'menu'">
          <p>Menu content goes here...</p>
        </div>
        <div v-if="currentSection === 'inventory'">
          <p>Inventory content goes here...</p>
        </div>
        <div v-if="currentSection === 'account'">
          <p>Account content goes here...</p>
        </div>
        <div v-if="currentSection === 'review'">
          <p>Review content goes here...</p>
        </div>
        <div v-if="currentSection === 'marketing'">
          <p>Marketing content goes here...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Dashboard",
    data() {
      return {
        currentSection: "dashboard", // default to dashboard
        sectionTitle: "Dashboard", // initial section title
      };
    },
    methods: {
      setSection(section) {
        this.currentSection = section;
        this.updateSectionTitle(section);
      },
      updateSectionTitle(section) {
        switch (section) {
          case "dashboard":
            this.sectionTitle = "Dashboard";
            break;
          case "order":
            this.sectionTitle = "Order Management";
            break;
          case "message":
            this.sectionTitle = "Messages";
            break;
          case "menu":
            this.sectionTitle = "Menu";
            break;
          case "inventory":
            this.sectionTitle = "Inventory";
            break;
          case "account":
            this.sectionTitle = "Account";
            break;
          case "review":
            this.sectionTitle = "Reviews";
            break;
          case "marketing":
            this.sectionTitle = "Marketing";
            break;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    margin-top: 50px;
  }
  
  .sidebar {
    width: 250px;
    height: 100vh;
    background-color: #333;
    color: white;
    padding-top: 20px;
  }
  
  .sidebar .logo {
    text-align: center;
    padding-bottom: 20px;
  }
  
  .sidebar .logo img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
  }
  
  .sidebar .logo h2 {
    font-size: 18px;
    margin-top: 10px;
  }
  
  .sidebar .nav-list {
    list-style: none;
    padding: 0;
  }
  
  .sidebar .nav-list li {
    padding: 15px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
  }
  
  .sidebar .nav-list li:hover {
    background-color: #444;
  }
  
  .sidebar .nav-list li.active {
    background-color: #1e88e5;
  }
  
  .sidebar .nav-list li .active-indicator {
    width: 3px;  /* Small vertical line */
    height: 20px; /* Adjust height for your preference */
    background-color: #1e88e5; /* Active color */
    margin-right: 10px; /* Space between the line and the text */
  }
  
  .main-content {
    flex: 1;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .main-content h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .sidebar i {
    margin-left: 10px;
  }
  </style>
  