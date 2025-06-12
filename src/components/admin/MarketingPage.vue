<template>
  <div class="marketing-page">
    <!-- Create New Promotion Banner Section -->
    <section class="promo-event">
      <h2>Create New Promotion Event</h2>

      <!-- Input Form -->
      <div class="form-section">
        <input type="text" v-model="newEvent.title" placeholder="Enter title" />
        <textarea v-model="newEvent.description" placeholder="Enter description"></textarea>
        <input type="file" @change="onImageChange" />
        <button class="add-event-btn" @click="addEvent">Add New Event</button>
      </div>

      <!-- Live Preview Banner -->
      <div class="preview-banner" v-if="newEvent.imageUrl">
        <img :src="newEvent.imageUrl" alt="Preview Banner" />
        <div class="overlay-text">
          <h1>{{ newEvent.title }}</h1>
          <p>{{ newEvent.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'MarketingPage',
  data() {
    return {
      newEvent: {
        title: '',
        description: '',
        imageUrl: null,
      }
    };
  },
  methods: {
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.newEvent.imageUrl = URL.createObjectURL(file);
      }
    },
    addEvent() {
      if (!this.newEvent.title || !this.newEvent.description || !this.newEvent.imageUrl) {
        alert("Please fill in all fields and select an image.");
        return;
      }

      // You can push to an array or send to API here
      alert("Event added successfully!");
      console.log("New Event:", this.newEvent);
      
      // Reset form
      this.newEvent = {
        title: '',
        description: '',
        imageUrl: null
      };
    }
  }
};
</script>

<style scoped>
.marketing-page {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.promo-event {
  margin-bottom: 30px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.form-section input[type="text"],
.form-section textarea {
  padding: 10px;
  font-size: 1em;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.form-section textarea {
  resize: vertical;
  min-height: 80px;
}

.add-event-btn {
  align-self: flex-start;
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-event-btn:hover {
  background-color: #218838;
}

.preview-banner {
  position: relative;
  width: 100%;
  max-height: 300px;
  overflow: hidden;
  border-radius: 8px;
  margin-top: 10px;
  border: 2px solid #ccc;
}

.preview-banner img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.overlay-text {
  position: absolute;
  top: 20px;
  left: 30px;
  color: white;
  text-shadow: 2px 2px 5px rgba(0,0,0,0.7);
}

.overlay-text h1 {
  font-size: 2em;
  margin: 0 0 10px 0;
}

.overlay-text p {
  font-size: 1.2em;
  margin: 0;
}
</style>
