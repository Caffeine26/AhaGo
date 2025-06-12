<template>
  <div class="card delivery">
    <h4>Delivery</h4>
    <p><strong>{{ name }}</strong></p>
    <p><strong>Phone:</strong> {{ phone }}</p>
    <p><strong>Vehicle:</strong> {{ vehicle }}</p>
    <p><strong>Vehicle Number:</strong> {{ vehicleNumber }}</p>
    <div class="action-buttons">
      <button class="btn">Call</button>
      <button class="btn">Message</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeliveryCard",
  props: {
    name: String,
    phone: String,
    vehicle: String,
    vehicleNumber: String
  }
};
</script>
