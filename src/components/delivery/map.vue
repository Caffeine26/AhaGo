<template>
  <div class="map-container" ref="mapElement"></div>
</template>

<script setup>
import { onMounted, ref, watch, onBeforeUnmount } from "vue";
import L from "leaflet";

const props = defineProps({
  // Initial center coords, default Phnom Penh
  center: {
    type: Array,
    default: () => [11.5564, 104.9282],
  },
  // Initial zoom level
  zoom: {
    type: Number,
    default: 13,
  },
  // Driver's current position marker [lat, lng]
  markerPosition: {
    type: Array,
    default: () => null,
  },
  // Driver profile picture URL for custom marker icon
  driverProfilePicUrl: {
    type: String,
    default: null,
  },
  // Enable geolocation tracking or not
  useGeolocation: {
    type: Boolean,
    default: false,
  },
  // Restaurant coordinates { lat, lng }
  restaurantCoords: {
    type: Object,
    default: () => null,
  },
  // Client coordinates { lat, lng }
  clientCoords: {
    type: Object,
    default: () => null,
  },
});

const mapElement = ref(null);
let map = null;
let driverMarker = null;
let geoWatchId = null;

onMounted(() => {
  map = L.map(mapElement.value).setView(props.center, props.zoom);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Restaurant marker
  if (props.restaurantCoords) {
    L.marker([props.restaurantCoords.lat, props.restaurantCoords.lng])
      .addTo(map)
      .bindPopup("Restaurant");
  }

  // Client marker
  if (props.clientCoords) {
    L.marker([props.clientCoords.lat, props.clientCoords.lng])
      .addTo(map)
      .bindPopup("Customer");
  }

  // Driver marker with custom icon if profile pic URL is provided
  if (props.markerPosition) {
    const icon = props.driverProfilePicUrl
      ? L.icon({
          iconUrl: props.driverProfilePicUrl,
          iconSize: [40, 40], // size of the icon
          iconAnchor: [20, 40], // point of the icon which will correspond to marker's location (bottom center)
          popupAnchor: [0, -40], // point from which the popup should open relative to the iconAnchor
          className: "driver-marker-icon",
        })
      : null;

    driverMarker = icon
      ? L.marker(props.markerPosition, { icon })
      : L.marker(props.markerPosition);

    driverMarker.addTo(map);
  }

  // Geolocation: track driver if enabled
  if (props.useGeolocation && "geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        if (!driverMarker) {
          const icon = props.driverProfilePicUrl
            ? L.icon({
                iconUrl: props.driverProfilePicUrl,
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, -40],
                className: "driver-marker-icon",
              })
            : null;

          driverMarker = icon
            ? L.marker([lat, lng], { icon })
            : L.marker([lat, lng]);

          driverMarker.addTo(map);
        } else {
          driverMarker.setLatLng([lat, lng]);
        }

        map.setView([lat, lng], 16);
      },
      (err) => {
        console.error("Geolocation initial position error:", err.message);
      }
    );

    geoWatchId = navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        if (!driverMarker) {
          const icon = props.driverProfilePicUrl
            ? L.icon({
                iconUrl: props.driverProfilePicUrl,
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, -40],
                className: "driver-marker-icon",
              })
            : null;

          driverMarker = icon
            ? L.marker([lat, lng], { icon })
            : L.marker([lat, lng]);

          driverMarker.addTo(map);
        } else {
          driverMarker.setLatLng([lat, lng]);
        }

        map.setView([lat, lng], 16);
      },
      (error) => {
        console.error("Geolocation watchPosition error:", error.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );
  } else if (props.useGeolocation) {
    console.warn("Geolocation is not supported by this browser.");
  }
});

// Watch for changes to markerPosition prop to update driver marker location
watch(
  () => props.markerPosition,
  (newPos) => {
    if (!newPos) return;

    if (!driverMarker) {
      const icon = props.driverProfilePicUrl
        ? L.icon({
            iconUrl: props.driverProfilePicUrl,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
            className: "driver-marker-icon",
          })
        : null;

      driverMarker = icon ? L.marker(newPos, { icon }) : L.marker(newPos);

      driverMarker.addTo(map);
    } else {
      driverMarker.setLatLng(newPos);
    }

    map.setView(newPos, map.getZoom());
  }
);

onBeforeUnmount(() => {
  if (geoWatchId !== null) {
    navigator.geolocation.clearWatch(geoWatchId);
  }
  if (map) {
    map.remove();
  }
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 400px;
  border: 1px solid #ccc;
  z-index: 0;
}

/* Make the driver profile picture marker circular with border and shadow */
.driver-marker-icon img {
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}
</style>
