<template>
  <div class="todo-layout">
    <div v-if="submittedNotes.length" class="submitted-notes">
      <h3>📌 Submitted Strategy Notes</h3>
      <ul>
        <li v-for="(note, i) in submittedNotes" :key="i">
          <div v-if="editingNoteIndex === i">
            <textarea v-model="editingNote" rows="2"></textarea>
            <button class="confirm-btn" @click="updateNote(i)">Save</button>
            <button class="cancel-btn" @click="cancelNoteEdit">Cancel</button>
          </div>
          <div v-else>
            {{ note }}
            <button class="edit-btn" @click="editNote(i)">Edit</button>
            <button class="delete-btn" @click="deleteNote(i)">Delete</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Strategy Notes -->
    <div class="strategy-section">
      <h2>📝 Marketing Strategy Notes</h2>
      <textarea v-model="notes" placeholder="Write your strategy notes here..."></textarea>
      <button class="submit-note-btn" @click="submitNote">Submit Note</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoNotes',
  data() {
    return {
      notes: '',
      submittedNotes: [],
      editingNoteIndex: null,
      editingNote: ''
    };
  },
  methods: {
    submitNote() {
      if (this.notes.trim()) {
        this.submittedNotes.push(this.notes.trim());
        this.notes = '';
      }
    },
    editNote(index) {
      this.editingNoteIndex = index;
      this.editingNote = this.submittedNotes[index];
    },
    updateNote(index) {
      if (this.editingNote.trim()) {
        this.submittedNotes[index] = this.editingNote.trim();
        this.cancelNoteEdit();
      }
    },
    cancelNoteEdit() {
      this.editingNoteIndex = null;
      this.editingNote = '';
    },
    deleteNote(index) {
      if (confirm("Are you sure you want to delete this note?")) {
        this.submittedNotes.splice(index, 1);
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

.submit-note-btn, .confirm-btn, .edit-btn {
  background-color: #10b981; /* Green */
  color: white;
}

.submit-note-btn:hover, .confirm-btn:hover, .edit-btn:hover {
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