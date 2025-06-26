<template>
  <div class="dashboard-wrapper">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
  
      <div class="user-management">
        <h1>User & Role Management</h1>

        <!-- Role Filter Buttons -->
        <div class="filter-controls">
          <button 
            v-for="role in roles"
            :key="role"
            @click="filterByRole(role)"
            :class="{ active: currentRole === role }"
          >
            {{ role }}s
          </button>
        </div>

        <!-- User Table -->
        <table class="user-table" v-if="!loading">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Address</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>{{ user.phone_number || user.admin_profile?.phone_number || '-' }}</td>
              <td>{{ user.address || user.admin_profile?.address || '-' }}</td>
              <td>{{ user.admin_profile?.city || '-' }}</td>
              <td class="actions">
                <button class="verify-btn" @click="verifyUser(user.id, user.email)">Verify</button>
                <button class="cancel-btn" @click="cancelUser(user.id)">Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="loading">Loading users...</div>
      </div>
    </div>
  
</template>

<script>
import axios from 'axios';
import Sidebar from '@/components/admin/Sidebar.vue';

export default {
  name: 'UserManagement',
  components: {
    Sidebar,
  },
  data() {
    return {
      users: [],
      roles: ['customer', 'admin', 'driver', 'restaurant'],
      currentRole: 'restaurant',
      loading: false,
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) => user.role === this.currentRole);
    },
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      try {
        const res = await axios.get('http://localhost:8300/api/users');
        this.users = res.data;
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        this.loading = false;
      }
    },
    filterByRole(role) {
      this.currentRole = role;
    },
    async verifyUser(userId, email) {
      try {
        await axios.post(`http://localhost:8300/api/users/${userId}/verify`, { email });
        alert('✅ User verified successfully');
        this.fetchUsers(); // refresh the list
      } catch (err) {
        alert('❌ Verification failed!');
        console.error(err);
      }
    },
    async cancelUser(userId) {
      if (!confirm('Are you sure you want to delete this user?')) return;

      try {
        await axios.delete(`http://localhost:8300/api/users/${userId}`);
        alert('🚫 User cancelled and removed.');
        this.fetchUsers(); // refresh the list
      } catch (err) {
        alert('❌ Deletion failed!');
        console.error(err);
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.dashboard-wrapper {
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
}
.sidebar {
  width: 220px;
  min-width: 220px;
  max-width: 220px;
  background-color: #1f2937;
  color: #fff;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
}
/* Sidebar is imported, no need to style .sidebar directly here */

.user-management {
  flex: 1;
   /* Make room for fixed Sidebar */
  padding: 20px;
  background: white;
  border-radius: 8px;
  overflow-y: auto;
}

.filter-controls button {
  margin: 5px;
  padding: 8px 16px;
  background: #ddd;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.filter-controls .active {
  background: #4caf50;
  color: white;
}
.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.user-table th,
.user-table td {
  padding: 10px;
  border: 1px solid #ccc;
}
.actions button {
  margin-right: 8px;
}
.verify-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 5px;
}
.cancel-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 5px;
}
.main-content {
  flex: 1;
  background-color: #f9fafb;
  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  max-width: calc(100vw - 250px); /* Prevent horizontal overflow */
  box-sizing: border-box;
}
</style>
