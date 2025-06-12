<template>
  <div class="recent-orders">
    <h3>Recent Orders</h3>
    <div class="background">
    <table class="table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Photo</th>
          <th>Menu</th>
          <th>Quantity</th>
          <th>Customer</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>
            <img :src="order.photo" alt="Menu" class="order-img" />
          </td>
          <td>{{ order.menu }}</td>
          <td>{{ order.quantity }}</td>
          <td>{{ order.customer }}</td>
          <td>
            <span :class="['status', order.status.toLowerCase()]">{{ order.status }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
export default {
  name: 'RecentOrders',
  props: {
    orders: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.background{
  background-color: white;
}
.recent-orders {
  background: rgb(242, 239, 239);
  padding: 20px;
  border-radius: 10px;
}
.recent-orders h3 {
  margin-bottom: 15px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  text-align: left;
  background: #ed3232;
  padding: 10px;
}
thead th:first-child {
  border-top-left-radius: 8px;
}

thead th:last-child {
  border-top-right-radius: 8px;
}
td {
  padding:10px;
  padding-right: 100px;
  border-top: 1px solid #eee;
  
}
.order-img {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  object-fit: cover;
}

/* Status styles */
.status {
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 0.875rem;
  display: inline-block;
}
.status.pending {
  background-color: #fff3cd;
  color: #856404;
}
.status.completed {
  background-color: #d4edda;
  color: #155724;
}
.status.cancelled {
  background-color: #f8d7da;
  color: #721c24;
}

tbody tr:hover {
  background-color: #f9f9f9;
}
</style>
