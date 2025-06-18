import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDriverStore = defineStore('driver', () => {
  const sections = ref([])
  const buttons = ref([])
  const orders = ref([])

  async function fetchSections() {
    try {
      const res = await fetch('http://localhost:8300/api/driver-sections')
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
      const res = await fetch('http://localhost:8300/api/driver-buttons')
      if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
      buttons.value = data.map(button =>({
        ...button,
      }))
  } catch (e) {
    console.error('Error fetching buttons:', e)
    }
  }

async function fetchOrders(status = null) {
  try {
    let url = 'http://localhost:8300/api/orders';
    if (status) {
      url += `?status=${status}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch');

    const data = await res.json();
    orders.value = data;
  } catch (e) {
    console.error('Error fetching orders:', e);
  }
}

  return { sections, fetchSections, buttons, fetchButtons, orders, fetchOrders }
})
