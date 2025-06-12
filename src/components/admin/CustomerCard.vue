<template>
  <div class="card customer">
    <img :src="image" alt="Customer" class="avatar" />
    <div class="customer-info">
      <h4>{{ name }}</h4>
      <p><strong>Address:</strong> {{ address }}</p>
      <p><strong>Phone:</strong> {{ phone }}</p>
      <p><strong>Email:</strong> {{ email }}</p>
      <div class="action-buttons">
        <button class="btn">Send Message</button>
        <button class="btn call">Make a Call</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerCard",
  props: {
    image: String,
    name: String,
    address: String,
    phone: String,
    email: String
  }
};
</script>
