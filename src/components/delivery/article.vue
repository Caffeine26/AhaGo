<template>
  <div class="article">
    <div class="left">
      <Title
        class="title"
        title='Be a delivery driver using <span style="color: #9A0404;">AhaGo</span>'
      />
      <Text
  text='Join <span style="color: #9A0404;">AhaGo</span> and become a vital part of our growing delivery network. As an <span style="color: #9A0404;">AhaGo</span> delivery driver, you’ll enjoy the freedom to choose your own schedule, earn competitive pay, and bring smiles to customers by delivering their favorite meals and essential items. Whether you&apos;re looking for a full-time opportunity or a part-time hustle, <span style="color: #9A0404;">AhaGo</span> gives you the tools, training, and support you need to succeed on the road. All you need is a valid driver’s license, a smartphone, and a reliable vehicle to get started. Sign up today and start earning with flexibility and purpose!'
/>

    </div>
    <img src="@/assets/delivery/images/image1.png" alt="Account" />
  </div>
</template>
<script>
import Text from "@/components/delivery/text.vue";
import Title from "@/components/delivery/title.vue";
export default {
  components: {
    Title,
    Text,
  },
};
</script>

<style scoped>
.article {
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
}
.left {
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 30px;
}
.title {
  width: 600px;
}
</style>
