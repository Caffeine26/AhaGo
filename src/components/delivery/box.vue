<template>
    <div class="box">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Box',
}
</script>
<style scoped>
.box {
    /* width: 150%; */
    padding: 20px;
    border-radius: 20px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
    border: 1px solid black;
    color: black;
}
</style>