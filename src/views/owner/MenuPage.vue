<template>
<Header></Header>

<OwnerHeader
title="Restaurant"
it1="Home"
it2="Orders"
it3="Transactions"
it4="Menu"
it5="Profile"
></OwnerHeader>

<div class="menuContainer">

    <div class="categoryBanner">
        <CategoryBannerV2
        :title-header= "`${name} Menu`"
        :titles="categories"
        :edit-profile="editProfile"
        banner-btn="Add Category"
        :banner-icon="add"
        @toggle-category="toggleCategoryData"
        ></CategoryBannerV2>
    </div>

    <div class="searchSortContainer">
        <div class="searchContainer">
            <img :src="search" alt="add">
            <input 
            v-model="searchQuery"
            type="text" placeholder="Search items" id="search">
        </div>
        <div class="custom-select">
            <label for="price">Sort By:</label>
            <select name="price" v-model="sortOrder">
                <!-- <option value="0" @click="setSortIndex(0)">Sort By:</option> -->
                <option value="asc">Price (Low-High)</option>
                <option value="desc">Price (High-Low)</option>
            </select>
        </div>

    </div>
    
    <div class="grid-container">
        <ProductCard
        v-for="(item, index) in filteredProducts"
        :key="index"
        :item-id="item.id"
        :image-src="img_url"
        :name="item.name"
        :price="item.price"
        :desc="item.description"
        :status-id="item.available"
        :rest-id="restId"
        ></ProductCard>
    </div>
    
</div>

<RouterLink :to="goToUrl">
    <div class="sticky">
        <button id="addItem">
            <img :src="add" alt="add">
            <span class="text">Add Item</span>
        </button>
    </div>
</RouterLink>


<AppFooter></AppFooter>


</template>

<script>
import Header from '@/components/all/header.vue';
import AppFooter from '@/components/AppFooter.vue';
import CategoryBannerV2 from '@/components/CategoryBannerV2.vue';
import ProductCard from '@/components/ProductCard.vue';

import add from '@/assets/owner/svg/add.svg';
import search from '@/assets/owner/svg/search.svg';
import { useRoute } from 'vue-router';
import { useCategoryStore } from '@/stores/categoryStore';
import OwnerHeader from '@/components/OwnerHeader.vue';

export default {
    components: {
        Header,
        OwnerHeader,
        CategoryBannerV2,
        ProductCard,
        AppFooter
    },
    created() {
        // this.selectedPlates = this.plates
        const route = useRoute()
        this.categoryStore = useCategoryStore()
        this.restId = parseInt(route.params.restId)

        this.plates = this.categoryStore.foodItems
        this.selectedPlates = this.plates

        console.log('In menu page, categories=', this.categoryStore.categories)
        console.log('In menu page, plates=', this.plates)

        this.categories.push('All')
        this.categoryStore.categories.forEach(element => {
            if (element.restaurant_id === this.restId) {
                this.categories.push(element.name)
            }
        });

        console.log('Selected categories=', this.categories)

    },
    computed: {
        goToUrl() {
            return '/owner/' + this.restId + '/menu/createItem'
        },
        filteredProducts() {
            // filter by search
            const filtered = this.selectedPlates.filter(product =>
                                product.name.toLowerCase().includes(this.searchQuery.toLowerCase()))

            // sort by price asc or desc
            return filtered.sort((a,b) => {
                return this.sortOrder === 'asc'
                ? a.price - b.price
                : b.price - a.price
            })
      
        }
    },
    methods: {
        toggleCategoryData(index) {
            this.selectedPlates = []
            if (index === 0) {
                this.selectedPlates = this.plates
            }
            else {
                for (let i=0; i<this.plates.length; i++) {
                    if (this.plates[i].category_id === index) {
                        this.selectedPlates.push(this.plates[i])
                    }
                }
            }
        },
        addCategory() {}
    },
    data() {
        return {
            searchQuery: '',
            sortOrder: 'asc',
            categoryStore: null,
            restId: null,
            categories: [],

            name: 'Malis Restaurant',
            editProfile: false,

            imageSrc: 'https://malis.thalias.com.kh/wp-content/uploads/2024/08/MicrosoftTeams-image-3-scaled.jpg',

            plates: [],
            statusId: 1,
            // plates: [
            //     {
            //         id: 1,
            //         imageSrc: 'https://malis.thalias.com.kh/wp-content/uploads/2024/08/MicrosoftTeams-image-3-scaled.jpg',
            //         name: 'Plear Sach Ko 1',
            //         price: 11,
            //         desc: 'Fine slices of tender beef marinated in a blend of prahok, lemongrass, fresh green peppercorns wo!',
            //         statusId: 1,
            //         categoryId: 1
            //     },
            //     {
            //         id: 2,
            //         imageSrc: 'https://malis.thalias.com.kh/wp-content/uploads/2024/08/MicrosoftTeams-image-3-scaled.jpg',
            //         name: 'Plear Sach Ko 2',
            //         price: 11,
            //         desc: 'Fine slices of tender beef marinated in a blend of prahok, lemongrass, fresh green peppercorns wo!',
            //         statusId: 1,
            //         categoryId: 2
            //     },
            //     {
            //         id: 3,
            //         imageSrc: 'https://malis.thalias.com.kh/wp-content/uploads/2024/08/MicrosoftTeams-image-3-scaled.jpg',
            //         name: 'Plear Sach Ko3',
            //         price: 11,
            //         desc: 'Fine slices of tender beef marinated in a blend of prahok, lemongrass, fresh green peppercorns wo!',
            //         statusId: 1,
            //         categoryId: 3
            //     },
            //     {
            //         id: 4,
            //         imageSrc: 'https://malis.thalias.com.kh/wp-content/uploads/2024/08/MicrosoftTeams-image-3-scaled.jpg',
            //         name: 'Plear Sach Ko4',
            //         price: 11,
            //         desc: 'Fine slices of tender beef marinated in a blend of prahok, lemongrass, fresh green peppercorns wo!',
            //         statusId: 1,
            //         categoryId: 4
            //     },
            //     {
            //         id: 5,
            //         imageSrc: 'https://malis.thalias.com.kh/wp-content/uploads/2024/08/MicrosoftTeams-image-3-scaled.jpg',
            //         name: 'Plear Sach Ko5',
            //         price: 11,
            //         desc: 'Fine slices of tender beef marinated in a blend of prahok, lemongrass, fresh green peppercorns wo!',
            //         statusId: 1,
            //         categoryId: 1
            //     },
            //     {
            //         id: 6,
            //         imageSrc: 'https://malis.thalias.com.kh/wp-content/uploads/2024/08/MicrosoftTeams-image-3-scaled.jpg',
            //         name: 'Plear Sach Ko6',
            //         price: 11,
            //         desc: 'Fine slices of tender beef marinated in a blend of prahok, lemongrass, fresh green peppercorns wo!',
            //         statusId: 1,
            //         categoryId: 1
            //     },
            //     {
            //         id: 7,
            //         imageSrc: 'https://malis.thalias.com.kh/wp-content/uploads/2024/08/MicrosoftTeams-image-3-scaled.jpg',
            //         name: 'Plear Sach Ko7',
            //         price: 11,
            //         desc: 'Fine slices of tender beef marinated in a blend of prahok, lemongrass, fresh green peppercorns wo!',
            //         statusId: 1,
            //         categoryId: 1
            //     },
            //     {
            //         id: 8,
            //         imageSrc: 'https://malis.thalias.com.kh/wp-content/uploads/2024/08/MicrosoftTeams-image-3-scaled.jpg',
            //         name: 'Plear Sach Ko8',
            //         price: 11,
            //         desc: 'Fine slices of tender beef marinated in a blend of prahok, lemongrass, fresh green peppercorns wo!',
            //         statusId: 1,
            //         categoryId: 1
            //     },
            //     {
            //         id: 9,
            //         imageSrc: 'https://malis.thalias.com.kh/wp-content/uploads/2024/08/MicrosoftTeams-image-3-scaled.jpg',
            //         name: 'Plear Sach Ko9',
            //         price: 11,
            //         desc: 'Fine slices of tender beef marinated in a blend of prahok, lemongrass, fresh green peppercorns wo!',
            //         statusId: 1,
            //         categoryId: 3
            //     },
            // ],
            selectedPlates: this.plates,
            categs: [
                'All items',
                'A La Carte',
                'Breakfast',
                'Business Lunch',
                'Highlights',
                'New'
            ],
            add: add,
            search: search
        }
    }
}
</script>

<style scoped>
#title {
    font-family: 'Playfair Display';
    font-size: 32px;
    font-weight: 600;
    margin-top: 40px;
    margin-bottom: 20px;

}
.categoryBanner {
    /* width: 70%; */
    display: flex;
    justify-content: center;
    align-items: center;
}
select {
    font-family: 'Raleway';
    font-size: 18px;
    padding: 10px 20px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: white;
    border-radius: 50px;
}
.custom-select {
    margin-left: 40px;
}

.grid-container {
    width: 70%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
.menuContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}
#addItem {
    background-color: #D90000;

    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 999px;
    overflow: hidden;
    transition: width 0.3s ease;
    width: 44px;
    white-space: nowrap;
    cursor: pointer;
    position: relative;
}
#addItem .text {
    opacity: 0;
    width: 0;
    transition: opacity 0.3s ease, width 0.3s ease;
}
#addItem:hover {
    background-color: #af0202;
    border: #af0202 1px solid;
    cursor: pointer;
    width: 120px;
}
#addItem:hover .text {
    width: auto;
    opacity: 1;
}
.sticky {
    position: fixed;
    bottom: 25px;
    right: 100px;
    
}
.searchContainer {
    width: 35%;
    display: flex;
    border: 1px black solid;
    padding: 10px 20px;
    border-radius: 50px;
}
#search {
    width: 100%;
    border: none;
    font-size: 18px;
    font-family: 'Raleway';
    margin-left: 8px;
}
#search:focus {
    border: none;
    outline: none;
    box-shadow: none;
}
.searchSortContainer {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 40px;
    width: 100vw;
}
</style>