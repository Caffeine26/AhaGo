<template>
  <div class="profile">
    <SideBar defaultActive="Edit Profile" />
    <div class="container">
      <Title class="title" title="Edit Profile" />
      <div class="content">
        <div class="image">
          <img class="pic" src="@/assets/delivery/images/1.png"/>
        <button type="button">Upload new photo</button>
        </div>
        <Box class="box">
          <Text text="Personal Information"/>
          <div class="input">
            <InputText class="fname" label="Name" placeholder="Enter your name" />
            <InputText class="lname" label="Name" placeholder="Enter your name" />
          </div>
          <div class="input">
            <InputText class="email" label="Email Address" placeholder="Enter your namefffffff" />
            <InputText class="phone" label="Name" placeholder="Enter your name" />
          </div>
          <div class="input">
            <InputText class="address" label="Name" placeholder="Enter your name" />
          </div>
        </Box>
      </div>
    </div>
  </div>
</template>

<script>
import Picframe from "@/components/delivery/picframe.vue";
import SideBar from "@/components/delivery/sideBar.vue";
import Title from "@/components/delivery/title.vue";
import Box from "@/components/delivery/box.vue";
import Text from "@/components/delivery/text.vue";
import InputText from "@/components/all/inputText.vue";
export default {
  name: "ProfilePage",
  components: {
    SideBar,
    Title,
    Picframe,
    Box,
    Text,
    InputText,
  },
};
</script>

<style scoped>
.profile {
  display: flex;
}
.container {
  display: flex;
  flex-direction: column;
  padding: 80px;
  gap: 20px;
}
.title {
  font-size: 40px;
  font-weight: 600;
}
.content {
  flex-direction: column;
  display: flex;
  padding: 20px;
  gap: 20px;
}
.pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.image {
  display: flex;
  align-items: center;
  gap: 30px;
}
.box {
  width: 120%;
}
.input {
  width: 100%;
  display: flex;
  /* gap: 80px; */
  justify-content: space-between;
}
.email {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px,1fr));
}
.address {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1fr,1fr));

}
</style>
