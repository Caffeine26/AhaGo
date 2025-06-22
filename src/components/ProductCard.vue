<template>
    
    <div class="card">
        <RouterLink :to="'/owner/' + restId + '/menu/' + itemId">
            <img id="dishImg" :src="imageSrc" alt="Dish Image">
        </RouterLink>
        <div class="dishInfo">
            <div class="title">
                <span>{{ title }}</span>
                <span><b>${{ price }}</b></span>
            </div>
            <div class="description">
                {{ description }}
            </div>

            <div class="status">
                <div>
                    <StatusBox :status-id="statusId"></StatusBox>
                </div>

                <RouterLink :to="'/owner/'+ restId +'/menu/edit/' + itemId">
                    <div class="edit">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 21h16M5.666 13.187A2.28 2.28 0 0 0 5 14.797V18h3.223c.604 0 1.183-.24 1.61-.668l9.5-9.505a2.28 2.28 0 0 0 0-3.22l-.938-.94a2.277 2.277 0 0 0-3.222.001z"/></svg>
                        </span>
                        <span>Edit</span>
                    </div>
                </RouterLink>
                
            </div>
        </div>
        
    </div>
    
</template>

<script>
import StatusBox from './StatusBox.vue';

export default {
    components: {
        StatusBox,
    },
    props: {
        itemId: Number,
        imageSrc: String,
        name: String,
        price: String,
        desc: String,
        statusId: Number,
        restId: Number
    },
    
}
</script>

<style scoped>
.card{
    width: 320px;
    height: 380px;
    border-radius: 30px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    margin: 50px;
    font-family: 'Raleway';
    display: flex;
    flex-direction: column;
    align-items: center;
}
#dishImg{
    width: 304px;
    height: 203px;
    border-radius: 20px;
    margin-top: 10px;
}
.title{
    display: flex;
    justify-content: space-between;
    font-size: 20px;
}
.description{
    text-align: left;
    margin-top: 8px;
    margin-bottom: 20px;
    font-size: 14px;
}
.edit{
    color: red;
    display: flex;
    align-items: center;
    font-weight:bold;
    font-size: 14px;
    cursor: pointer;
}
.status{
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* margin-top: 8px; */
}
.dishInfo{
    padding: 15px 24px 0px 24px;
}
</style>