<template>
  <div class="dashboard-wrapper">
    <Sidebar class="sidebar" />

    <div class="main-content">
      <header class="header">
        <h2 class="text-2xl font-bold">Chat</h2>
        <div class="header-right">
          <input type="text" placeholder="Search..." class="search-input" />
          <div class="user-info">
            <img src="@/assets/Kuromi.jpg" alt="user" class="user-img" />
            <span>Sarawat Jae</span>
          </div>
        </div>
      </header>

      <div class="message-container">
        <!-- Contacts Sidebar -->
        <aside class="contact-sidebar">
          <div class="sidebar-header">
            <div class="message-title">Contact</div>
          </div>
          <div class="search-bar">
            <input type="text" placeholder="Search anythings" v-model="searchQuery" />
            <img src="@/assets/icons/search.png" alt="Search" class="search-icon" />
            <button class="filter-button" @click="toggleFilter">
              <img src="@/assets/icons/filter.png" alt="Filter" class="filter-icon" />
            </button>
            <button class="add-button" @click="addContact">
              <img src="@/assets/icons/addnew.png" alt="Add" class="add-icon" />
            </button>
          </div>
          <div class="contact-list">
            <div
              v-for="contact in filteredContacts"
              :key="contact.id"
              class="contact-item"
              :class="{ active: selectedContact && selectedContact.id === contact.id }"
              @click="selectContact(contact)"
            >
              <div class="contact-avatar">
                <img :src="contact.avatar" :alt="contact.name" />
              </div>
              <div class="contact-info">
                <div class="contact-name">{{ contact.name }}</div>
                <div class="contact-meta">
                  <span class="contact-role">{{ contact.role }}</span>
                  <span class="contact-time">{{ contact.time }}</span>
                </div>
                <div class="contact-last-message">
                  {{ contact.lastMessage }}
                  <span v-if="contact.unreadCount" class="unread-count">{{ contact.unreadCount }}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <!-- Chat Area -->
        <main class="chat-main" :class="{ 'no-conversation': !selectedContact }">
          <header class="chat-header" v-if="selectedContact">
            <div class="current-user">
              <div class="user-avatar">
                <img :src="selectedContact.avatar" :alt="selectedContact.name" />
              </div>
              <div class="user-info">
                <div class="user-name">{{ selectedContact.name }}</div>
                <div class="user-status">{{ selectedContact.status || 'Offline' }}</div>
              </div>
            </div>
            <div class="header-actions">
              <img src="@/assets/icons/call.png" alt="Call" class="icon call-icon" />
              <img src="@/assets/icons/video.png" alt="Video" class="icon video-icon" />
              <img src="@/assets/icons/more.png" alt="More Options" class="icon more-icon" />
            </div>
          </header>

          <section class="chat-messages" ref="messagesContainer">
            <div v-if="selectedContact">
              <div
                v-for="(msg, index) in currentMessages"
                :key="index"
                :class="['message', msg.isOwn ? 'own' : 'other']"
              >
                <div class="message-content">{{ msg.text }}</div>
                <div class="message-time">{{ msg.time }}</div>
              </div>
            </div>
            <div v-else class="no-selection">
              Select a contact to start chatting.
            </div>
          </section>

          <footer class="chat-input" v-if="selectedContact">
            <input
              v-model="newMessage"
              @keydown.enter.prevent="sendMessage"
              type="text"
              placeholder="Type a message"
            />
            <button @click="sendMessage">Send</button>
          </footer>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Sidebar from '@/components/admin/Sidebar.vue';
import avatar1 from '@/assets/avatars/avatar1.png';
import avatar2 from '@/assets/avatars/avatar2.png';

export default {
  components: { Sidebar },
  data() {
    return {
      searchQuery: '',
      selectedContact: null,
      newMessage: '',
      currentUserId: null, // Dynamically set from localStorage
      contacts: [
        {
          id: 1,
          name: 'Alice Johnson',
          avatar: avatar1,
          role: 'Designer',
          time: '10:45 AM',
          lastMessage: 'Hey, are you coming?',
          unreadCount: 2,
          status: 'Online',
          messages: [],
        },
        {
          id: 2,
          name: 'Bob Smith',
          avatar: avatar2,
          role: 'Developer',
          time: '9:30 AM',
          lastMessage: 'Check the update.',
          unreadCount: 0,
          status: 'Offline',
          messages: [],
        },
      ],
    };
  },
  computed: {
    filteredContacts() {
      if (!this.searchQuery) return this.contacts;
      return this.contacts.filter(c =>
        c.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    currentMessages() {
      return this.selectedContact ? this.selectedContact.messages : [];
    },
  },
  methods: {
    async selectContact(contact) {
      this.selectedContact = contact;

      try {
        const response = await axios.get('http://localhost:8300/api/messages', {
          params: {
            sender_id: this.currentUserId,
            receiver_id: contact.id,
          },
        });

        contact.messages = response.data.map(msg => ({
          text: msg.message,
          time: new Date(msg.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: msg.sender_id === this.currentUserId,
        }));

        this.scrollToBottom();
      } catch (err) {
        console.error('Failed to load messages', err);
      }
    },

    async sendMessage() {
      const messageText = this.newMessage.trim();
      if (!messageText || !this.selectedContact) return;
      try {
        const response = await axios.post('http://localhost:8300/api/messages', {
          sender_id: this.currentUserId,
          receiver_id: this.selectedContact.id,
          message: messageText,
        });

        this.selectedContact.messages.push({
          text: response.data.message,
          time: new Date(response.data.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: true,
        });

        this.newMessage = '';
        this.scrollToBottom();
      } catch (err) {
        console.error('Send message failed', err);
      }
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) container.scrollTop = container.scrollHeight;
      });
    },

    toggleFilter() {
      alert('Filter toggled!');
    },

    addContact() {
      alert('Add contact clicked!');
    },
  },
  mounted() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUserId = user.id;
    } else {
      console.warn('No logged-in user found.');
      // Optionally redirect or notify
    }
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

.message-container {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
}

/* Sidebar */
.contact-sidebar {
  width: 320px;
  background: #f7f7f7;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

.message-title {
  font-weight: bold;
  font-size: 20px;
  color: #333;
}

.search-bar {
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #ddd;
}

.search-bar input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-icon,
.filter-icon,
.add-icon,
.icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.filter-button,
.add-button {
  background: none;
  border: none;
  padding: 0;
}

/* Contact List */
.contact-list {
  overflow-y: auto;
  flex-grow: 1;
}

.contact-item {
  display: flex;
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.contact-item.active,
.contact-item:hover {
  background-color: #d7eaff;
}

.contact-avatar img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
}

.contact-info {
  flex: 1;
}

.contact-name {
  font-weight: 600;
  color: #222;
}

.contact-meta {
  font-size: 12px;
  color: #666;
  margin: 4px 0;
  display: flex;
  justify-content: space-between;
}

.contact-last-message {
  font-size: 13px;
  color: #444;
  position: relative;
}

.unread-count {
  background-color: #ff5b5b;
  color: white;
  font-size: 11px;
  border-radius: 12px;
  padding: 2px 6px;
  margin-left: 8px;
  vertical-align: middle;
}

/* Main chat area */
.chat-main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: white;
}

.chat-main.no-conversation {
  justify-content: center;
  align-items: center;
  color: #888;
  font-size: 18px;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  align-items: center;
}
.current-user {
  display: flex;
  align-items: center;
}

.user-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
}

.user-name {
  font-weight: 700;
  font-size: 18px;
}

.user-status {
  font-size: 13px;
  color: #777;
}

.header-actions img.icon {
  margin-left: 15px;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

/* Chat messages */
.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f2f2f2;
}

.message {
  max-width: 60%;
  margin-bottom: 15px;
  padding: 10px 15px;
  border-radius: 20px;
  position: relative;
  word-wrap: break-word;
}

.message.own {
  background-color: #0084ff;
  color: white;
  margin-left: auto;
  border-bottom-right-radius: 5px;
}

.message.other {
  background-color: #e4e6eb;
  color: #050505;
  border-bottom-left-radius: 5px;
}

.message-time {
  font-size: 10px;
  color: #999;
  margin-top: 4px;
  text-align: right;
}

/* Chat input */
.chat-input {
  display: flex;
  padding: 15px;
  border-top: 1px solid #ddd;
  background: #fff;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
}

.chat-input button {
  margin-left: 10px;
  padding: 0 20px;
  border: none;
  background-color: #0084ff;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
}
</style>