<template>
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
</template>

<script>
export default {
  name: "OrderList"
};
</script>
