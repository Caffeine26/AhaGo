<template>
    <div class="status-box">
      <template v-if="statusId === 0">
        <button @click="$emit('accept')" class="accept-btn">Accept</button>
        <button @click="$emit('reject')" class="reject-btn">Reject</button>
      </template>
      
      <template v-else-if="statusId === 1">
        <span class="status-text pending">Pending</span>
      </template>
  
      <template v-else-if="statusId === 2">
        <div class="status">
            <span class="status-text completed">Completed</span>
            <span class="status-text unpaid">Not paid</span>
        </div>
        
      </template>

      <template v-else-if="statusId === 3">
        <div class="status">
            <span class="status-text completed">Completed</span>
            <span class="status-text paid">Paid</span>
        </div>
        
      </template>
  
      <template v-else>
        <span class="status-text pending">Pending</span>
      </template>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      statusId: {
        type: Number,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .status-box {
    display: flex;
    gap: 10px;
    align-items: center;
    font-family: 'Raleway';
  }
  
  .status {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  
  .accept-btn {
    background-color: #D90000;
    color: white;
    padding: 6px 12px;
    border: none;
    border-radius: 12px;
    font-family: 'Raleway';
    font-weight: bold;
  }
  
  .reject-btn {
    color: #2F2D2D;
    padding: 6px 12px;
    background-color: white;
    border: none;
    font-family: 'Raleway';
    font-weight: 400;
  }
  
  .status-text {
    font-weight: bold;
  }
  
  .paid {
    color: green;
  }

  .unpaid {
    color: #292929;
  }
  
  .completed {
    color: red;
  
  }
  
  .pending {
    color: orange;
  }
  </style>
  