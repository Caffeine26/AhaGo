<template>

<div class="editContainer">
    <CreateMenuBanner
    :title="editTitle"
    :icon-url="edit"
    ></CreateMenuBanner>
    
    
    <MenuItemInfo
    :item-id="itemId"
    to-do="Save"
    :categories="categories"
    :update-item="updateItem"
    ></MenuItemInfo>

    
</div>
</template>

<script>
import Header from '@/components/all/header.vue';
import AppFooter from '@/components/AppFooter.vue';
import CreateMenuBanner from '@/components/CreateMenuBanner.vue';
import Header2 from '@/components/delivery/header2.vue';

import add from '@/assets/owner/svg/additem.svg';
import image from '@/assets/owner/svg/image.svg';
import edit from '@/assets/owner/svg/edit.svg';
import MenuItemInfo from '@/components/MenuItemInfo.vue';
import { useCategoryStore } from '@/stores/categoryStore';

export default {
    components: {
        Header,
        Header2,
        CreateMenuBanner,
        MenuItemInfo,
        AppFooter
    },
    created() {
        this.itemId = parseInt(this.$route.params.itemId);
        this.restId = parseInt(this.$route.params.restId);

        this.categoryStore = useCategoryStore()
        this.categoryStore.categories.forEach(element => {
            if (element.restaurant_id === this.restId) {
                this.categories.push(element.name)
            }
        });
        console.log('categories=', this.categories)
        
    },
    data() {
        return {
            updateItem: true,
            categories: [],

            itemId: null,
            restId: null,
            categoryStore: null,
            selectedItem: null,

            add: add,
            editTitle: 'Edit item',
            rest: 'Malis Restaurant',
            plea: 'src/assets/owner/img/pleasachko.jpg',
            edit: edit,
            delete: 'src/assets/owner/svg/delete.svg',
            image: image,

            uploaded: '',
            selectedCategory: '',
            name: '',
            price: 0,
            description: '',
            selectedStock: '',
            discountP: 0,
            isChecked: false,
        }
    },
}
</script>

<style scoped>
.editContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>