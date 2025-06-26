<template>
  <div class="map-container" ref="mapElement"></div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from "vue";

const props = defineProps({
  driverProfilePicUrl: String,
  useGeolocation: Boolean,
  routePoints: Array,
  enableClickSelection: Boolean,
});

const emit = defineEmits(["location-updated", "map-clicked"]);

const mapElement = ref(null);
let map = null;
let driverMarker = null;
let routeRenderer = null;
let geoWatchId = null;
let clickedMarker = null;
let animationTimeoutId = null;

const fallbackCoords = { lat: 11.5587, lng: 104.9174 }; // Phnom Penh fallback

function loadGoogleMaps() {
  return new Promise((resolve, reject) => {
    if (window.google?.maps) return resolve(window.google);
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyA68FNc7213c8aFqrpOVjtDYW1Y_0Olpvw";
    script.async = true;
    script.onload = () => resolve(window.google);
    script.onerror = reject;
    document.head.appendChild(script);
  });
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
      url:
        props.driverProfilePicUrl ||
        "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      scaledSize: new google.maps.Size(40, 40),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(20, 20),
    },
  });

  if (props.enableClickSelection) {
    map.addListener("click", (e) => {
      const coords = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      if (driverMarker) {
        driverMarker.setMap(null);
        driverMarker = null;
      }
      if (!clickedMarker) {
        clickedMarker = new google.maps.Marker({ map });
      }
      clickedMarker.setPosition(coords);
      map.panTo(coords);

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: coords }, (results, status) => {
        const resolvedAddress =
          status === "OK" && results[0] ? results[0].formatted_address : "";

        const plusCode = results.find(
          (r) => r.plus_code || (r.types && r.types.includes("plus_code"))
        )?.plus_code?.global_code || "";

        emit("map-clicked", {
          coords,
          address: resolvedAddress,
          plusCode,
        });
      });
    });
  }
}

function updateDriverLocation(position) {
  const coords = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
  if (driverMarker) driverMarker.setPosition(coords);
  if (map) map.panTo(coords);

  emit("location-updated", coords);
}

function drawRoute(google, points) {
  if (!points || points.length < 2) return;

  if (routeRenderer) routeRenderer.setMap(null);

  routeRenderer = new google.maps.DirectionsRenderer({ map });
  const directionsService = new google.maps.DirectionsService();

  directionsService.route(
    {
      origin: points[0],
      destination: points[points.length - 1],
      waypoints: points.slice(1, -1).map((loc) => ({ location: loc })),
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

function animateMarkerAlongPath(path, speed = 30) {
  return new Promise((resolve) => {
    if (!path || path.length < 2) return resolve();

    let index = 0;

    function move() {
      if (index >= path.length) {
        resolve(path[path.length - 1]);
        return;
      }

      driverMarker.setPosition(path[index]);
      map.panTo(path[index]);

      index++;
      animationTimeoutId = setTimeout(move, speed);
    }

    move();
  });
}

function getRoutePath(google, points) {
  return new Promise((resolve, reject) => {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: points[0],
        destination: points[points.length - 1],
        waypoints: points.slice(1, -1).map((loc) => ({ location: loc })),
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          const route = result.routes[0];
          let path = [];
          route.legs.forEach((leg) => {
            leg.steps.forEach((step) => {
              path = path.concat(step.path);
            });
          });
          resolve(path);
        } else {
          reject(status);
        }
      }
    );
  });
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
  if (animationTimeoutId) clearTimeout(animationTimeoutId);
});

watch(
  () => props.routePoints,
  async (newPoints) => {
    if (!newPoints || newPoints.length < 2) return;

    if (animationTimeoutId) clearTimeout(animationTimeoutId);

    try {
      const detailedPath = await getRoutePath(window.google, newPoints);
      drawRoute(window.google, newPoints);

      const finalPosition = await animateMarkerAlongPath(detailedPath, 30);

      emit("location-updated", {
        lat: finalPosition.lat(),
        lng: finalPosition.lng(),
      });
    } catch (error) {
      console.warn("Failed to animate marker:", error);
    }
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 400px;
}
</style>
