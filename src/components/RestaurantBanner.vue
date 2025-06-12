<template>
<div class="cover">
    <img :src="imageSrc" alt="MALIS" id="malis">
    <div id="blurBox"></div>
    <div id="blurBox2"></div>
    <div class="center">{{ name }}</div>
    <div id="details">
        <div v-if="address" class="line">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff6f6" d="M10.115 21.811c.606.5 1.238.957 1.885 1.403a27 27 0 0 0 1.885-1.403a28 28 0 0 0 2.853-2.699C18.782 16.877 21 13.637 21 10a9 9 0 1 0-18 0c0 3.637 2.218 6.876 4.262 9.112a28 28 0 0 0 2.853 2.7M12 13.25a3.25 3.25 0 1 1 0-6.5a3.25 3.25 0 0 1 0 6.5"/></svg>
            <p>{{ address }}</p>
        </div>
        <div v-if="openHours" class="line">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#fff6f6" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m0 2a1 1 0 0 1 .993.883L13 7v4.586l2.707 2.707a1 1 0 0 1-1.32 1.497l-.094-.083l-3-3a1 1 0 0 1-.284-.576L11 12V7a1 1 0 0 1 1-1"/></g></svg>            <p>No.136 Norodom Blvd. Phnom Penh</p>
            <p>Opening Hours: {{ openHours }}</p>
        </div>
        <div v-if="reviewCount" class="line">
            <span v-for="rating in ratings">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#f5ec2e" d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"/></svg>
            </span>
            <span>({{ reviewCount }} reviews)</span>
        </div>
    </div>
</div>

</template>

<script>
export default {
    props: {
        imageSrc: String,
        name: String,
        address: String,
        openHours: String,
        ratings: Number,
        reviewCount: Number
    },
    
}
</script>

<style>
#malis {
    height: 525px;
    width: 100vw;
    position: relative;
}
.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 84px;
    font-weight: 800;
    font-family: 'Playfair Display';
    color: white;
}
#blurBox {
    position: absolute;
    bottom: 185px;
    left:0px;
    width: 100vw;
    height: 250px;
    background-color: black;
    opacity: 0.4;
    filter: blur(28px);
}
#blurBox2 {
    position: absolute;
    bottom: 138px;
    left:0px;
    width: 100vw;
    height: 120px;
    background-color: black;
    opacity: 0.4;
    filter: blur(28px);
}
#details {
    position: absolute;
    bottom: 185px;
    left: 50px;
    color: white;
    font-family: 'Raleway';
    font-weight:500;
    font-size: medium;
}
.line {
    display: flex;
    align-items: center;
}
.line p {
    margin-left: 8px;
}
</style>