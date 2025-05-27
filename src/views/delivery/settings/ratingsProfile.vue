<template>
  <div class="customer">
    <div class="container">
      <Title class="title" title="Customer Satisfaction" />
      <div class="content">
        <Text text="Overall ratings from customers" />
        <Box class="box">
          <div class="left">
            <div class="up">
              <div class="row">
                <Title title="4.4" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="gold"
                    d="M21.12 9.88a.74.74 0 0 0-.6-.51l-5.42-.79l-2.43-4.91a.78.78 0 0 0-1.34 0L8.9 8.58l-5.42.79a.74.74 0 0 0-.6.51a.75.75 0 0 0 .18.77L7 14.47l-.93 5.4a.76.76 0 0 0 .3.74a.75.75 0 0 0 .79.05L12 18.11l4.85 2.55a.73.73 0 0 0 .35.09a.8.8 0 0 0 .44-.14a.76.76 0 0 0 .3-.74l-.94-5.4l3.93-3.82a.75.75 0 0 0 .19-.77"
                  />
                </svg>
                <div class="by">based on 98 ratings</div>
              </div>
            </div>
            <div class="down"></div>
          </div>
          <div class="right">
            <ratingBreakdown />
          </div>
        </Box>
      </div>
      <div class="content">
        <Text text="Overall ratings from restaurants" />
        <Box>
          <div class="left">
            <div class="up">
              <div class="row">
                <Title title="4.4" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="gold"
                    d="M21.12 9.88a.74.74 0 0 0-.6-.51l-5.42-.79l-2.43-4.91a.78.78 0 0 0-1.34 0L8.9 8.58l-5.42.79a.74.74 0 0 0-.6.51a.75.75 0 0 0 .18.77L7 14.47l-.93 5.4a.76.76 0 0 0 .3.74a.75.75 0 0 0 .79.05L12 18.11l4.85 2.55a.73.73 0 0 0 .35.09a.8.8 0 0 0 .44-.14a.76.76 0 0 0 .3-.74l-.94-5.4l3.93-3.82a.75.75 0 0 0 .19-.77"
                  />
                </svg>
                <div class="by">based on 98 ratings</div>
              </div>
            </div>
            <div class="down"></div>
          </div>
          <div class="right">
            <ratingBreakdown />
          </div>
        </Box>
      </div>
    </div>
  </div>
</template>
<script setup>
import Title from "@/components/delivery/title.vue";
import Text from "@/components/delivery/text.vue";
import Box from "@/components/delivery/box.vue";
import ratingBreakdown from "@/components/delivery/ratingBreakdown.vue";
</script>
<style scoped>
.customer {
  display: flex;
}
.container {
  padding: 80px;
}
.title {
  font-size: 40px;
  font-weight: 600;
}
.row {
  display: flex;
  align-items: center;
  gap: 20px;
}
.content {
  margin-bottom: 20px;
}
.box {
  display: flex;
  justify-content: space-between;
}
.left {
  display: flex;
}
</style>
