<template>
  <div class="splash-container" :class="{ 'fade-out': isLeaving }">
    <div class="logo-container">
      <div class="logo">
        <img src="@/assets/homepage.png" alt="AhaGo Logo" />
      </div>
      <div class="flame"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      isLeaving: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLeaving = true
      setTimeout(() => {
        this.$router.push('/client') // Changed from '/menu' to '/client'
      }, 500) // Additional time for fade-out animation
    }, 2000)
  }
}
</script>

<style scoped>
.splash-container {
  background-color: #B91C1C;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 1;
  transition: opacity 0.5s ease-out;
}

.splash-container.fade-out {
  opacity: 0;
}

.logo-container {
  position: relative;
  width: 300px;
}

.logo {
  width: 100%;
}

.logo img {
  width: 100%;
  height: auto;
}

.flame {
  position: absolute;
  right: -20px;
  bottom: -10px;
  width: 100px;
  height: 120px;
  background: linear-gradient(to right, transparent, #FF4500);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  transform: rotate(-15deg);
  opacity: 0.8;
}

@keyframes flameAnimation {
  0% { transform: rotate(-15deg) scale(1); }
  50% { transform: rotate(-12deg) scale(1.1); }
  100% { transform: rotate(-15deg) scale(1); }
}

.flame {
  animation: flameAnimation 1.5s infinite ease-in-out;
}
</style>