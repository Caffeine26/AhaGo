<template>
  <div class="contain" v-if="selectedButton">
    <div class="button-block">
      <Title :title="selectedButton.name" />
      <Text v-if="selectedButton.text" :text="selectedButton.text" />

      <div class="content" v-if="selectedButton.description?.length">
        <div class="contain-desc">
          <Description
            v-for="(desc, i) in selectedButton.description"
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
import axios from "axios";

import Title from "@/components/delivery/title.vue";
import Text from "@/components/delivery/text.vue";
import Description from "@/components/delivery/description.vue";

import cloudIcon from "@/assets/delivery/icons/cloud.svg";

const props = defineProps({
  section: String,
  buttonLink: String,
});

const iconMap = {
  cloud: cloudIcon,
};

const sectionData = ref(null);

async function loadSectionData() {
  try {
    const res = await axios.get("http://localhost:4000/api/sections");
    const allSections = res.data;

    // Find section containing the button with link = props.buttonLink
    let foundSection = allSections.find((section) =>
      section.buttons?.some((button) => button.link === props.buttonLink)
    );

    // If not found, fallback to section from the route param or first section
    if (!foundSection) {
      foundSection =
        allSections.find((sec) => sec.link === props.section) || allSections[0];
    }

    sectionData.value = foundSection;
  } catch (error) {
    console.error("Failed to load sections:", error);
  }
}

// Load data initially
onMounted(loadSectionData);

// Watch for route param changes (section or buttonLink) to reload data
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
