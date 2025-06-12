<template>
  <div class="event-layout">
    <h1>📣 Upcoming Events</h1>
    <p>Stay ahead with your event planning strategy! 🗓️</p>

    <!-- Button -->
    <div class="event-actions">
      <button class="add-event-btn" @click="openAddEventForm">+ Add New Event</button>
    </div>

    <!-- Event List -->
    <div class="events-list">
      <div class="event-card" v-for="(event, index) in events" :key="index">
        <h3>{{ event.title }}</h3>
        <p><strong>Date:</strong> {{ event.date }}</p>
        <p>{{ event.description }}</p>
        <img v-if="event.image" :src="event.image" class="event-img" />

        <button class="edit-btn" @click="editEvent(index)">Edit</button>
        <button class="delete-btn" @click="deleteEvent(index)">Delete</button>
      </div>
    </div>

    <!-- Add/Edit Event Modal -->
    <div v-if="showEventForm" class="modal-overlay">
      <div class="modal-content">
        <h3>{{ isEditingEvent ? 'Edit Event' : 'Add New Event' }}</h3>
        <input v-model="newEvent.title" type="text" placeholder="Event Title" />
        <input v-model="newEvent.date" type="date" />
        <textarea v-model="newEvent.description" placeholder="Event Description"></textarea>
        <input type="file" @change="onImageUpload" />
        <div class="modal-actions">
          <button class="confirm-btn" @click="isEditingEvent ? updateEvent() : addEvent()">
            {{ isEditingEvent ? 'Update' : 'Add' }}
          </button>
          <button class="cancel-btn" @click="closeEventForm">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventPosts',
  data() {
    return {
      showEventForm: false,
      isEditingEvent: false,
      editingEventIndex: null,
      newEvent: {
        title: '',
        date: '',
        description: '',
        image: null
      },
      events: [
        {
          title: 'Product Launch: Summer Glow Serum',
          date: '2025-06-01',
          description: 'Kickoff campaign across social, email, and influencer channels.',
          image: null
        },
        {
          title: 'Skin Care Workshop Live',
          date: '2025-06-15',
          description: 'Live session with skincare experts to build trust and engagement.',
          image: null
        }
      ]
    };
  },
  methods: {
    openAddEventForm() {
      this.resetNewEvent();
      this.isEditingEvent = false;
      this.showEventForm = true;
    },
    addEvent() {
      if (this.newEvent.title && this.newEvent.date && this.newEvent.description) {
        this.events.push({ ...this.newEvent });
        this.closeEventForm();
      } else {
        alert("Please fill all fields before submitting.");
      }
    },
    editEvent(index) {
      this.editingEventIndex = index;
      this.newEvent = JSON.parse(JSON.stringify(this.events[index])); // Deep copy
      this.isEditingEvent = true;
      this.showEventForm = true;
    },
    updateEvent() {
      if (this.editingEventIndex !== null && this.newEvent.title && this.newEvent.date && this.newEvent.description) {
        this.events.splice(this.editingEventIndex, 1, { ...this.newEvent });
        this.closeEventForm();
      } else {
        alert("Please fill all fields before updating.");
      }
    },
    deleteEvent(index) {
      if (confirm("Are you sure you want to delete this event?")) {
        this.events.splice(index, 1);
      }
    },
    closeEventForm() {
      this.showEventForm = false;
      this.resetNewEvent();
      this.isEditingEvent = false;
      this.editingEventIndex = null;
    },
    resetNewEvent() {
      this.newEvent = {
        title: '',
        date: '',
        description: '',
        image: null
      };
    },
    onImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.newEvent.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
};
</script>

<style scoped>
/* ... (previous styles remain the same) ... */

/* Button Styles */
button {
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 0.5rem;
}

.add-event-btn, .confirm-btn, .edit-btn, .submit-note-btn {
  background-color: #10b981; /* Green */
  color: white;
}

.add-event-btn:hover, .confirm-btn:hover, .edit-btn:hover, .submit-note-btn:hover {
  background-color: #059669; /* Darker green */
}

.delete-btn, .cancel-btn {
  background-color: #ef4444; /* Red */
  color: white;
}

.delete-btn:hover, .cancel-btn:hover {
  background-color: #dc2626; /* Darker red */
}

/* ... (rest of the styles remain the same) ... */
</style>