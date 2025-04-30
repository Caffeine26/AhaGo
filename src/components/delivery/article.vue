<template>
    <div class="article">
        <div class="left">
            <Title class="title" title='Be a delivery driver using <span style="color: red;">AhaGo</span>'/>
            <Text text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."/>
        </div>
        <img src="@/assets/delivery/image.png" alt="Account" />
      </div>
</template>
<script>
import Title from '@/components/delivery/title.vue';
import Text from '@/components/delivery/text.vue'
export default {
    components: {
        Title,
        Text
    }
}
</script>

<style scoped>
.article {
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.left {
    display: flex;
    flex-direction: column;
    width: 50%;
}
</style>
