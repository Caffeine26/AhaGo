<template>
    <div :class="{ box: true, open: isOpen }">
        <img :src="imageSrc" alt="photo" id="market">
        <h2 @click="isOpen = !isOpen" id="title">{{ title }}</h2>
        <div v-if="isOpen" >{{ content }}</div>
    </div>
</template>

<script>
export default {
    props: {
        imageSrc: String,
        title: String,
        content: String,
    },
    data() {
        return {
            isOpen: false,
        }
    }

}
</script>

<style scoped>
.box {
    width: 310px;
    height:fit-content;
    border: 2px solid #959595;
    border-radius: 20px;
    padding: 40px;
    margin: 40px;
    font-family: 'Raleway';
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.box div {
    margin-top: 20px;
    text-align: justify;
    transition: all 3s ease;
}
#market {
    width: 197px;
    margin-bottom: 20px;
}
.open {
    border-color: #D90000;
}
#title {
    text-align: center;
}
</style>