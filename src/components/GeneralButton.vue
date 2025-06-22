<template>
    <button class="container" :style="{ backgroundColor: btnColor }" :type="type" @click="$emit('click')">
        <span v-if="imgUrl">
            <img id="imgUrl" v-bind:src="imgUrl" alt="image">
        </span>
        <span :style="{ color: titleColor }">{{ title }}</span>
    </button>
</template>

<script>
export default {
    props: {
        imgUrl: String,
        title: {
            type: String,
            required: true
        },
        btnColor: String,
        titleColor: String,type: {
        type: String,
        default: 'button', 
        },
    },
    data() {
        return {
            // imgUrl: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0xOSAxMi45OThoLTZ2NmgtMnYtNkg1di0yaDZ2LTZoMnY2aDZ6Ii8+PC9zdmc+",
        }
    }
}
</script>

<style scoped>
.container{
    background-color: aqua;
    width: fit-content;
    padding: 10px 16px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Raleway';
    font-weight: 500;
    margin: 10px;
    cursor: pointer;
    border: none;
    font-size: 16px;
}
</style>