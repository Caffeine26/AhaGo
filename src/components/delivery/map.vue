<template>
  <div class="map-container" ref="mapElement"></div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';

const props = defineProps({
  driverProfilePicUrl: String,
  useGeolocation: Boolean,
  routePoints: Array, // [{lat, lng}, {lat, lng}, ...]
});

const emit = defineEmits(["location-updated"]);

const mapElement = ref(null);
let map = null;
let driverMarker = null;
let routeRenderer = null;
let geoWatchId = null;

const fallbackCoords = { lat: 11.5587, lng: 104.9174 };

function loadGoogleMaps() {
  return new Promise((resolve, reject) => {
    if (window.google?.maps) return resolve(window.google);
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA68FNc7213c8aFqrpOVjtDYW1Y_0Olpvw`;
    script.async = true;
    script.onload = () => resolve(window.google);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function drawRoute(google, points) {
  if (!points || points.length < 2) return;

  const service = new google.maps.DirectionsService();
  if (!routeRenderer) {
    routeRenderer = new google.maps.DirectionsRenderer({ map });
  }

  service.route(
    {
      origin: points[0],
      destination: points[points.length - 1],
      waypoints: points.slice(1, -1).map(loc => ({ location: loc })),
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === "OK") {
        routeRenderer.setDirections(result);
      } else {
        console.warn("Directions request failed:", status);
      }
    }
  );
}

function initMap(google, coords) {
  map = new google.maps.Map(mapElement.value, {
    center: coords,
    zoom: 16,
  });

driverMarker = new google.maps.Marker({
  position: coords,
  map,
  icon: {
    url: props.driverProfilePicUrl || "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    scaledSize: new google.maps.Size(40, 40), // Resize
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(20, 20),
  },
});

}

function updateDriverLocation(position) {
  const coords = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };

  if (driverMarker) driverMarker.setPosition(coords);
  if (map) map.panTo(coords);
emit("update:driver-location", coords);
}

onMounted(async () => {
  const google = await loadGoogleMaps();
  initMap(google, fallbackCoords);

  if (props.useGeolocation && navigator.geolocation) {
    geoWatchId = navigator.geolocation.watchPosition(updateDriverLocation);
  }

  if (props.routePoints?.length >= 2) {
    drawRoute(google, props.routePoints);
  }
});

onBeforeUnmount(() => {
  if (geoWatchId) navigator.geolocation.clearWatch(geoWatchId);
});

watch(() => props.routePoints, (newVal) => {
  if (window.google && newVal?.length >= 2) {
    console.log("Route points updated:", newVal);
    drawRoute(window.google, newVal);
  }
}, { deep: true });
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 400px;
}
</style>
