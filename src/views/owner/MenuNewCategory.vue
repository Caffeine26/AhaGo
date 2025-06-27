<template>

<CategoryBannerV2
:title-header= "`${rest} Menu`"
:given-index="categories.length-1"
:titles="categories"
:edit-profile="editProfile"
banner-btn="Add Category"
:banner-icon="add"
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
        <button 
        @click="goToPrevPage"
        id="cancel">Cancel</button>
        <button 
        @click="createCategory"
        id="save">Create</button>
        
    </div>
</div>
</template>

<script>
import Header from '@/components/all/header.vue';
import AppFooter from '@/components/AppFooter.vue';
import CategoryBannerV2 from '@/components/CategoryBannerV2.vue';
import Header2 from '@/components/delivery/header2.vue';
import add from '@/assets/owner/svg/add.svg';
import { useRoute } from 'vue-router';
import { useCategoryStore } from '@/stores/categoryStore';
import CategoryService from '@/services/CategoryService';

export default {
    components: {
        Header,
        Header2,
        CategoryBannerV2,
        AppFooter
    },
    created() {
        const route = useRoute()
        this.categoryStore = useCategoryStore()
        this.restId = parseInt(route.params.restId)

        console.log('In menu page, categories=', this.categoryStore.categories)

        this.categoryStore.categories.forEach(element => {
            if (element.restaurant_id === this.restId) {
                this.categories.push(element.name)
            }
        });
        this.categories.push('New')

        console.log('Selected categories=', this.categories)

    },
    methods: {
        goToPrevPage() {
            this.$router.back()
        },
        async createCategory() {
            const newId = this.categoryStore.categories.length +1
            const category = {
                'id': newId,
                'restaurant_id': this.restId,
                'name': this.name,
                'description': this.description
            }
            const res = await CategoryService.create(category)
            console.log('New Category created successfully=', res)
            this.categoryStore.categories.push(category)
            this.$router.back()
        }
    },
    data() {
        return {
            restId: null,
            add: add,
            editProfile: false,
            categories: [],
            categoryStore: null,

            name: '',
            description: '',

            rest: 'Malis Restaurant',
            plea: 'src/assets/owner/img/pleasachko.jpg',
            edit: 'src/assets/owner/svg/edit.svg',
            delete: 'src/assets/owner/svg/delete.svg',

            
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