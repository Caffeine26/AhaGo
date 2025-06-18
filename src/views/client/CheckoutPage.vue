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

      <OrderSummary category="Sweet Shrimp (TTP)" :items="cartItems" />

      <InfoList :info="promoRows" />

      <PriceDetails :cartTotal="cartTotal" :finalTotal="finalTotal" />

      <RemarksSection v-model="remarks" />

      <div class="payment-card">
        <div class="payment-title">Payment</div>
        <div class="payment-options">
          <label
            v-for="method in paymentMethods"
            :key="method.value"
            class="payment-option"
          >
            <input
              type="radio"
              name="payment"
              :value="method.value"
              v-model="selectedPayment"
            />
            <span class="payment-radio"></span>
            <span class="payment-label">
              <span class="payment-icons">
                <span
                  v-for="icon in method.icons"
                  :key="icon"
                  :class="icon"
                ></span>
              </span>
              <span v-if="method.value === 'aba'" class="aba-title">{{ method.label }}</span>
              <span v-else>{{ method.label }}</span>
              <span v-if="method.desc" class="aba-desc">{{ method.desc }}</span>
            </span>
            <div v-if="method.info" class="aba-info">{{ method.info }}</div>
          </label>
        </div>
      </div>

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

    const selectedPayment = ref('aba');

    // Dynamic payment methods array
    const paymentMethods = [
      {
        label: 'Credit or Debit Card',
        value: 'card',
        icons: ['icon-card', 'icon-mastercard', 'icon-visa'],
        desc: '',
        info: '',
      },
      {
        label: 'ABA PAY',
        value: 'aba',
        icons: ['icon-aba'],
        desc: 'Scan to pay with ABA Mobile',
        info: "Scan the QR with your ABA app. Please ensure you have the app on your device. You'll be redirected to the foodpanda after payment is complete.",
      },
    ];

    onMounted(() => {
      const saved = localStorage.getItem("savedLocation");
      if (saved) {
        savedLocation.value = JSON.parse(saved);
      }
    });

    const placeOrder = () => {
    const orderData = {
    pickupOption: {
      label: "Downstairs pick-up",
      time: "Instant (12:30)"
    },
    paymentMethod: {
      label: "Cash On Delivery",
      desc: "Pay with cash at pickup",
      icon: "", // Optional: add icon path if needed
      info: "Please prepare the exact amount."
    },
    voucher: "No available red envelopes" // Or any real value from promoRows
  };

  localStorage.setItem("orderData", JSON.stringify(orderData));

  router.push({ name: "OrderConfirmation" });
};

    const goToAddLocation = () => {
      router.push({ name: "AddLocation" });
    };

    const promoRows = [
      { label: "Red Envelope", value: "No available red envelopes" },
      { label: "Coupons", value: "Not Available" },
      {
        label: "0% Off Promotion",
        value: `-$${(cartTotal.value * 0).toFixed(2)}`,
        highlight: true,
      },
    ];

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
      promoRows,
      cover1,
      savedLocation,
      selectedPayment,
      paymentMethods,
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
.payment-card {
  background: #fafafa;
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  border: 1.5px solid #ededed;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  margin: 2rem 0 1.5rem 0;
  max-width: 600px;
}
.payment-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #222;
}
.payment-options {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.payment-option {
  display: flex;
  align-items: flex-start;
  background: #fff;
  border-radius: 12px;
  border: 2px solid #ddd;
  padding: 1.2rem 1rem;
  margin-bottom: 0.5rem;
  position: relative;
  cursor: pointer;
  transition: border 0.2s;
}
.payment-option input[type="radio"] {
  display: none;
}
.payment-radio {
  width: 24px;
  height: 24px;
  border: 2px solid #bbb;
  border-radius: 50%;
  margin-right: 1rem;
  background: #f3f3f3;
  position: relative;
}
.payment-option input[type="radio"]:checked + .payment-radio {
  border-color: #222;
  background: #fff;
}
.payment-option input[type="radio"]:checked + .payment-radio::after {
  content: '';
  display: block;
  width: 12px;
  height: 12px;
  background: #222;
  border-radius: 50%;
  position: absolute;
  top: 4px;
  left: 4px;
}
.payment-label {
  font-size: 1.4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.payment-icons {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-right: 0.5rem;
}
.icon-card, .icon-mastercard, .icon-visa, .icon-aba {
  width: 32px;
  height: 20px;
  background: #eee;
  border-radius: 4px;
  display: inline-block;
}
.icon-mastercard {
  background: linear-gradient(90deg, #ff5f00 50%, #eb001b 50%);
}
.icon-visa {
  background: #1a1f71;
}
.icon-aba {
  background: url('https://aba-bank.com/images/logo-aba-pay.png') no-repeat center/contain, #fff;
  border: 1px solid #ddd;
}
.aba-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-left: 0.5rem;
}
.aba-desc {
  font-size: 1.2rem;
  font-weight: 400;
  margin-left: 0.7rem;
  color: #444;
}
.aba-info {
  font-size: 1.1rem;
  color: #444;
  margin-top: 0.7rem;
  margin-left: 3.5rem;
  max-width: 90%;
}
</style>