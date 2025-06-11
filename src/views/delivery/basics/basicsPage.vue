<template>
  <div class="app">
    <Banner class="banner" imgSrc="../src/assets/delivery/images/image3.png">
      <div class="top">
        <p class="ban">
          The basics of delivering with
          <span style="color: #9a0404">AhaGo</span>
        </p>
        <p class="ital">
          Learn the basics on how to start your delivery career with
          <span style="color: #9a0404">AhaGo</span>
        </p>
      </div>
      <div class="bottom">
        <button type="button" class="button">Get Started</button>
        <button type="button" class="button2">
          Already have an account? Sign In
        </button>
      </div>
    </Banner>

    <div class="contain" v-for="(section, index) in sections" :key="index">
      <div class="content">
        <Title :title="section.title" />
        <Text :text="section.text" />
        <Link :text="section.title + ' overview'" :to="section.linkTo" />
        <div class="buttons">
          <Button
            v-for="(btn, idx) in section.buttons.slice(0, 2)"
            :key="idx"
            :imageSrc="btn.imageSrc"
            :name="btn.name"
            :sectionLink="section.linkTo"
            :buttonLink="btn.link"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useDriverStore } from '@/stores/driverStore'
import Banner from "@/components/all/banner.vue";
import Title from "@/components/delivery/title.vue";
import Text from "@/components/delivery/text.vue";
import Link from "@/components/delivery/link.vue";
import Button from "@/components/delivery/button.vue";

const driverStore = useDriverStore()
const { sections } = driverStore

onMounted(() => {
  driverStore.fetchSections()
})
</script>

<style scoped>
body {
  margin: 0;
}
@font-face {
  font-family: "Raleway";
  src: url("@/assets/font/Raleway-VariableFont_wght.ttf") format("truetype");
}

@font-face {
  font-family: "Raleway-Italic";
  src: url("@/assets/font/Raleway-Italic-VariableFont_wght.ttf")
    format("truetype");
  font-style: italic;
}
.app {
  font-family: Raleway;
}
.top {
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
}
.ban {
  color: white;
  font-size: 64px;
  margin-bottom: 0px;
}
.ital {
  font-style: italic;
  color: white;
  font-size: 32px;
  font-weight: 400;
}
.button {
  background-color: #9a0404;
  color: white;
  padding: 10px;
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;
  border: none;
}
.buttons {
  display: flex;
  gap: 40px;
  padding: 0px 20px;
}
.button2 {
  color: white;
  background-color: transparent;
  text-decoration: underline;
  cursor: pointer;
  font-style: italic;
  border: none;
  font-size: 20px;
}
.bottom {
  margin-top: 60px;
  display: flex;
  gap: 20px;
  padding: 0px 20px;
}
.contain {
  display: flex;
  padding: 30px 60px;
}
</style>
