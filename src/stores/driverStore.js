import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDriverStore = defineStore('driver', () => {
  const sections = ref([])
  const buttons = ref([])
  async function fetchSections() {
    try {
      const res = await fetch('http://localhost:8100/api/driver-sections')
      if (!res.ok) throw new Error('Failed to fetch')

      const data = await res.json()

      // Map snake_case keys to camelCase for easier usage
      sections.value = data.map(section => ({
        ...section,
        linkTo: section.link_to,
        buttons: section.buttons.map(btn => ({
          ...btn,
          imageSrc: btn.img_src,
        })),
      }))
    } catch (e) {
      console.error('Error fetching sections:', e)
    }
  }

  async function fetchButtons(){
    try {
      const res = await fetch('http://localhost:8100/api/driver-buttons')
      if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
      buttons.value = data.map(button =>({
        ...button,
      }))
  } catch (e) {
    console.error('Error fetching buttons:', e)
    }
  }
  return { sections, fetchSections, buttons, fetchButtons }
})
