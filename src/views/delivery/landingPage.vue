<template>
  <div class="app">
    <Banner imgSrc="../src/assets/delivery/images/image2.png">
      <div class="top">
        <p class="ban">
          Sign up to deliver with <span style="color: #9a0404">AhaGo</span>
        </p>
        <p class="ital">Own your time</p>
      </div>
    </Banner>
    <div class="containerApp">
      <Article />
      <Title title="Get paid to deliver"></Title>
      <div class="rowApp">
        <Description
          :svg="key"
          :SectionTitle="'Your Own Vehicle'"
          :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'"
        />
        <Description
          :svg="cash"
          :SectionTitle="'Get Paid Quickly'"
          :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'"
        />
        <Description
          :svg="app"
          :SectionTitle="'Track Your Earnings'"
          :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'"
        />
      </div>
      <Title title="How food delivery driving works" />
      <Text
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
      />
      <Timeline />
      <Title
        title='What you need to become a delivery driver for <span style="color: #9A0404;">AhaGo</span>'
      />
      <div class="rowApp">
        <Description
          :svg="rickshaw"
          :SectionTitle="'Delivery By Rickshaw'"
          :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'"
        />
        <Description
          :svg="tuktuk"
          :SectionTitle="'Delivery By Tuktuk'"
          :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'"
        />
        <Description
          :svg="motor"
          :SectionTitle="'Delivery By Motorbike'"
          :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'"
        />
      </div>
      <MapFrame />
    </div>
  </div>
</template>

<script>
import Banner from "@/components/all/banner.vue";
import Article from "@/components/delivery/article.vue";
import Button from "@/components/delivery/button.vue";
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
    Button,
    Description,
    Title,
    Text,
    Timeline,
    MapFrame,
    Article,
  },
  data() {
    return {
      key,
      cash,
      app,
      rickshaw,
      tuktuk,
      motor,
    };
  },
};
</script>

<style>
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
  gap: 10px;
}
.ban {
  color: white;
  font-size: 64px;
}
.ital {
  font-style: italic;
  color: white;
  font-size: 32px;
}
.rowApp {
  display: flex;
  flex-direction: row;
  gap: 60px;
}
</style>
