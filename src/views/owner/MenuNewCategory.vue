<template>
<Header></Header>

<Header2
title="Restaurant"
it1="Home"
it2="Orders"
it3="Menu"
it4="Analytics"
it5="Profile"
></Header2>

<CategoryBannerV2
:title-header= "`${rest} Menu`"
:given-index="categs.length-1"
:titles="categs"
></CategoryBannerV2>

<div class="somecontainer">
    <div class="grid-container">
        <div>Category Name:</div>
        <div>
            <input 
            v-model="name"
            type="text"
            placeholder="Enter name"
            >
        </div>

        <div>Description (Optional):</div>
        <div>
            <textarea 
            v-model="description"
            type="text" 
            id="descInput" 
            placeholder="Write item description"></textarea>
        </div>
    </div>

    <div class="btns">
        <button id="cancel">Cancel</button>
        <button 
        @click="getInfo"
        id="save">Create</button>
        
    </div>
</div>




<AppFooter></AppFooter>
</template>

<script>
import Header from '@/components/all/header.vue';
import AppFooter from '@/components/AppFooter.vue';
import CategoryBannerV2 from '@/components/CategoryBannerV2.vue';
import Header2 from '@/components/delivery/header2.vue';

export default {
    components: {
        Header,
        Header2,
        CategoryBannerV2,
        AppFooter
    },
    data() {
        return {
            name: '',
            description: '',

            rest: 'Malis Restaurant',
            plea: 'src/assets/owner/img/pleasachko.jpg',
            edit: 'src/assets/owner/svg/edit.svg',
            delete: 'src/assets/owner/svg/delete.svg',

            categs: [
                'All items', 'A La Carte', 'Breakfast', 'Business Lunch', 'New'
            ]
        }
    },
    }
</script>

<style scoped>
.somecontainer {
    justify-self: center;
    margin: 50px 0 50px 0;
    display: flex;
    flex-direction: column;
}
.grid-container {
    width: fit-content;
    display: grid;
    grid-template-columns: 200px 700px;
    grid-template-rows: auto auto;
    font-size: 24px;
    font-family: 'Raleway';
    margin-left: 56px;
}
.grid-container :nth-child(even) {
    text-align: left;
    margin-bottom: 16px;
    
}
.grid-container :nth-child(odd) {
    text-align: left;
    padding-top: 10px;
    margin-top: 10px;
    
}
.grid-container textarea {
    height: 200px;
}
.grid-container input, textarea {
    font-size: 24px;
    padding: 15px 15px;
    font-family: 'Raleway';
    border-radius: 10px;
    border: 2px solid #C8C3C3;
}
.grid-container input:focus, textarea:focus {
    border:2px solid #D90000;
    outline: none;
    box-shadow: none;
}
#save {
    color: white;
    background-color: #D90000;
    padding: 16px 24px;
    border-radius: 18px;
    border: none;
    font-size: large;
    font-weight: 600;
}
#save:hover {
    background-color: #af0202;
    cursor: pointer;
    
}
#cancel {
    border: none;
    font-size: large;
    font-weight: 500;
    background-color: white;
    cursor: pointer;
}

.btns {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 56px;
    margin-bottom: 56px;
}
.btns button {
    margin-left: 24px;
}
</style>