<template>
    <div class="menuContainer">
        <div class="menuBanner">
            <div class="addContainer">
                <div class="title">{{ name }} Menu</div>
            </div>
            
            <div class="chosenCateg">
                <img :src="iconUrl" alt="+">
                <span>{{ title }}</span>
            </div>
            
        </div>
    </div>



</template>

<script>
export default {
    props: {
        title: String,
        iconUrl: String
    },
    data() {
        return {
            chosen: false,
            chosenIndex: 0,
            name: 'Malis Restaurant',
            add: 'src/assets/owner/svg/additem.svg'
        }
    }
}
</script>

<style scoped>
.menuContainer {
    background-color: #292929;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    
}
.menuBanner {
    background-color: #292929;
    /* width: 100%; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 200px;
}
.title {
    color: white;
    font-family: 'Playfair Display';
    font-size: 48px;
    margin: 50px 0 50px 0;
}
.chosenCateg {
    width: fit-content;
    font-family: 'Raleway';
    font-size: 24px;
    font-weight: 600;
    color: #000000;
    background-color: white;
    border-radius: 50px 50px 0 0;
    padding: 30px 40px;
    display: flex;
}
.chosenCateg span {
    margin-left: 8px;
}
.addContainer {
    display: flex;
    align-items: center;
}

</style>