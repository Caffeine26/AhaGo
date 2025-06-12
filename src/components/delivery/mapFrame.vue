<template>
  <div class="frame">
    <div class="text">Check out our partners from all over the country</div>
    <Map id="map" :useGeolocation="true" />
  </div>
</template>
<script>
import Map from "@/components/delivery/map.vue";
export default {
  components: { Map },
};
</script>
<style scoped>
.frame {
  background-color: #9a0404;
  display: flex;
}
.text {
  width: 800px;
  display: flex;
  color: white;
  font-size: 64px;
  padding: 40px 60px;
  align-items: center;
}
</style>
