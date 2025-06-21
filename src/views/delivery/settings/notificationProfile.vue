<template>
  <div class="notification">
    <div class="contain">
      <div class="upper">
        <Title class="title" title="Notifications" />
        <ButtonFilter
          class="filter"
          v-model:value="selectedFilter"
          :options="filterOptions"
        />
      </div>
      <div class="content">
        <Box
          v-for="notification in driverStore.notifications"
          :key="notification.id"
          class="box"
        >
          <div class="head">{{ notification.title }}</div>

          <p v-if="notification.details?.pickUp" class="text">
            Pick up: {{ notification.details.pickUp }}
          </p>
          <p v-if="notification.details?.destination" class="text">
            Destination: {{ notification.details.destination }}
          </p>
          <p v-if="notification.details?.customer" class="text">
            Customer: {{ notification.details.customer }}
          </p>

          <p class="text">{{ notification.message }}</p>

          <div v-if="notification.status === 'pending'" class="bottom">
            <div class="buttons">
              <GeneralButton
                title="Accept"
                btnColor="#9A0404"
                titleColor="#ffffff"
                @click="updateNotificationStatus(notification.id, 'accepted')"
              />
              <GeneralButton
                title="Reject"
                btnColor="#292929"
                titleColor="#FFFFFF"
                @click="updateNotificationStatus(notification.id, 'rejected')"
              />
            </div>
          </div>
        </Box>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useDriverStore } from "@/stores/driverStore";
import ButtonFilter from "@/components/ButtonFilter.vue";
import Title from "@/components/delivery/title.vue";
import Box from "@/components/delivery/box.vue";
import GeneralButton from "@/components/GeneralButton.vue";

const router = useRouter();
const driverStore = useDriverStore();
const selectedFilter = ref("Today");

const filterOptions = [
  { value: "Today", label: "Today" },
  { value: "This Week", label: "This Week" },
  { value: "Last Month", label: "Last Month" },
];

onMounted(async () => {
  await driverStore.fetchDriverProfile();
  await driverStore.fetchNotifications();
});

</script>

<style scoped>
.notification {
  display: flex;
}
.contain {
  display: flex;
  flex-direction: column;
  padding: 80px;
  gap: 20px;
  width: 76%;
}
.title {
  font-size: 40px;
  font-weight: 600;
}
.upper {
  display: flex;
  justify-content: space-between;
}
.head {
  font-size: 20px;
  font-weight: 600;
}
.text {
  margin-left: 16px;
  font-size: 18px;
}
.link {
  color: #9a0404;
  font-style: italic;
}
.link {
  text-align: right;
}
.box {
  padding: 30px 25px;
}
.bottom {
  display: flex;
  justify-content: end;
  align-items: center;
}
.buttons {
  display: flex;
  gap: 10px;
}
.acc,
.rej {
  font-size: 18px;
  color: white;
  padding: 10px 15px;
  border-radius: 15px;
  border: none;
}
.rate {
  display: flex;
  align-items: center;
  justify-content: end;
}
.rating {
  margin: 5px;
  color: #9a0404;
  font-style: italic;
  text-decoration: underline;
}
.content {
  width: 110%;
  padding: 10px;
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: scroll;
}
.filter {
  color: #9a0404;
  background-color: white;
}
</style>
