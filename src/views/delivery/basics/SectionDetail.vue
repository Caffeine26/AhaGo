<template>
  <div class="contain" v-if="selectedButton">
    <div class="button-block">
      <Title :title="selectedButton.name" />
      <Text v-if="selectedButton.text" :text="selectedButton.text" />

      <div class="content" v-if="selectedButton.descriptions?.length">
        <div class="contain-desc">
          <Description
            v-for="(desc, i) in selectedButton.descriptions"
            :key="i"
            :svg="iconMap[desc.svg]"
            :SectionTitle="desc.title"
            :text="desc.text"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useDriverStore } from "@/stores/driverStore";

import Title from "@/components/delivery/title.vue";
import Text from "@/components/delivery/text.vue";
import Description from "@/components/delivery/description.vue";
import brake from "@/assets/delivery/icons/brake.svg";
import mirror from "@/assets/delivery/icons/mirror.svg";
import id from "@/assets/delivery/icons/id.svg";
import horn from "@/assets/delivery/icons/horn.svg";
import bag from "@/assets/delivery/icons/bag.svg";
import mobile from "@/assets/delivery/icons/mobile.svg";
import app1 from "@/assets/delivery/icons/app1.svg";
import gps from "@/assets/delivery/icons/gps.svg";
import profile from "@/assets/delivery/icons/profile.svg";
import bell from "@/assets/delivery/icons/bell.svg";
import help from "@/assets/delivery/icons/help.svg";
import stack from "@/assets/delivery/icons/stack.svg";
import route from "@/assets/delivery/icons/route.svg";
import chat from "@/assets/delivery/icons/chat.svg";
import clock from "@/assets/delivery/icons/clock.svg";
import reload from "@/assets/delivery/icons/reload.svg";
import hot from "@/assets/delivery/icons/hot.svg";
import rest from "@/assets/delivery/icons/rest.svg";
import parking from "@/assets/delivery/icons/parking.svg";
import warning from "@/assets/delivery/icons/warning.svg";
import traffic from "@/assets/delivery/icons/traffic.svg";
import weather from "@/assets/delivery/icons/weather.svg";
import box from "@/assets/delivery/icons/box.svg";
import sanitize from "@/assets/delivery/icons/sanitize.svg";
import calendar from "@/assets/delivery/icons/calendar.svg";
import tip from "@/assets/delivery/icons/tip.svg";
import tax from "@/assets/delivery/icons/tax.svg";
import star from "@/assets/delivery/icons/star.svg";
import wallet from "@/assets/delivery/icons/wallet.svg";
import deduct from "@/assets/delivery/icons/deduct.svg";
import payment from "@/assets/delivery/icons/payment.svg";
import order from "@/assets/delivery/icons/order.svg";
import thumb from "@/assets/delivery/icons/thumb.svg";
import feedback from "@/assets/delivery/icons/feedback.svg";
import mechanic from "@/assets/delivery/icons/mechanic.svg";
import motor from "@/assets/delivery/icons/motor.svg";
import pin from "@/assets/delivery/icons/pin.svg";
import event from "@/assets/delivery/icons/event.svg";

const props = defineProps({
  section: String,
  buttonLink: String,
});

const iconMap = {
  brake: brake,
  mirror: mirror,
  id: id,
  horn: horn,
  bag: bag,
  mobile: mobile,
  app: app1,
  gps: gps,
  profile: profile,
  bell: bell,
  help: help,
  stack: stack,
  route: route,
  chat: chat,
  clock: clock,
  reload: reload,
  hot: hot,
  rest: rest,
  parking: parking,
  warning: warning,
  traffic: traffic,
  weather: weather,
  box: box,
  sanitize: sanitize,
  calendar: calendar,
  tip: tip,
  tax: tax,
  star: star,
  wallet: wallet,
  deduct: deduct,
  payment: payment,
  order: order,
  thumb: thumb,
  feedback: feedback,
  mechanic: mechanic,
  motor: motor,
  pin: pin,
  event: event,
};

const sectionData = ref(null);
const driverStore = useDriverStore();

async function loadSectionData() {
  try {
    if (!driverStore.sections.length) {
      await driverStore.fetchSections();
    }

    const allSections = driverStore.sections;

    // Find section containing the button with matching link
    let foundSection = allSections.find((section) =>
      section.buttons?.some((button) => button.link === props.buttonLink)
    );

    // If not found, try fallback by section prop
    if (!foundSection) {
      foundSection =
        allSections.find((sec) => sec.linkTo === props.section) || allSections[0];
    }

    sectionData.value = foundSection;
  } catch (error) {
    console.error("Failed to load sections from Laravel:", error);
  }
}

onMounted(loadSectionData);
watch(() => [props.section, props.buttonLink], loadSectionData);

const selectedButton = computed(() => {
  if (!sectionData.value?.buttons || !props.buttonLink) return null;
  return sectionData.value.buttons.find((btn) => btn.link === props.buttonLink);
});
</script>


<style scoped>
.contain {
  padding: 60px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.button-block {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.contain-desc {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
</style>
