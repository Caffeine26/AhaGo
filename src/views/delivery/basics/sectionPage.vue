<template>
  <div class="contain" v-if="section">
    <div class="content">
      <Title :title="section.title" />
      <Text :text="section.text" />
      <div class="buttons">
        <Button
          v-for="(btn, index) in section.buttons"
          :key="index"
          :imageSrc="btn.imageSrc"
          :name="btn.name"
          :sectionLink="section.linkTo"
          :buttonLink="btn.link"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDriverStore } from '@/stores/driverStore' // adjust path if needed

import Title from '@/components/delivery/title.vue'
import Text from '@/components/delivery/text.vue'
import Button from '@/components/delivery/button.vue'

const route = useRoute()
const section = ref(null)

const driverStore = useDriverStore()

onMounted(async () => {
  if (!driverStore.sections.length) {
    await driverStore.fetchSections()
  }

  section.value = driverStore.sections.find((s) => {
    const parts = s.linkTo?.split('/') || []
    return parts[parts.length - 1] === route.params.section
  })
})
</script>

<style scoped>
.contain {
  display: flex;
  padding: 60px;
}
.buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px 40px;
}
</style>
