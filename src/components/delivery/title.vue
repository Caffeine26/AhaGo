<template>
<div class="title" v-html="title"></div>
</template>
<script>
export default {
    name: 'title',
    props: {
        title: String
    }
}
</script>
<style scoped>
.title {
    font-size: 48px;
}</style>