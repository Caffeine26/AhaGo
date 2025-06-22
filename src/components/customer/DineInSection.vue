<template>
  <div class="reservation-form">
    <h2>Make a reservation</h2>
    <div class="form-grid">
      <div class="form-group">
        <label>Number of People</label>
        <select v-model="form.people" class="form-input">
          <option v-for="n in peopleOptions" :key="n" :value="n">{{ n }} people</option>
        </select>
      </div>
      <div class="form-group">
        <label>Date</label>
        <input type="date" v-model="form.date" class="form-input" :min="minDate" />
      </div>
      <div class="form-group">
        <label>Time</label>
        <select v-model="form.time" class="form-input">
          <option v-for="time in timeOptions" :key="time" :value="time">
            {{ time }}
          </option>
        </select>
      </div>
    </div>
    <button class="reserve-btn" :disabled="loading" @click="submit">
      <span v-if="loading">Submitting...</span>
      <span v-else>Make Reservation</span>
    </button>
    <div v-if="error" class="error-msg">{{ error }}</div>
    <div v-if="success" class="success-msg">Reservation sent!</div>
  </div>
</template>

<script>
export default {
  name: 'DineInSection',
  props: {
    peopleOptions: {
      type: Array,
      default: () => [1,2,3,4,5,6,7,8,9,10]
    },
    timeOptions: {
      type: Array,
      default: () => [
        '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
        '2:00 PM', '2:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
        '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
      ]
    }
  },
  data() {
    return {
      form: {
        people: 2,
        date: '',
        time: '12:00 PM'
      },
      minDate: new Date().toISOString().split('T')[0],
      loading: false,
      error: '',
      success: false
    }
  },
  methods: {
    async submit() {
      this.error = '';
      this.success = false;
      this.loading = true;
      try {
        // Emit the form data to parent for backend connection
         this.$emit('make-reservation', { ...this.form });
        this.success = true;
      } catch (e) {
        this.error = e?.message || 'Failed to submit reservation.';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.form-group label {
  font-weight: 500;
  color: #333;
}
.form-input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}
.form-input:focus {
  border-color: #b91c1c;
}
.reserve-btn {
  background: #b91c1c;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  margin-top: 1.5rem;
  transition: background-color 0.2s;
}
.reserve-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.error-msg {
  color: #b91c1c;
  margin-top: 1rem;
  text-align: center;
}
.success-msg {
  color: #059669;
  margin-top: 1rem;
  text-align: center;
}
</style>
