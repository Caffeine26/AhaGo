<template>
  <div class="dashboard-wrapper">
    <Sidebar />

    <div class="main-content">
      

      <div class="admin-panel">
        <div class="top-section">
          <div class="profile-section" v-if="selectedAdmin">
            <h2>Admin Profile</h2>
            <div class="profile-card">
              <img
                :src="selectedAdmin.profileImage || defaultImage"
                alt="Profile Picture"
                class="profile-picture"
              />
              <h3 class="admin-name">{{ selectedAdmin.firstName }} {{ selectedAdmin.lastName }}</h3>
              <p class="admin-since"><strong>Admin since:</strong> {{ formatDate(selectedAdmin.adminSince) }}</p>

              <div class="profile-info">
                <p><strong>Email:</strong> {{ selectedAdmin.email }}</p>
                <p><strong>Address:</strong> {{ selectedAdmin.address }}</p>
                <p><strong>City:</strong> {{ selectedAdmin.city }}</p>
                <p><strong>Phone:</strong> {{ selectedAdmin.phone }}</p>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h2>{{ isEditing ? 'Edit Admin' : 'Register New Admin' }}</h2>
            <form @submit.prevent="handleSubmit">
              <div class="form-group" v-for="field in fields" :key="field.id">
                <label :for="field.id">{{ field.label }}</label>
                <input
                  :type="field.type"
                  :id="field.id"
                  v-model="formData[field.model]"
                  :placeholder="field.placeholder"
                  required
                />
              </div>

              <div class="form-group">
                <label for="password">Password</label>
                <div class="password-wrapper">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="formData.password"
                    placeholder="Enter password"
                    :required="!isEditing"
                  />
                  <button type="button" @click="showPassword = !showPassword" class="toggle-password-btn">
                    {{ showPassword ? 'Hide' : 'Show' }}
                  </button>
                </div>
              </div>

              <input type="file" @change="onFileChange" ref="fileInput" />

              <button type="submit" class="register-button">
                {{ isEditing ? 'Update' : 'Register' }}
              </button>
              <button v-if="isEditing" type="button" class="cancel-button" @click="cancelEdit">Cancel</button>
            </form>
          </div>
        </div>

        <div class="list-section">
          <h2>All Registered Admins</h2>
          <table v-if="admins.length">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(admin, index) in admins"
                :key="admin.id"
                @click="selectAdmin(index)"
                :class="{ selected: selectedAdmin && selectedAdmin.id === admin.id }"
                style="cursor: pointer;"
              >
                <td>{{ admin.firstName }}</td>
                <td>{{ admin.lastName }}</td>
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
import axios from 'axios';
import Sidebar from '@/components/admin/Sidebar.vue';
import defaultImage from '@/assets/Koung1.jpg';

axios.defaults.baseURL = 'http://localhost:8300/api';

export default {
  name: 'AdminPanel',
  components: { Sidebar },
  data() {
    return {
      admins: [],
      selectedAdmin: null,
      isEditing: false,
      editingIndex: null,
      defaultImage,
      showPassword: false,
      formData: {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        phone: '',
        profileImage: null,
        password: '',
      },
      fields: [
        { id: 'firstName', label: 'First Name', model: 'firstName', type: 'text', placeholder: 'Enter first name' },
        { id: 'lastName', label: 'Last Name', model: 'lastName', type: 'text', placeholder: 'Enter last name' },
        { id: 'email', label: 'Email', model: 'email', type: 'email', placeholder: 'Enter email' },
        { id: 'address', label: 'Address', model: 'address', type: 'text', placeholder: 'Enter address' },
        { id: 'city', label: 'City', model: 'city', type: 'text', placeholder: 'Enter city' },
        { id: 'phone', label: 'Phone', model: 'phone', type: 'tel', placeholder: 'Enter phone number' },
      ],
    };
  },
  methods: {
    async fetchAdmins() {
      try {
        const res = await axios.get('/users');
        this.admins = res.data
          .filter(user => user.role === 'admin')
          .map(admin => {
            const profile = admin.admin_profile || {};
            return {
              id: admin.id,
              email: admin.email,
              profileImage: admin.img_src
                ? `http://localhost:8300/storage/${admin.img_src}?t=${Date.now()}`
                : this.defaultImage,
              firstName: profile.firstname || '',
              lastName: profile.lastname || '',
              address: profile.address || admin.address || '',
              city: profile.city || '',
              phone: profile.phone_number || admin.phone_number || '',
              adminSince: admin.created_at,
            };
          });

        if (this.admins.length) this.selectAdmin(0);
      } catch (error) {
        alert('Error fetching admins: ' + error.message);
      }
    },

    selectAdmin(index) {
      this.selectedAdmin = this.admins[index];
      this.showPassword = false;
      this.isEditing = false;
      this.editingIndex = null;

      this.formData = {
        id: this.selectedAdmin.id,
        firstName: this.selectedAdmin.firstName,
        lastName: this.selectedAdmin.lastName,
        email: this.selectedAdmin.email,
        address: this.selectedAdmin.address,
        city: this.selectedAdmin.city,
        phone: this.selectedAdmin.phone,
        profileImage: null,
        password: '',
      };

      if (this.$refs.fileInput) this.$refs.fileInput.value = null;
    },

    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.formData.profileImage = file;
      }
    },

    resetForm() {
      this.formData = {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        phone: '',
        profileImage: null,
        password: '',
      };
      this.isEditing = false;
      this.editingIndex = null;
      this.showPassword = false;
      if (this.$refs.fileInput) this.$refs.fileInput.value = null;
    },

    async registerAdmin() {
      try {
        const formData = new FormData();
        formData.append('name', this.formData.firstName + ' ' + this.formData.lastName);
        formData.append('email', this.formData.email);
        formData.append('password', this.formData.password);
        formData.append('address', this.formData.address);
        formData.append('phone_number', this.formData.phone);
        formData.append('role', 'admin');
        formData.append('firstname', this.formData.firstName);
        formData.append('lastname', this.formData.lastName);
        formData.append('city', this.formData.city);

        if (this.formData.profileImage) {
          formData.append('img', this.formData.profileImage);
        }

        const res = await axios.post('/users', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        this.admins.push({
          id: res.data.id,
          email: res.data.email,
          profileImage: res.data.img_src
            ? `http://localhost:8300/storage/${res.data.img_src}?t=${Date.now()}`
            : this.defaultImage,
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          address: this.formData.address,
          city: this.formData.city,
          phone: this.formData.phone,
          adminSince: new Date().toISOString(),
        });

        this.selectAdmin(this.admins.length - 1);
        alert('Admin registered successfully!');
        this.resetForm();
      } catch (error) {
        alert('Failed to register admin: ' + (error.response?.data?.message || error.message));
      }
    },

    editAdmin(index) {
      const admin = this.admins[index];
      this.formData = {
        id: admin.id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        address: admin.address,
        city: admin.city,
        phone: admin.phone,
        profileImage: null,
        password: '',
      };
      this.isEditing = true;
      this.editingIndex = index;
      this.showPassword = false;
      if (this.$refs.fileInput) this.$refs.fileInput.value = null;
    },

    async updateAdmin() {
      try {
        const formData = new FormData();
        formData.append('name', this.formData.firstName + ' ' + this.formData.lastName);
        formData.append('email', this.formData.email);
        formData.append('address', this.formData.address);
        formData.append('phone_number', this.formData.phone);
        formData.append('role', 'admin');
        formData.append('firstname', this.formData.firstName);
        formData.append('lastname', this.formData.lastName);
        formData.append('city', this.formData.city);

        if (this.formData.password) {
          formData.append('password', this.formData.password);
        }

        if (this.formData.profileImage) {
          formData.append('img', this.formData.profileImage);
        }

        const res = await axios.put(`/users/${this.formData.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        this.admins.splice(this.editingIndex, 1, {
          id: res.data.id,
          email: res.data.email,
          profileImage: res.data.img_src
            ? `http://localhost:8300/storage/${res.data.img_src}?t=${Date.now()}`
            : this.defaultImage,
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          address: this.formData.address,
          city: this.formData.city,
          phone: this.formData.phone,
          adminSince: this.admins[this.editingIndex].adminSince,
        });

        this.selectAdmin(this.editingIndex);
        alert('Admin updated successfully!');
        this.resetForm();
      } catch (error) {
        alert('Failed to update admin: ' + (error.response?.data?.message || error.message));
      }
    },

    cancelEdit() {
      this.resetForm();
      if (this.admins.length) this.selectAdmin(0);
    },

    formatDate(dateStr) {
      if (!dateStr) return 'N/A';
      const d = new Date(dateStr);
      return d.toLocaleDateString();
    },

    handleSubmit() {
      if (this.isEditing) {
        this.updateAdmin();
      } else {
        this.registerAdmin();
      }
    },
  },

  mounted() {
    this.fetchAdmins();
  },
};
</script>


<style scoped>
/* ...existing styles plus: */

.password-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toggle-password-btn {
  background: none;
  border: none;
  color: #24a152;
  cursor: pointer;
  font-weight: 600;
  padding: 0;
  user-select: none;
}

.toggle-password-btn:hover {
  text-decoration: underline;
}

/* Keep other styles as above */

/* Your existing styles here */
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

.cancel-button {
  background-color: #b03030;
  color: white;
  font-weight: 600;
  margin-top: 10px;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

.cancel-button:hover {
  background-color: #800000;
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

th,
td {
  padding: 14px 12px;
  border-bottom: 1px solid #ddd;
}

tbody tr:hover {
  background-color: #f9f9f9;
}

tbody tr.selected {
  background-color: #d3f4d1;
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
