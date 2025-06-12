<template>
  <div class="dashboard-wrapper">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="main-wrapper">
      <!-- Top Bar: Header -->
      <header class="header">
        <h2 class="text-2xl font-bold">Dashboard</h2>
        <div class="header-right">
          <input type="text" placeholder="Search..." class="search-input" />
          <div class="user-info">
            <img src="@/assets/Kuromi.jpg" alt="user" class="user-img" />
            <span>Sarawat Jae</span>
          </div>
        </div>
      </header>

      <div class="app-container">
        <!-- Order Header -->
        <div class="order-header">
          <div>
            <strong>Order ID</strong> <span class="order-id">#ORD1025</span>
            <span class="status online">● Online</span>
          </div>
          <span class="badge on-process">On Process</span>
        </div>

        <!-- Main Content Section -->
        <div class="content-columns">
          <!-- Left Column -->
          <div class="left-column">
            <!-- Order List -->
            <div class="order-list card">
              <h3>Order List</h3>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Notes</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="i in 3" :key="i">
                    <td>Salmon smoke</td>
                    <td>1</td>
                    <td>Extra sauce</td>
                    <td>$12.00</td>
                    <td>$12.00</td>
                  </tr>
                </tbody>
              </table>
              <div class="total">Total Amount: <strong>$36.00</strong></div>
            </div>

            <!-- Customer Info -->
            <div class="card customer">
              <div class="profile-header">
                <img src="@/assets/food/cake.png" alt="Customer" class="avatar" />
              </div>
              <div class="customer-info">
                <h4>Sonit Sor</h4>
                <p><strong>Address:</strong> K4B, St 23 obek Kom...</p>
                <p><strong>Phone:</strong> 098742389</p>
                <p><strong>Email:</strong> soronit06@gmail.com</p>
                <div class="action-buttons">
                  <button class="btn">Send Message</button>
                  <button class="btn call">Make a Call</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="right-column">
            <!-- Real-Time Map -->
            <div id="map" class="map"></div>

            <!-- Order Tracking -->
            <div class="card tracking">
              <h3>Order Tracking</h3>
              <ul class="timeline">
                <li v-for="(step, index) in trackingSteps" 
                    :key="index" 
                    :class="{active: currentStep >= index, 'last-item': index === trackingSteps.length - 1}">
                  <div class="timeline-connector" v-if="index !== trackingSteps.length - 1"></div>
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <span>{{ step.time }}<br />{{ step.date }}</span>
                    {{ step.status }}
                  </div>
                </li>
              </ul>
            </div>

            <!-- Delivery Info -->
            <div class="card delivery">
              <h4>Delivery</h4>
              <div class="profile-header">
                <img src="@/assets/food/cake.png" alt="Driver" class="avatar" />
              </div>
              <p><strong>Sarawat Jess</strong></p>
              <p><strong>Phone:</strong> 098765434</p>
              <p><strong>Vehicle:</strong> Motorcycle</p>
              <p><strong>Vehicle Number:</strong> MM12389</p>
              <div class="action-buttons">
                <button class="btn">Call</button>
                <button class="btn">Message</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/admin/Sidebar.vue';
export default {
  components: {
    Sidebar
  },
  name: "OrderTrackingPage",
  data() {
    return {
      map: null,
      marker: null,
      driverPosition: { lat: 11.5564, lng: 104.9282 },
      currentStep: 0,
      trackingSteps: [
        { status: "Order Placed", date: "Oct 12 2024", time: "10:06 AM" },
        { status: "Order Confirmed", date: "Oct 12 2024", time: "10:20 AM" },
        { status: "Preparing Food", date: "Oct 12 2024", time: "10:30 AM" },
        { status: "Out for Delivery", date: "Oct 12 2024", time: "11:00 AM" },
        { status: "Delivered", date: "Oct 12 2024", time: "11:30 AM" }
      ],
      trackingInterval: null,
      driverMovementInterval: null
    };
  },
  mounted() {
    this.loadGoogleMaps();
    this.startTrackingSimulation();
  },
  beforeDestroy() {
    clearInterval(this.trackingInterval);
    clearInterval(this.driverMovementInterval);
  },
  methods: {
    loadGoogleMaps() {
      if (typeof google === "undefined") {
        const script = document.createElement("script");
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyC0VVNQgbQMrubye9JTzDfEvKjC69opu9I&callback=initMap";
        script.async = true;
        script.defer = true;
        window.initMap = this.initMap;
        document.head.appendChild(script);
      } else {
        this.initMap();
      }
    },
    initMap() {
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: this.driverPosition,
        zoom: 15,
      });

      this.marker = new google.maps.Marker({
        position: this.driverPosition,
        map: this.map,
        title: "Driver Location",
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        }
      });
    },
    startTrackingSimulation() {
      this.trackingInterval = setInterval(() => {
        if (this.currentStep < this.trackingSteps.length - 1) {
          this.currentStep++;
          if (this.currentStep === 3) {
            this.simulateDriverMovement();
          }
        } else {
          clearInterval(this.trackingInterval);
        }
      }, 10000);
    },
    simulateDriverMovement() {
      const destination = { lat: 11.5580, lng: 104.9300 };
      this.driverMovementInterval = setInterval(() => {
        this.driverPosition.lat += (destination.lat - this.driverPosition.lat) * 0.02;
        this.driverPosition.lng += (destination.lng - this.driverPosition.lng) * 0.02;
        this.marker.setPosition(this.driverPosition);
        this.map.panTo(this.driverPosition);
        if (Math.abs(this.driverPosition.lat - destination.lat) < 0.0001 &&
            Math.abs(this.driverPosition.lng - destination.lng) < 0.0001) {
          clearInterval(this.driverMovementInterval);
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
.dashboard-wrapper {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
.sidebar {
  width: 15%;
  background-color: #1f2937;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.main-wrapper {
  flex: 1;
  background-color: #f9fafb;
  overflow-y: auto;
  padding: 24px;
}

/* Header styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
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
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-img {
  width: 32px;
  height: 32px;
  border-radius: 9999px;
}

.app-container {
  font-family: Arial, sans-serif;
  background: #b61313;
  padding: 1rem;
  display: flex;
  
  flex-direction: column;
  gap: 1rem;
}

.order-header {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  align-items: center;
  font-size: 1.1rem;
}

.order-id {
  color: orange;
}

.status.online {
  color: green;
  margin-left: 0.5rem;
  font-weight: bold;
}

.badge.on-process {
  background: #ffcc00;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
}

.content-columns {
  display: flex;
  gap: 1.5rem;
  flex-grow: 1;
}

.left-column {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.right-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
  width: 90%;
}

.order-list {
  padding: 1.5rem;
}

.order-list h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #333;
}

.order-list table {
  width: 100%;
  border-collapse: collapse;
}

.order-list th {
  text-align: left;
  padding: 0.7rem 0.5rem;
  border-bottom: 2px solid #eee;
  font-size: 0.9rem;
  color: #666;
}

.order-list td {
  text-align: left;
  padding: 0.7rem 0.5rem;
  border-bottom: 1px solid #eee;
  font-size: 0.9rem;
}

.total {
  text-align: right;
  margin-top: 1rem;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.customer {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.profile-header {
  margin-bottom: 1.5rem;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #ffcc00;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.customer-info {
  width: 100%;
}

.customer-info h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
  color: #333;
}

.customer-info p {
  margin: 0.5rem 0;
  font-size: 0.95rem;
  color: #555;
}

.action-buttons {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 0.8rem;
}

.btn {
  background: #2196f3;
  color: #fff;
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.btn:hover {
  background-color: #1976d2;
  transform: translateY(-1px);
}

.btn.call {
  background: #4caf50;
}

.btn.call:hover {
  background-color: #388e3c;
}

.tracking {
  padding: 1.5rem;
}

.tracking h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #333;
}

.tracking ul.timeline {
  list-style: none;
  padding-left: 0;
  margin: 0;
  position: relative;
}

.tracking ul.timeline li {
  position: relative;
  padding-left: 2rem;
  margin-bottom: 1.8rem;
  min-height: 50px;
}

.tracking ul.timeline li:last-child {
  margin-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: 0;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ccc;
  border: 3px solid #fff;
  box-sizing: border-box;
  z-index: 2;
}

.timeline-connector {
  position: absolute;
  left: 7px;
  top: 16px;
  height: calc(100% + 1.8rem);
  width: 2px;
  background: #ddd;
  z-index: 1;
}

.tracking ul.timeline li.active .timeline-dot {
  background: orange;
  box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.2);
}

.tracking ul.timeline li.active .timeline-connector {
  background: orange;
}

.tracking ul.timeline li.last-item.active .timeline-dot {
  background: #4CAF50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
}

.timeline-content {
  font-size: 0.95rem;
  color: #aaa;
  transition: all 0.3s ease;
}

.tracking ul.timeline li.active .timeline-content {
  color: #333;
  font-weight: 500;
}

.tracking ul.timeline li .timeline-content span {
  display: block;
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.3rem;
}

/* Animation for current status */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.tracking ul.timeline li.active:not(.last-item) .timeline-dot {
  animation: pulse 2s infinite;
}

.map {
  height: 520px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.delivery {
  padding: 1.5rem;
  text-align: center;
}

.delivery h4 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.15rem;
  color: #333;
}

.delivery p {
  margin: 0.5rem 0;
  font-size: 0.95rem;
  color: #555;
}

.delivery .action-buttons {
  margin-top: 1.5rem;
}

@media (max-width: 900px) {
  .content-columns {
    flex-direction: column;
  }
  
  .tracking ul.timeline li {
    padding-left: 1.8rem;
    margin-bottom: 1.5rem;
  }
  
  .timeline-dot {
    width: 14px;
    height: 14px;
  }
  
  .timeline-connector {
    left: 6px;
  }

  .action-buttons {
    flex-direction: row;
  }
  
  .btn {
    width: auto;
    margin-bottom: 0;
  }
}
</style>