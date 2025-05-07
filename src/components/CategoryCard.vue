<template>
    <div class="card">
        <img id="dishImg" v-bind:src="imgUrl" alt="image">

        <div class="content">
            <div id="category">{{ menuItem }}</div>
            <a href="">Go to Menu</a>
        </div>
    </div>
</template>

<script>
export default{
    data() {
        return {
            menuItem: "Breakfast",
            imgUrl: 'https://malis.thalias.com.kh/wp-content/uploads/2024/08/MicrosoftTeams-image-3-scaled.jpg',
        }
    }
}
</script>

<style scoped>
.card{
    width:fit-content;
    height: 250px;
    background-color: #292929;
    border-radius: 30px 0 30px 30px;
    font-family: 'Raleway';
    display: flex;
    align-items: center;

}
#dishImg{
    width: 216px;
    height: 216px;
    border-radius: 20px;
    margin: 15px;
}
.content{
    padding-left: 16px;
    padding-right: 32px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.content a{
    color: white;
    text-decoration: none;
    font-weight:600;
    font-size: 16px;
}
#category {
    color: white;
    font-weight:600;
    font-size: 40px;
    margin-bottom: 8px;
    /* text-shadow: 0 2px 1px white; */
}
</style>