<template>
  <div class="user-management">
    <h1>User & Role Management</h1>

    <!-- Role Filter Buttons -->
    <div class="filter-controls">
      <button v-for="role in roles" :key="role" @click="filterByRole(role)" :class="{ active: currentRole === role }">
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
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserManagement',
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
        const res = await axios.post(`http://localhost:8300/api/users/${userId}/verify`, { email });
        alert('✅ Verification email sent!');
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
.user-management {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
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
}
.user-table th, .user-table td {
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
</style>
