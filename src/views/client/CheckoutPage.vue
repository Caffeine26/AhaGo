<template>
  <div class="checkout-page">
    <!-- Show saved location from user profile if exists -->
    <div v-if="savedLocation" class="saved-location">
      <h3>Delivery Location</h3>
      <p>
        <strong>Address:</strong> {{ savedLocation.address }}
        <span v-if="savedLocation.addressLabel">({{ savedLocation.addressLabel }})</span>
      </p>
      <p>
        <strong>Name:</strong> {{ savedLocation.gender }} {{ savedLocation.customerName }}
      </p>
      <p><strong>Contact:</strong> {{ savedLocation.contact }}</p>
      <div v-if="savedLocation.photoUrl" class="photo-preview">
        <img :src="savedLocation.photoUrl" alt="Location photo" />
      </div>
    </div>

    <!-- Fallback store info if no saved location -->
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
          :class="{ selected: selectedPayment === method.value }"
        >
          <input
            type="radio"
            name="payment"
            :value="method.value"
            v-model="selectedPayment"
          />
          <div class="payment-main-row">
            <span class="payment-radio-custom"></span>
            <span class="payment-labels">
              <template v-if="method.value === 'card'">
                <img :src="method.icons[0]" class="pay-icon-img" alt="Mastercard" />
                <span class="main-label">{{ method.label }}</span>
                <span class="visa-text">VISA</span>
              </template>
              <template v-else>
                <img :src="method.icons[0]" class="pay-icon-img" alt="ABA PAY" />
                <span class="main-label aba-label">{{ method.label }}</span>
                <template v-if="selectedPayment === 'aba'">
                  <span v-if="method.desc" class="desc-label">{{ method.desc }}</span>
                </template>
              </template>
            </span>
          </div>
          <div v-if="selectedPayment === 'aba' && method.info" class="payment-info">{{ method.info }}</div>

          <!-- Card form appears only if selected -->
          <div v-if="selectedPayment === 'card' && method.value === 'card'" class="card-form-container">
            <input
              v-model="cardForm.number"
              class="card-input card-number"
              type="text"
              placeholder="Card number"
              maxlength="19"
            />
            <div class="card-row">
              <input
                v-model="cardForm.expiry"
                class="card-input card-expiry"
                type="text"
                placeholder="MM/YY"
                maxlength="5"
              />
              <div class="card-cvc-container">
                <input
                  v-model="cardForm.cvc"
                  class="card-input card-cvc"
                  type="text"
                  placeholder="CVC"
                  maxlength="4"
                />
              </div>
            </div>
            <input
              v-model="cardForm.name"
              class="card-input card-holder"
              type="text"
              placeholder="Name of the card holder"
            />
            <div class="card-save-row">
              <input
                type="checkbox"
                v-model="cardForm.save"
                id="save-card"
                class="card-save-checkbox"
              />
              <label for="save-card" class="card-save-label">
                Save this card for a faster checkout next time
              </label>
            </div>
            <div class="card-save-info">
              By saving your card you grant us your consent to store your payment method for future orders. You can withdraw consent at any time.<br />
              For more information, please visit the <a href="#" class="privacy-link">Privacy policy.</a>
            </div>
          </div>
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
import abapayImg from '@/assets/client/abapay.png';
import mastercardImg from '@/assets/client/mastercard.png';
import { useAuthStore } from "@/stores/authenticationStore";
import { useOrderStore } from "@/stores/orderStore";
import axios from "axios";
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
    const authStore = useAuthStore();
    const orderStore = useOrderStore();
const brandName = route.params.brandName;
const cartItems = JSON.parse(decodeURIComponent(route.params.cartItems));
    const remarks = ref("");

    const storeAddress = ref(
      "35c St 472, Phnom Penh, Cambodia 35c St 472, TTP2, Chamkar Mon"
    );
    const storeContact = ref("+855 12 345 678");

const cartTotal = computed(() => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
});


    const finalTotal = computed(() => cartTotal.value + 0.45);

    const selectedPayment = ref('aba');

    const cardForm = ref({
      number: '',
      expiry: '',
      cvc: '',
      name: '',
      save: true,
    });

    const paymentMethods = [
      {
        label: 'Credit or Debit Card',
        value: 'card',
        icons: [mastercardImg],
        desc: '',
        info: '',
      },
      {
        label: 'ABA PAY',
        value: 'aba',
        icons: [abapayImg],
        desc: 'Scan to pay with ABA Mobile',
        info: "Scan the QR with your ABA app. Please ensure you have the app on your device. You'll be redirected to the ahago after payment is complete.",
      },
    ];

    const savedLocation = ref(null);

    onMounted(async () => {
      // Fetch profile if not loaded
      if (!authStore.user) {
        await authStore.fetchProfile();
      }

      if (authStore.user) {
        savedLocation.value = {
          address: authStore.user.address || "",
          addressLabel: authStore.user.city || "",
          gender: authStore.user.gender || "",
          customerName: `${authStore.user.firstname || ""} ${authStore.user.lastname || ""}`.trim(),
          contact: authStore.user.phone || "",
          photoUrl: authStore.user.img_src || "",
        };
      }
    });

    const placeOrder = async () => {
  try {
    // Fetch available drivers
    const { data: driversData } = await axios.get("http://localhost:8300/api/drivers");
    const driverIds = Array.isArray(driversData) && driversData.length > 0
      ? driversData.map(driver => driver.id)
      : [];
    const assignedDriverId = driverIds.length > 0
      ? driverIds[Math.floor(Math.random() * driverIds.length)]
      : 1;

    // Get order type from route or default to 'delivery'
    const orderType = route.params.orderType || "delivery";

    // Build order payload
    const orderPayload = {
      restaurant_id: cartItems.length > 0 ? cartItems[0].restaurant_id : null,
      customer_id: authStore.user?.customer_id,
      driver_id: orderType === "delivery" ? assignedDriverId : null,
      status: "pending",
      total_amount: finalTotal.value,
      payment_status: selectedPayment.value === "card" ? "paid" : "unpaid",
      remark: remarks.value,
      order_type: orderType,
      items: cartItems.map(item => ({
        food_item_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    // Create order via API
    const { data: orderResponse } = await axios.post(
      "http://localhost:8300/api/orders",
      orderPayload
    );

    console.log("Order created successfully:", orderResponse);

    // Extract new order ID (adjust depending on response structure)
    const orderId = orderResponse.data?.id || orderResponse.id;

    if (!orderId) {
      throw new Error("Order ID not found in response");
    }

    // Navigate to TrackOrder page with orderId param
    router.push({ name: 'TrackOrder', params: { orderId } });

  } catch (err) {
    console.error("Failed to create order:", err.response?.data || err.message);
  }
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
      cardForm,
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
  border: 1make px solid #b91c1c;
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
  padding: 1rem 1rem 0.7rem 1rem;
  margin: 1.2rem 0 1rem 0;
  max-width: 600px;
}
.payment-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #222;
}
.payment-options {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.payment-option {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  border: 2px solid #bbb;
  padding: 1.2rem 1.2rem 1rem 1.2rem;
  margin-bottom: 0.5rem;
  position: relative;
  cursor: pointer;
  transition: border 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.payment-option.selected {
  border-color: #222;
  box-shadow: 0 4px 16px rgba(34,34,34,0.10);
  background: #fff;
}
.payment-main-row {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}
.payment-option input[type="radio"] {
  display: none;
}
.payment-radio-custom {
  width: 28px;
  height: 28px;
  border: 2.5px solid #bbb;
  border-radius: 50%;
  background: #fff;
  display: inline-block;
  position: relative;
  margin-right: 0.7rem;
}
.payment-option.selected .payment-radio-custom {
  border-color: #222;
}

.payment-option input[type="radio"]:checked ~ .payment-main-row .payment-radio-custom::after {
  content: '';
  display: block;
  width: 14px;
  height: 14px;
  background: #222;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  left: 5px;
}
.pay-icon-img {
  width: 44px;
  height: 28px;
  object-fit: contain;
  margin-right: 0.5rem;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
}
.visa-text {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1f71;
  margin-left: 0.2rem;
  letter-spacing: 0.5px;
  font-family: 'Inter', 'Quicksand', Arial, sans-serif;
  position: relative;
  top: -3px;
}
.payment-labels {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.7rem;
}
.main-label {
  font-size: 1rem;
  font-weight: 600;
  color: #222;
}
.aba-label {
  font-size: 1rem;
  font-weight: 600;
  color: #222;
  margin-right: 0.5rem;
}
.desc-label {
  font-size: 0.95rem;
  color: #444;
  font-weight: 400;
}
.payment-info {
  font-size: 0.95rem;
  color: #444;
  margin-top: 0.5rem;
  margin-left: 2.2rem;
  max-width: 90%;
}
.card-form-container {
  margin-top: 1rem;
  gap: 0.7rem;
}
.card-input {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Inter', 'Quicksand', Arial, sans-serif;
  margin-bottom: 0.1rem;
  outline: none;
  transition: border 0.2s;
  box-sizing: border-box;
}
.card-input:focus {
  border-color: #b91c1c;
}
.card-row {
  display: flex;
  gap: 0.7rem;
}
.card-expiry, .card-cvc {
  width: 50%;
  box-sizing: border-box;
}
.card-holder {
  width: 100%;
  box-sizing: border-box;
}
.card-cvc-container {
  position: relative;
  width: 100%;
}
.card-save-row {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  margin-top: 0.7rem;
}
.card-save-checkbox {
  width: 24px;
  height: 24px;
  accent-color: #222;
  border-radius: 6px;
}
.card-save-label {
  font-size: 1.25rem;
  color: #222;
  font-family: 'Inter', 'Quicksand', Arial, sans-serif;
}
.card-save-info {
  font-size: 1.1rem;
  color: #888;
  margin-top: 0.7rem;
  font-family: 'Inter', 'Quicksand', Arial, sans-serif;
}
</style>