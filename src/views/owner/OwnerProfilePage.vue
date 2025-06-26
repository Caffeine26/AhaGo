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

<CategoryBannerV2
title-header="Malis Restaurant"
:titles = "categs"
add-category="true"
edit-profile="true"
:rest-id=restId
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
import { useRestStore } from '@/stores/restStore';
import { useRoute } from 'vue-router';

import edit from '@/assets/owner/svg/edit-white.svg';
import { onMounted, computed } from 'vue';
import { useUserStore } from '@/stores/userStore';
import OwnerHeader from '@/components/OwnerHeader.vue';
export default {
    components: {
        Header,
        OwnerHeader,
        AppFooter,
        CategoryBannerV2
    },
    async created() {
        const route = useRoute() // access route params
        const userStore = useUserStore()
        const restStore = useRestStore()
        this.restId = parseInt(route.params.restId)

        // fetch data if it's not loaded yet
        onMounted(() => {
            if(!restStore.rests.length) {
                console.log('Fetching data...')
                restStore.fetchRests()
            }
        })
        console.log('restaurants in store = ', restStore.rests)
        console.log('route param restId = ', this.restId)

        const selectedRestaurant = restStore.rests.find(r => r.id === this.restId)
        console.log('Selected Restaurant=', selectedRestaurant)   // ret null on 2nd try

        const selectedUser = userStore.users.find(u => u.id === selectedRestaurant.user_id)
        console.log('Selected User=', selectedUser)
        

        if(selectedRestaurant && selectedUser) {
            console.log('selectedRest = ', selectedRestaurant)
            // break it into variables
            this.restName = selectedRestaurant.name 
            this.openHours = selectedRestaurant.working_hours
            this.desc = selectedRestaurant.description

            this.email = selectedUser.email
            this.address = selectedUser.address
            this.tele = selectedUser.phone_number

        } else {
            console.error('Restaurant with ID ', this.restId, ' not found.')
            this.restName = ''
            this.openHours = ''
            this.desc = ''

            this.email = ''
            this.address = ''
            this.tele = ''
        }
    },
    setup() {

        // const restId = route.params.restId
        // find restaurant from store using the id in the url
    },
    // created() {
    //     this.restId = parseInt(this.$route.params.restId);
    //     console.log('Router restId:', this.restId);
    //     const rest = this.rests.find( item => item.restId === this.restId);

    //     this.restName = rest.restName;
    //     this.openHours = rest.openHours;
    //     this.address = rest.address;
    //     this.desc = rest.desc;
    //     this.email = rest.email;
    //     this.tele = rest.tele;
    // },
    methods: {
        toggleCategoryData(index) {
            const restId = parseInt(this.$route.params.restId);
            if (index == 1) {
                this.$router.push('/owner/profile/' + restId + '/trackings')
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