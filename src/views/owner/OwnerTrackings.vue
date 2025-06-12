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
rest-id=1
given-index=1
@toggle-category="toggleCategoryData"
></CategoryBannerV2>

<div>
    <div>Today at a Glance</div>
</div>

<OrderShortcut
color="red"
goto="gfgbfxb"
title="hello"
></OrderShortcut>



<AppFooter></AppFooter>
</template>

<script>
import Header from '@/components/all/header.vue';
import AppFooter from '@/components/AppFooter.vue';
import CategoryBannerV2 from '@/components/CategoryBannerV2.vue';
import Header2 from '@/components/delivery/header2.vue';

import edit from '@/assets/owner/svg/edit-white.svg';
import OrderShortcut from '@/components/OrderShortcut.vue';
export default {
    components: {
        Header,
        Header2,
        AppFooter,
        CategoryBannerV2,
        OrderShortcut
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
            if(index == 0) {
                this.$router.push('/owner/profile/' + this.restId)
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