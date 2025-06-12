<template>
  <div class="contact-container">
    <!-- Contact Form Section -->
    <div class="form-section">
      <h2>Contact Us</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <InputText
            v-model="form.name"
            id="name"
            type="text"
            label="Name"
            placeholder="Your full name"
            required
          />
        </div>

        <div class="form-group">
          <InputText
            v-model="form.email"
            id="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div class="form-group">
          <InputText
            v-model="form.subject"
            id="subject"
            type="text"
            label="Subject"
            placeholder="What's your message about?"
            required
          />
        </div>

        <div class="form-group">
          <TextareaInput
            v-model="form.message"
            id="message"
            :rows="6"
            label="Message"
            placeholder="Write your message here..."
            required
          />
        </div>

        <GeneralButton
          class="button"
          :disabled="isSubmitting"
          title="Submit"
          btnColor="#9a0404"
          titleColor="#ffffff"
          type="submit"
        />
      </form>
    </div>

    <!-- Contact Info Section -->
    <div class="info-section">
      <h3>Get in Touch</h3>
      <p><strong>Email:</strong> support@example.com</p>
      <p><strong>Phone:</strong> +1 (555) 123-4567</p>
      <p><strong>Address:</strong> 123 Main St, YourCity, Country</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import InputText from "@/components/all/inputText.vue";
import TextareaInput from "@/components/delivery/TextAreaInput.vue";
import GeneralButton from "@/components/GeneralButton.vue";

const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const isSubmitting = ref(false);

async function submitForm() {
  isSubmitting.value = true;
  try {
    console.log("Form submitted:", form);
    alert("Message sent successfully!");
    form.name = "";
    form.email = "";
    form.subject = "";
    form.message = "";
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.contact-container {
  gap: 30px;
  display: flex;
  max-width: 1000px;
  margin: 40px auto;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-section {
  flex: 2;
  padding: 40px;
  background: #f9f9f9;
}

.info-section {
  flex: 1;
  background-color: #9a0404;
  color: white;
  padding: 40px;
}

h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}

.button {
  cursor: pointer;
  padding: 10px;
}

@media (max-width: 768px) {
  .contact-container {
    flex-direction: column;
  }

  .form-section,
  .info-section {
    padding: 20px;
  }
}
</style>
