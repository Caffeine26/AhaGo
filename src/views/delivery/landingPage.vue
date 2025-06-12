<template>
  <div class="app">
    <Banner class="banner" imgSrc="../src/assets/delivery/images/image2.png">
      <div class="top">
        <p class="ban">
          Sign up to deliver with <span style="color: #9a0404">AhaGo</span>
        </p>
        <p class="ital">Own your time</p>
      </div>
      <div class="bottom">
        <button type="button" class="button">Get Started</button>
        <button type="button" class="link">Access your account</button>
      </div>
    </Banner>
    <div class="containerApp">
      <Article />
        <Title :title="button13?.name" />
      <Text v-if="button13?.text" :text="button13?.text" />

      <div  v-if="button13?.descriptions?.length">
        <div class="rowApp">
          <Description
            v-for="(desc, i) in button13.descriptions"
            :key="i"
            :svg="iconMap[desc.svg]"
            :SectionTitle="desc.title"
            :text="desc.text"
          />
      </div>
      </div>
      <Title title="How food delivery driving works" />
      <Text
        text="Accept orders via the AhaGo Driver App, pick up meals from restaurants, and deliver them to customers quickly and professionally. It's simple, and every delivery adds to your income."
      />
      <Timeline />
       <Title :title="button14?.name" />
      <Text v-if="button14?.text" :text="button14?.text" />

      <div  v-if="button14?.descriptions?.length">
        <div class="rowApp">
          <Description
            v-for="(desc, i) in button14.descriptions"
            :key="i"
            :svg="iconMap[desc.svg]"
            :SectionTitle="desc.title"
            :text="desc.text"
          />
      </div>
      </div>

      <MapFrame />
    </div>
  </div>
</template>

<script>
import { useDriverStore } from '@/stores/driverStore'
import Banner from "@/components/all/banner.vue";
import Article from "@/components/delivery/article.vue";
import Description from "@/components/delivery/description.vue";
import MapFrame from "@/components/delivery/mapFrame.vue";
import Text from "@/components/delivery/text.vue";
import Timeline from "@/components/delivery/timeline.vue";
import Title from "@/components/delivery/title.vue";
import key from "@/assets/delivery/icons/key.svg";
import cash from "@/assets/delivery/icons/cash.svg";
import app from "@/assets/delivery/icons/app.svg";
import rickshaw from "@/assets/delivery/icons/rickshaw.svg";
import tuktuk from "@/assets/delivery/icons/tuktuk.svg";
import motor from "@/assets/delivery/icons/motor.svg";

export default {
  components: {
    Banner,
    Description,
    Title,
    Text,
    Timeline,
    MapFrame,
    Article,
  },
  data() {
    return {
      button13: null, 
      button14: null,
      key,
      cash,
      app,
      rickshaw,
      tuktuk,
      motor,
    };
  },
  computed: {
    iconMap() {
      return {
        key,
        cash,
        app,
        rickshaw,
        tuktuk,
        motor,
      };
    }
  },
  async mounted() {
    const store = useDriverStore();
    await store.fetchSections();
    await store.fetchButtons();

    // Find the button with driver_button id 13 from the fetched sections
    this.button13 = store.buttons.find(button => button.id === 13);
    this.button14 = store.buttons.find(button => button.id === 14);
    // Set the selectedButton to the button with driver_button id 13
    if (!this.button13) console.error('Button with ID 13 not found');
    if (!this.button14) console.error('Button with ID 14 not found');
  }
}
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
.containerApp {
  padding: 80px 50px;
  gap: 40px;
  display: flex;
  flex-direction: column;
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
  font-weight: 200;
}
.rowApp {
  display: flex;
  flex-direction: row;
  gap: 60px;
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
.link {
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
</style>
