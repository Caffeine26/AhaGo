<template>
  <div class="message-item">
    <div class="message-avatar">
      <img :src="avatar" :alt="name" class="avatar-image">
    </div>
    <div class="message-content">
      <div class="message-header">
        <div class="message-info">
          <h3 class="message-name">{{ name }}</h3>
          <span class="message-role">{{ role }}</span>
        </div>
        <span class="message-time">{{ time }}</span>
      </div>
      <div class="message-text">
        <span class="checkmark">✓</span>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.message-avatar {
  flex-shrink: 0;
}

.avatar-image {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
}

.message-content {
  flex: 1;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.message-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.message-name {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  color: #000;
}

.message-role {
  padding: 0.25rem 0.75rem;
  background: #e6b2b2;
  border-radius: 1rem;
  font-size: 0.875rem;
  color: #9A0404;
}

.message-time {
  color: #9CA3AF;
  font-size: 0.875rem;
}

.message-text {
  position: relative;
  font-size: 1rem;
  line-height: 1.5;
  color: #000;
  padding-left: 1.25rem;
}

.checkmark {
  position: absolute;
  left: 0;
  color: #22C55E;
  font-size: 1rem;
}
</style>

<script>
export default {
  name: 'MessageItem',
  props: {
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'Customer'
    },
    time: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    unreadCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    isCustomer() {
      return this.role === 'Customer'
    }
  }
}
</script>