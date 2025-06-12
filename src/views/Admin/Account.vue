<template>
  <div class="dashboard-wrapper">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="main-content">
      <!-- Top Bar: Header -->
      <header class="header">
        <h2 class="text-2xl font-bold">Dashboard</h2>
        <div class="header-right">
          <input type="text" placeholder="Search..." class="search-input" />
          <div class="user-info">
            <img src="@/assets/Kuromi.jpg" alt="user" class="user-img" />
            <span>Sarawat Jae</span>
          </div>
        </div>
      </header>

      <div class="admin-panel">
        <!-- Top Sections Side by Side -->
        <div class="top-section">
          <!-- Profile Section -->
          <div class="profile-section" v-if="selectedAdmin">
            <h2>Admin Profile</h2>
            <div class="profile-card">
              <img
                :src="selectedAdmin.profileImage || 'path/to/default/image.jpg'"
                alt="Profile Picture"
                class="profile-picture"
              />
              <h3 class="admin-name">{{ selectedAdmin.firstName }} {{ selectedAdmin.lastName }}</h3>
              <p class="admin-since"><strong>Admin since:</strong> {{ selectedAdmin.adminSince }}</p>

              <div class="profile-info">
                <p><strong>Email:</strong> {{ selectedAdmin.email }}</p>
                <p><strong>Address:</strong> {{ selectedAdmin.address }}</p>
                <p><strong>City:</strong> {{ selectedAdmin.city }}</p>
                <p><strong>Phone:</strong> {{ selectedAdmin.phone }}</p>
              </div>
            </div>
          </div>

          <!-- Register Form -->
          <div class="form-section">
            <h2>{{ isEditing ? 'Edit Admin' : 'Register New Admin' }}</h2>
            <form @submit.prevent="isEditing ? updateAdmin() : registerAdmin()">
              <div class="form-group" v-for="field in fields" :key="field.id">
                <label :for="field.id">{{ field.label }}</label>
                <input
                  :type="field.type"
                  :id="field.id"
                  v-model="formData[field.model]"
                  :placeholder="field.placeholder"
                />
              </div>
              <input type="file" @change="onFileChange" />
              <button type="submit" class="register-button">
                {{ isEditing ? 'Update' : 'Register' }}
              </button>
            </form>
          </div>
        </div>

        <!-- Admin List Below -->
        <div class="list-section">
          <h2>All Registered Admins</h2>
          <table v-if="admins.length">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(admin, index) in admins"
                :key="index"
                @click="selectAdmin(index)"
                style="cursor: pointer;"
              >
                <td>{{ admin.firstName }} {{ admin.lastName }}</td>
                <td>{{ admin.email }}</td>
                <td>{{ admin.city }}</td>
                <td>{{ admin.phone }}</td>
                <td>
                  <button @click.stop="editAdmin(index)">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else>No admins registered yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/admin/Sidebar.vue';

export default {
  name: 'AdminPanel',
  components: {
    Sidebar,
  },
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        phone: '',
        profileImage: '',
      },
      fields: [
        { id: 'firstName', label: 'First Name', model: 'firstName', type: 'text', placeholder: 'Enter first name' },
        { id: 'lastName', label: 'Last Name', model: 'lastName', type: 'text', placeholder: 'Enter last name' },
        { id: 'email', label: 'Email', model: 'email', type: 'email', placeholder: 'Enter email' },
        { id: 'address', label: 'Address', model: 'address', type: 'text', placeholder: 'Enter address' },
        { id: 'city', label: 'City', model: 'city', type: 'text', placeholder: 'Enter city' },
        { id: 'phone', label: 'Phone', model: 'phone', type: 'tel', placeholder: 'Enter phone number' },
      ],
      admins: [],
      selectedAdmin: null,
      isEditing: false,
      editingIndex: null,
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.formData.profileImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    registerAdmin() {
      const newAdmin = {
        ...this.formData,
        profileImage: this.formData.profileImage || 'path/to/default/image.jpg',
        adminSince: new Date().toLocaleDateString(),
      };
      this.admins.push(newAdmin);
      this.selectAdmin(this.admins.length - 1);
      alert('Admin registered successfully!');
      this.resetForm();
    },
    editAdmin(index) {
      this.formData = { ...this.admins[index] };
      this.isEditing = true;
      this.editingIndex = index;
    },
    updateAdmin() {
      const updatedAdmin = {
        ...this.formData,
        adminSince: this.admins[this.editingIndex].adminSince,
      };
      this.admins.splice(this.editingIndex, 1, updatedAdmin);
      this.selectAdmin(this.editingIndex);
      alert('Admin updated successfully!');
      this.resetForm();
      this.isEditing = false;
      this.editingIndex = null;
    },
    resetForm() {
      this.formData = {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        phone: '',
        profileImage: '',
      };
    },
    selectAdmin(index) {
      this.selectedAdmin = this.admins[index];
    },
  },
};
</script>

<style scoped>
.dashboard-wrapper {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 15%;
  background-color: #1f2937;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.main-content {
  flex: 1;
  background-color: #f9fafb;
  overflow-y: auto;
  padding: 24px;
}

/* Header styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-input {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-img {
  width: 32px;
  height: 32px;
  border-radius: 9999px;
}
.admin-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
  background: #f9f9f9;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.top-section {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.profile-section,
.form-section {
  flex: 1;
  min-width: 300px;
  background: #ffffff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.profile-section {
  background: rgb(207, 185, 145);
  height: 600px;
}

.profile-section h2,
.form-section h2 {
  font-size: 22px;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.profile-picture {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #24a152;
  margin-bottom: 15px;
}

.admin-name {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.admin-since {
  font-size: 14px;
  color: #888;
  margin-bottom: 20px;
}

.profile-info {
  width: 100%;
  text-align: left;
  margin-bottom: 20px;
}

.profile-info p {
  margin: 8px 0;
  color: #555;
  font-size: 15px;
}

/* Form Section */
.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #444;
}

input[type='text'],
input[type='email'],
input[type='tel'],
input[type='file'] {
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
  transition: border 0.2s ease;
}

input:focus {
  outline: none;
  border-color: #24a152;
}

.register-button {
  background-color: #24a152;
  color: white;
  font-weight: 600;
  margin-top: 20px;
  border: none;
  padding: 14px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-button:hover {
  background-color: #1f8b43;
}

/* Admin List Section */
.list-section {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 0.1);
}

.list-section h2 {
  margin-bottom: 15px;
  color: #333;
  font-size: 22px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

thead tr {
  background-color: #24a152;
  color: white;
  text-align: left;
}

th, td {
  padding: 14px 12px;
  border-bottom: 1px solid #ddd;
}

tbody tr:hover {
  background-color: #f9f9f9;
}

button {
  background-color: #4caf50;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #3a9e3a;
}
</style>
