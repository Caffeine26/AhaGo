<template>
  <div class="dashboard-wrapper">
    <Sidebar />
    <div class="main-wrapper">
      
      

      <div class="app-container">
        <div class="order-header">
          <div>
            <strong>Order ID</strong>
            <span class="order-id">#{{ order?.id }}</span>
            <span class="status online">● Online</span>
          </div>
          <span class="badge on-process">{{ order?.status }}</span>
        </div>

        <div class="content-columns">
          <div class="left-column">
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
                  <tr v-for="(item, index) in orderItems" :key="index">
                    <td>{{ item.name }}</td>
                    <td>{{ item.pivot.quantity }}</td>
                    <td>-</td>
                    <td>${{ Number(item.pivot.price).toFixed(2) }}</td>
                    <td>${{ (Number(item.pivot.price) * item.pivot.quantity).toFixed(2) }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="total">Total Amount: <strong>${{ totalAmount }}</strong></div>
            </div>

            <div class="card customer">
              <div class="profile-header">
                <img src="@/assets/food/cake.png" alt="Customer" class="avatar" />
              </div>
              <div class="customer-info">
                <h4>{{ order?.customer?.name || 'Unknown' }}</h4>
                <p><strong>Address:</strong> {{ order?.customer?.address || 'N/A' }}</p>
                <p><strong>Phone:</strong> {{ order?.customer?.phone || 'N/A' }}</p>
                <p><strong>Email:</strong> {{ order?.customer?.email || 'N/A' }}</p>
                <div class="action-buttons">
                  <button class="btn">Send Message</button>
                  <button class="btn call">Make a Call</button>
                </div>
              </div>
            </div>
          </div>

          <div class="right-column">
            <div id="map" class="map"></div>

            <div class="card tracking">
              <h3>Order Tracking</h3>
              <ul class="timeline">
                <li
                  v-for="(step, index) in trackingSteps"
                  :key="index"
                  :class="{
                    active: currentStep >= index,
                    'last-item': index === trackingSteps.length - 1,
                  }"
                >
                  <div class="timeline-connector" v-if="index !== trackingSteps.length - 1"></div>
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <span>{{ step.time }}<br />{{ step.date }}</span>
                    {{ step.status }}
                  </div>
                </li>
              </ul>
            </div>

            <div class="card delivery">
              <h4>Delivery</h4>
              <div class="profile-header">
                <img src="@/assets/food/cake.png" alt="Driver" class="avatar" />
              </div>
              <p><strong>{{ order?.driver?.name || 'Driver' }}</strong></p>
              <p><strong>Phone:</strong> {{ order?.driver?.phone || 'N/A' }}</p>
              <p><strong>Vehicle:</strong> {{ order?.driver?.vehicle_type || 'N/A' }}</p>
              <p><strong>Vehicle Number:</strong> {{ order?.driver?.license_plate || 'N/A' }}</p>
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
  name: 'OrderTrackingPage',
  components: { Sidebar },
  data() {
    return {
      order: null,
      orderItems: [],
      trackingSteps: [],
      currentStep: 0,
      driverPosition: { lat: 11.5564, lng: 104.9282 },
      map: null,
      marker: null,
      locationWatcherId: null,
    };
  },
  computed: {
    totalAmount() {
      return this.orderItems
        .reduce(
          (sum, item) =>
            sum + Number(item.pivot?.price || 0) * (item.pivot?.quantity || 1),
          0
        )
        .toFixed(2);
    },
  },
  async mounted() {
    const orderId = this.$route.params.orderId;
    console.log('Mounted with orderId:', orderId);

    if (orderId) {
      await this.fetchOrderDetails(orderId);
    } else {
      console.warn('No orderId found in route params');
    }

    await this.loadLeaflet();
    this.initLeafletMap();
    this.watchCurrentLocation();
    this.startTrackingSimulation();
  },
  beforeDestroy() {
    if (this.locationWatcherId !== null) {
      navigator.geolocation.clearWatch(this.locationWatcherId);
    }
    if (this.trackingInterval) clearInterval(this.trackingInterval);
    if (this.driverMovementInterval) clearInterval(this.driverMovementInterval);
  },
  methods: {
    async fetchOrderDetails(orderId) {
      try {
        const response = await fetch(`http://localhost:8300/api/orders`);
        const responseData = await response.json();
        const allOrders = responseData.data;
        const data = allOrders.find((order) => order.id === Number(orderId));

        if (!data) {
          console.warn(`Order with ID ${orderId} not found`);
          return;
        }

        this.order = {
          id: data.id,
          status: data.status,
          order_type: data.order_type,
          payment_status: data.payment_status,
          remark: data.remark,
          total_amount: data.total_amount,
          customer: {
            name: `${data.customer?.firstname || ''} ${data.customer?.lastname || ''}`.trim() || 'Unknown',
            address: data.customer?.city || 'N/A',
            phone: data.customer?.user?.phone_number || 'N/A',
            email: data.customer?.user?.email || 'N/A',
          },
          driver: {
            name: `${data.driver?.first_name || ''} ${data.driver?.last_name || ''}`.trim() || 'Driver',
            phone: data.driver?.phone_number || 'N/A',
            vehicle_type: data.driver?.vehicle_type || 'N/A',
            license_plate: data.driver?.license_plate || 'N/A',
          },
        };

        this.orderItems = data.food_items || [];

        this.trackingSteps = [
          { status: 'Order Placed', time: '10:00 AM', date: '2025-06-22' },
          { status: 'Order Confirmed', time: '10:05 AM', date: '2025-06-22' },
          { status: 'Driver Assigned', time: '10:15 AM', date: '2025-06-22' },
          { status: 'Out for Delivery', time: '10:30 AM', date: '2025-06-22' },
          { status: 'Delivered', time: '', date: '' },
        ];
        this.currentStep = 0;

        // Initialize driverPosition from restaurant location if available
        if (data.restaurant?.latitude && data.restaurant?.longitude) {
          this.driverPosition.lat = parseFloat(data.restaurant.latitude);
          this.driverPosition.lng = parseFloat(data.restaurant.longitude);

          if (this.marker) this.marker.setLatLng([this.driverPosition.lat, this.driverPosition.lng]);
          if (this.map) this.map.panTo([this.driverPosition.lat, this.driverPosition.lng]);
        }
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      }
    },

    async loadLeaflet() {
      if (!window.L) {
        // Load Leaflet CSS
        const leafletCSS = document.createElement('link');
        leafletCSS.rel = 'stylesheet';
        leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(leafletCSS);

        // Load Leaflet JS
        await new Promise((resolve) => {
          const leafletScript = document.createElement('script');
          leafletScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          leafletScript.async = true;
          leafletScript.onload = resolve;
          document.body.appendChild(leafletScript);
        });
      }
    },

    initLeafletMap() {
      this.map = L.map('map').setView([this.driverPosition.lat, this.driverPosition.lng], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);

      this.marker = L.marker([this.driverPosition.lat, this.driverPosition.lng])
        .addTo(this.map)
        .bindPopup('Current Location')
        .openPopup();
    },

    watchCurrentLocation() {
      if ('geolocation' in navigator) {
        this.locationWatcherId = navigator.geolocation.watchPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            this.driverPosition.lat = lat;
            this.driverPosition.lng = lng;

            if (this.marker) {
              this.marker.setLatLng([lat, lng]);
            }
            if (this.map) {
              this.map.panTo([lat, lng]);
            }
          },
          (error) => {
            console.error('Error watching position:', error);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 5000,
          }
        );
      } else {
        alert('Geolocation is not supported by your browser');
      }
    },

    startTrackingSimulation() {
      // Your original tracking simulation logic can stay if you want
      this.trackingInterval = setInterval(() => {
        if (this.currentStep < this.trackingSteps.length - 1) {
          this.currentStep++;
          // You can also simulate driver movement here if needed
        } else {
          clearInterval(this.trackingInterval);
        }
      }, 10000);
    },
  },
};
</script>

<style scoped>
/* Your existing styles unchanged */

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
  background: #4caf50;
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
   0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 165, 0, 0.7);
  }
  70% {
    transform: scale(1.15);
    box-shadow: 0 0 10px 10px rgba(255, 165, 0, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 165, 0, 0);
  }
}

.timeline-dot.active {
  animation: pulse 2s infinite;
}

/* Delivery card */
.delivery {
  padding: 2rem;
  text-align: center;
}

.delivery p {
  margin: 0.5rem 0;
  color: #333;
  font-weight: 500;
}

#map {
  width: 100%;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}
</style>
