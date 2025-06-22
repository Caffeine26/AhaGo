<template>
  <div class="map-container" ref="mapElement"></div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  driverProfilePicUrl: String,
  useGeolocation: Boolean,
  routePoints: Array,
  enableClickSelection: Boolean,
})

const emit = defineEmits(["location-updated", "map-clicked"])

const mapElement = ref(null)
let map = null
let driverMarker = null
let routeRenderer = null
let geoWatchId = null
let clickedMarker = null

const fallbackCoords = { lat: 11.5587, lng: 104.9174 }

function loadGoogleMaps() {
  return new Promise((resolve, reject) => {
    if (window.google?.maps) return resolve(window.google)
    const script = document.createElement("script")
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC0VVNQgbQMrubye9JTzDfEvKjC69opu9I"
    script.async = true
    script.defer = true
    script.onload = () => resolve(window.google)
    script.onerror = reject
    document.head.appendChild(script)
  })
}

function drawRoute(google, points) {
  if (!points || points.length < 2) return

  const service = new google.maps.DirectionsService()
  if (!routeRenderer) {
    routeRenderer = new google.maps.DirectionsRenderer({ map })
  }

  service.route(
    {
      origin: points[0],
      destination: points[points.length - 1],
      waypoints: points.slice(1, -1).map((loc) => ({ location: loc })),
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === "OK") {
        routeRenderer.setDirections(result)
      } else {
        console.warn("Directions request failed:", status)
      }
    }
  )
}

function initMap(google, coords) {
  map = new google.maps.Map(mapElement.value, {
    center: coords,
    zoom: 16,
  })

  driverMarker = new google.maps.Marker({
    position: coords,
    map,
    icon: {
      url: props.driverProfilePicUrl || "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      scaledSize: new google.maps.Size(40, 40),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(20, 20),
    },
  })

  if (props.enableClickSelection) {
    map.addListener("click", (e) => {
      const coords = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      }

      // Hide driverMarker when user clicks new location
      if (driverMarker) {
        driverMarker.setMap(null)
        driverMarker = null
      }

      if (!clickedMarker) {
        clickedMarker = new google.maps.Marker({ map })
      }
      clickedMarker.setPosition(coords)
      map.panTo(coords)

      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({ location: coords }, (results, status) => {
        const address = status === "OK" && results[0] ? results[0].formatted_address : ""
        emit("map-clicked", { coords, address })
      })
    })
  }
}

function updateDriverLocation(position) {
  const coords = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  }

  if (driverMarker) driverMarker.setPosition(coords)
  if (map) map.panTo(coords)

  emit("location-updated", coords)
}

onMounted(async () => {
  const google = await loadGoogleMaps()
  initMap(google, fallbackCoords)

  if (props.useGeolocation && navigator.geolocation) {
    geoWatchId = navigator.geolocation.watchPosition(updateDriverLocation)
  }

  if (props.routePoints?.length >= 2) {
    drawRoute(google, props.routePoints)
  }
})

onBeforeUnmount(() => {
  if (geoWatchId) navigator.geolocation.clearWatch(geoWatchId)
})

watch(
  () => props.routePoints,
  (newVal) => {
    if (window.google && newVal?.length >= 2) {
      drawRoute(window.google, newVal)
    }
  },
  { deep: true }
)
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 400px;
}
</style>
