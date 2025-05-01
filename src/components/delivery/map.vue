<template>
  <div class="map-container" ref="mapElement"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";

const mapElement = ref(null);

onMounted(() => {
  const map = L.map(mapElement.value).setView([11.5564, 104.9282], 13); // Default to Phnom Penh

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  let marker = null;

  if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        if (!marker) {
          marker = L.marker([lat, lng]).addTo(map);
        } else {
          marker.setLatLng([lat, lng]);
        }

        map.setView([lat, lng], 16); // Optional: Follow user position
      },
      (error) => {
        console.error("Geolocation error:", error.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      },
    );
  } else {
    console.warn("Geolocation is not supported by this browser.");
  }
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 400px;
  border: 1px solid #ccc;
}
</style>
