<template>
    <div id="container">
        <img :src="imageSrc" alt="PLEA" id="photo">
        <div id="description">
            <div id="dish">
                <div id="name">{{ name }}</div>
                <div id="price">${{ price }}</div>
            </div>
            <button id="view">View</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        imageSrc: String,
        name: String,
        price: Number
    }
}
</script>

<style>
#photo {
    width: 230px;
    height: 230px;
    border-radius: 10px;
}
#name {
    width: 150px;
    font-family: 'Raleway';
    font-size: 36px;
    font-weight: 600;
    color: white;
    text-align: left;
}
#price {
    font-family: 'Raleway';
    font-size: 32px;
    font-weight: 600;
    color: #B0B0B0;
}
#view {
    width:fit-content;
    margin-top: 24px;
    font-family: 'Raleway';
    font-size: medium;
    border: 1px solid white;
    padding: 10px 15px;
    border-radius: 50px;
    color: white;
    background-color: #292929;
}
#view:hover {
    background-color: #B0B0B0;
    cursor: pointer;
}
#dish {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

}
#description {
    display: flex;
    flex-direction: column;
    margin-left: 36px;
}
#container {
    display: flex;
    border: 1px dashed white;
    border-radius: 30px;
    width: fit-content;
    padding: 20px;
    background-color: #292929;
    margin: 16px;
}
</style>