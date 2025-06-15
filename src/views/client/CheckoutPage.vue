<template>
  <div class="page-container">
    <div class="checkout-page">
      <!-- Show saved location if exists -->
      <div v-if="savedLocation" class="saved-location">
        <h3>Delivery Location</h3>
        <p>
          <strong>Address:</strong> {{ savedLocation.address }} ({{
            savedLocation.addressLabel
          }})
        </p>
        <p>
          <strong>Delivery Service:</strong> {{ savedLocation.deliveryService }}
        </p>
        <p>
          <strong>Name:</strong> {{ savedLocation.gender }}
          {{ savedLocation.customerName }}
        </p>
        <p><strong>Contact:</strong> {{ savedLocation.contact }}</p>
        <p><strong>Telegram:</strong> {{ savedLocation.telegram }}</p>
        <div v-if="savedLocation.photoUrl" class="photo-preview">
          <img :src="savedLocation.photoUrl" alt="Location photo" />
        </div>
        <hr />
      </div>

      <!-- Fallback to store info if no saved location -->
      <Location
        v-else
        :cover="cover1"
        :address="storeAddress"
        :contact="storeContact"
      />

      <GeneralButton
        title="+ Add Location"
        @click="goToAddLocation"
        btnColor="#b91c1c"
        titleColor="#fff"
        class="add-location-btn"
      />

      <hr />

      <InfoList :info="deliveryInfo" />

      <hr />

      <OrderSummary category="Sweet Shrimp (TTP)" :items="cartItems" />

      <hr />

      <InfoList :info="promoRows" />

      <hr />

      <PriceDetails :cartTotal="cartTotal" :finalTotal="finalTotal" />

      <RemarksSection v-model="remarks" />

      <div class="action-buttons">
        <GeneralButton
          title="ORDER NOW"
          btnColor="#b91c1c"
          titleColor="white"
          btnClass="order-btn"
          @click="placeOrder"
        />
      </div>
    </div>
  </div>
</template>

<script>
import InfoList from "@/components/customer/InfoList.vue";
import OrderSummary from "@/components/customer/OrderSummary.vue";
import PriceDetails from "@/components/customer/PriceDetail.vue";
import RemarksSection from "@/components/customer/RemarkInput.vue";
import GeneralButton from "@/components/GeneralButton.vue";
import Location from "@/components/customer/Location.vue";
import { useRoute, useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import cover1 from "@/assets/store_details/house.png";

export default {
  name: "CheckoutPage",
  components: {
    Location,
    InfoList,
    OrderSummary,
    PriceDetails,
    RemarksSection,
    GeneralButton,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const brandName = route.params.brandName;
    const cartItems = ref(JSON.parse(route.params.cartItems || "[]"));
    const remarks = ref("");

    const storeAddress = ref(
      "35c St 472, Phnom Penh, Cambodia 35c St 472, TTP2, Chamkar Mon"
    );
    const storeContact = ref("+855 12 345 678");

    const cartTotal = computed(() => {
      return cartItems.value.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    });

    const finalTotal = computed(() => cartTotal.value + 0.45);

    const savedLocation = ref(null);

    onMounted(() => {
      const saved = localStorage.getItem("savedLocation");
      if (saved) {
        savedLocation.value = JSON.parse(saved);
      }
    });

    const placeOrder = () => {
      console.log("Order placed:", {
        items: cartItems.value,
        total: finalTotal.value,
        remarks: remarks.value,
        deliveryLocation: savedLocation.value || null,
      });
      alert("Order placed! Check console for details.");

      // Optionally clear saved location on order placed
      // localStorage.removeItem('savedLocation')
    };

    const deliveryInfo = [
      { label: "Delivery Time", value: "Instant (12:30)", highlight: true },
      { label: "Delivery Service", value: "Downstairs pick-up", chevron: true },
      { label: "Payment Method", value: "Cash On Delivery" },
    ];

    const promoRows = [
      { label: "Red Envelope", value: "No available red envelopes" },
      { label: "Coupons", value: "Not Available" },
      {
        label: "0% Off Promotion",
        value: `-$${(cartTotal.value * 0).toFixed(2)}`,
        highlight: true,
      },
    ];

    const goToAddLocation = () => {
      router.push({ name: "AddLocation" });
    };

    return {
      brandName,
      cartItems,
      remarks,
      storeAddress,
      storeContact,
      cartTotal,
      finalTotal,
      placeOrder,
      goToAddLocation,
      deliveryInfo,
      promoRows,
      cover1,
      savedLocation,
    };
  },
};
</script>

<style scoped>
.checkout-page {
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;
  min-height: 100vh;
}
.action-buttons {
  display: flex;
  justify-content: center;
}
.pay-btn {
  background: white;
  border: 1px solid #b91c1c;
  color: #b91c1c;
}
.order-btn {
  background: #b91c1c;
  border: none;
  color: white;
}
.pay-btn:hover {
  background: #f3f3f3;
}
.order-btn:hover {
  background: #991818;
}
.add-location-btn {
  margin-bottom: 1rem;
}
.saved-location {
  background: #fef3f3;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  border: 1px solid #f4c2c2;
}
.saved-location h3 {
  color: #b91c1c;
  margin-bottom: 0.5rem;
}
.saved-location p {
  margin: 0.2rem 0;
}
.photo-preview img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-top: 0.5rem;
}
@media (max-width: 600px) {
  .checkout-page {
    padding: 0.5rem;
  }
}
</style>
