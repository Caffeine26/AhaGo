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
title-header="Malis Restaurant"
:titles = "categs"
add-category="true"
edit-profile="true"
rest-id=1
banner-btn="Edit Profile"
:banner-icon="edit"
@toggle-category="toggleCategoryData"
></CategoryBannerV2>

<div class="grid-container">
    <div>Restaurant Name</div>
    <div>{{ restName }}</div>

    <div>Open Hours</div>
    <div>{{ openHours }}</div>

    <div>Address</div>
    <div>{{ address }}</div>

    <div>Description</div>
    <div>{{ desc }}</div>

    <div>Email</div>
    <div>{{ email }}</div>

    <div>Telephone</div>
    <div>{{ tele }}</div>
</div>

<AppFooter></AppFooter>
</template>

<script>
import Header from '@/components/all/header.vue';
import AppFooter from '@/components/AppFooter.vue';
import CategoryBannerV2 from '@/components/CategoryBannerV2.vue';
import Header2 from '@/components/delivery/header2.vue';

import edit from '@/assets/owner/svg/edit-white.svg';
export default {
    components: {
        Header,
        Header2,
        AppFooter,
        CategoryBannerV2
    },
    created() {
        this.restId = parseInt(this.$route.params.restId);
        console.log('Router restId:', this.restId);
        const rest = this.rests.find( item => item.restId === this.restId);

        this.restName = rest.restName;
        this.openHours = rest.openHours;
        this.address = rest.address;
        this.desc = rest.desc;
        this.email = rest.email;
        this.tele = rest.tele;
    },
    methods: {
        toggleCategoryData(index) {
            if (index == 1) {
                this.$router.push('/owner/profile/' + this.restId + '/trackings')
            }
        }
    },
    data() {
        return {
            restId: '',
            restName: '',
            openHours: '',
            address: '',
            desc: '',
            email: '',
            tele: '',
            rests : [
                {
                    restId: 1,
                    imageSrc: 'src/assets/owner/img/malis.png',
                    restName: 'Malis Restaurant',
                    openHours: '6AM - 10:30PM daily',
                    address: 'No. 136, Norodom Blvd, Phnom Penh',
                    desc: 'It serves breakfast, lunch and dinner, and also has private dining rooms for special requests. “Malis” – a Khmer word, means white jasmine  flower so guests can find this flower blooming in the restaurant’s  garden courtyard. Tables surround this beautiful garden is a tranquil  setting in which you can taste local dishes with traditional recipes,  such as Samlor Khmer (noodle soup with fish gravy and lemongrass), and signature Kuy Teav Malis (prawn and pork noodle soup). Takeo sausages (a recipe from nearby Takeo  Province) and Kep crab with Kampot pepper are also restaurant’s  highlights.',
                    email: 'abcdgmail.com',
                    tele: '098888887',
                }

            ],
            categs: [
                'Profile',
                'Trackings'
            ],
            edit: edit,
        }
    }
}
</script>

<style scoped>
.grid-container {
    width: fit-content;
    display: grid;
    grid-template-columns: 300px 700px;
    grid-template-rows: auto auto;
    font-size: 24px;
    font-family: 'Raleway';
    margin-left: 44px;
    margin-bottom: 100px;
    border-left: 1px solid;
    border-right: 1px solid;
    border-bottom: 1px solid;
    padding: 64px 245px;
    border-bottom-right-radius: 30px;
    border-bottom-left-radius: 30px;
    box-shadow: 0 4px 5px #ccc;
    justify-self: center;
    
}
.grid-container div {
    text-align: left;
    margin-bottom: 32px;
}
.grid-container :nth-child(odd) {
    font-weight: bold;
}
</style>