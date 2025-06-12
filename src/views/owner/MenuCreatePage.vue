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

<div class="editContainer">
    <CreateMenuBanner
    :title="addTitle"
    :icon-url="add"
    ></CreateMenuBanner>
    
    <MenuItemInfo
    to-do="Create"
    :categories="categs"
    ></MenuItemInfo>
</div>
<AppFooter></AppFooter>
</template>

<script>
import Header from '@/components/all/header.vue';
import AppFooter from '@/components/AppFooter.vue';
import CreateMenuBanner from '@/components/CreateMenuBanner.vue';
import Header2 from '@/components/delivery/header2.vue';

import add from '@/assets/owner/svg/additem.svg';
import image from '@/assets/owner/svg/image.svg';
import edit from '@/assets/owner/svg/edit-white.svg';
import MenuItemInfo from '@/components/MenuItemInfo.vue';

export default {
    components: {
        Header,
        Header2,
        CreateMenuBanner,
        MenuItemInfo,
        AppFooter
    },
    data() {
        return {
            add: add,
            addTitle: 'Add item',
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

            categs: [
                'A La Carte',
                'Breakfast',
                'Business Lunch',
                'Highlights',
            ],
            isChecked: false,
        }
    },
}
</script>

<style scoped>


</style>