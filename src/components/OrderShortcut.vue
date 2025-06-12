<template>
    <div class="container" :style="`background-color: ${color}`">
        <div class="mini-container">
            <img :src="imageSrc" alt="incoming_icon">
            <p class="title">{{ title }}</p>
        </div>
        <div id="goto">{{ goto }}</div>
        
    </div>
</template>

<script>
export default {
    props: {
        imageSrc: String,
        title: String,
        goto: String,
        color: String
    },
}
</script>

<style scoped>
.container {
    background-color: #292929;
    width: 400px;
    height: 140px;
    border-radius: 10px;
    color: white;
    font-family: 'Raleway';
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0px 40px;

}
.container:hover {
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.6);
    cursor: pointer;
}
.mini-container {
    display: flex;
    align-items: center;
}
.title {
    font-size: 32px;
    font-weight: 500;
    margin-left: 16px;
    align-self: flex-start;
}
#goto {
    align-self: flex-end;
}
#goto:hover {
    text-decoration: underline;
}
</style>