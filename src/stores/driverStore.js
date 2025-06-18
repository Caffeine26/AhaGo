import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'
import axios from 'axios'

export const useDriverStore = defineStore('driver', () => {
  // Signup/Login form state
  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')

  // Dashboard data
  const sections = ref([])
  const buttons = ref([])
  const orders = ref([])

  // Sign up function
  async function handleSignUp() {
    try {
      const response = await axios.post('http://localhost:8300/api/signup', {
        name: `${firstName.value} ${lastName.value}`,
        email: email.value,
        password: password.value,
        password_confirmation: confirmPassword.value,
        role: 'driver',
        first_name: firstName.value,
        last_name: lastName.value,
      })

      alert('Signup successful! Please login.')
      router.push('/driver/login')
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message)
      alert('Signup failed: ' + (error.response?.data?.message || 'Unknown error'))
    }
  }

  // Login function
  async function handleLogin() {
    const loginUrl = `http://localhost:8300/api/driver/login`

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      })

      const data = await response.json()

      if (response.ok && data.user) {
        alert(`Welcome, ${data.user.name}`)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('role', 'driver')
        router.push('/delivery/overview')
      } else {
        alert(data.message || 'Login failed.')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Unable to connect. Please try again.')
    }
  }

  // Fetch driver guide sections
  async function fetchSections() {
    try {
      const res = await fetch('http://localhost:8300/api/driver-sections')
      if (!res.ok) throw new Error('Failed to fetch')

      const data = await res.json()
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

  // Fetch all buttons
  async function fetchButtons() {
    try {
      const res = await fetch('http://localhost:8300/api/driver-buttons')
      if (!res.ok) throw new Error('Failed to fetch')

      const data = await res.json()
      buttons.value = data
    } catch (e) {
      console.error('Error fetching buttons:', e)
    }
  }

  // Fetch orders (all or filtered by status)
  async function fetchOrders(status = null) {
    try {
      let url = 'http://localhost:8300/api/orders'
      if (status) url += `?status=${status}`

      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch')

      orders.value = await res.json()
    } catch (e) {
      console.error('Error fetching orders:', e)
    }
  }

  return {
    // state
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    sections,
    buttons,
    orders,

    // actions
    handleSignUp,
    handleLogin,
    fetchSections,
    fetchButtons,
    fetchOrders,
  }
})
