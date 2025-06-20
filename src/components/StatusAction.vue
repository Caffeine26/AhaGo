<template>
  <div class="status-box">
    <template v-if="status === 'cancelled'">
      <span class="status-text cancelled">Cancelled</span>
    </template>
    
    <template v-else-if="status === 'pending'">
      <span class="status-text pending">Pending</span>
    </template>

    <template v-else-if="status === 'preparing'">
      <span class="status-text prepare">Prepare</span>
      
    </template>

    <template v-else-if="status === 'ready'">
      <span class="status-text ready">Ready</span>
    </template>

    <template v-else-if="status === 'delivering'">
      <span class="status-text otw">On the way</span>
    </template>

    <template v-else-if="status === 'completed'">
      <span class="status-text completed">Completed</span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
/* .status-box {
  display: flex;
  gap: 10px;
  align-items: center;
  font-family: 'Raleway';
} */

.status-text {
  font-weight: bold;
  font-size: small;
  color: white;
  font-family: 'Raleway';
  padding: 5px 10px;
  border: none;
  border-radius: 20px;
  
}

.cancelled {
  background-color: #292929;
}
.pending {
  background-color: #D90000;
}
.prepare {
  background-color: #FF3F00;
}
.ready {
  background-color: #0C8CE9;
}
.otw {
  background-color: #F8BD00;
}
.completed {
  background-color: #008F39;
}


</style>
  