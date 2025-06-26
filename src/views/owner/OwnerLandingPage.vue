<template>
    <div class="landingContainer">
        <Header
        :ownerUrl="ownerUrl"
        :basePath="'owner'"
        :userLoggedIn="isLoggedIn"
        :userProfileImg="restStore.user?.img_src"
        ></Header>
        <div id="banner">
            <img :src="burger" alt="burger">
            <div>
                <div id="bannerText">
                    <p>Boost</p>
                    <p>your business</p>
                    <span>with </span>
                    <span class="ahago">AhaGo</span>
                </div>
                <div id="bannerButtons">
                    <button>Get started</button>
                    <button>Access your account</button>
                </div>
            </div>
            
            <img :src="pasta" alt="pasta">
        </div>
        <div id="about">
            <p class="title">About AhaGo</p>
            <div id="aboutText">
                <img :src="logo" alt="AHAGO_LOGO">
                <p> {{ content }}</p>
            </div>
        </div>
        <div class="partner01">
            <p class="title">Why partner with AhaGo?</p>
            <div id="containers">
                <PicTitleBox
                v-for="(item, index) in reasons"
                :key="index"
                :imageSrc="item.imageSrc"
                :title="item.title"
                :content="item.content"
                ></PicTitleBox>
            </div>
        </div>
        <div class="partner01">
            <p class="title">Our Partners</p>
            <div id="brands">
                <img v-for="brand in brands" :src="brand" alt="BRAND" class="brand">
            </div>
        </div>
        <div id="bottomBanner">
            <div id="bottomBannerTitle">
                <p>Partner with</p>
                <span class="ahago">AhaGo </span>
                <span>Today</span>
            </div>

            <div class="bottomBannerActions">
                <ArrowText
                v-for="action in actions"
                :title="action"
                ></ArrowText>
            </div>
            
        </div>
        <hr id="footerBorder">
        <AppFooter></AppFooter>
    </div>


</template>

<script>
import Header from '@/components/all/header.vue';
import PicTitleBox from '@/components/PicTitleBox.vue';
import ArrowText from '@/components/ArrowText.vue';
import AppFooter from '@/components/AppFooter.vue';
import { useRestStore } from '@/stores/restStore';
import { useUserStore } from '@/stores/userStore';
import { useCategoryStore } from '@/stores/categoryStore';
import { useOrdersStore } from '@/stores/ordersStore';
import { useTransactionStore } from '@/stores/transactionStore';

import burger from '@/assets/owner/img/burger.png';
import pasta from '@/assets/owner/img/pasta.png';
import logo from "@/assets/owner/img/ahago-logo-2.png";
import market from "@/assets/owner/img/market.png";
import tasty from '@/assets/owner/img/tasty.png';
import pano from '@/assets/owner/img/pano.png';
import burgerking from '@/assets/owner/img/burgerking.png';
import yellowcab from '@/assets/owner/img/yellowcab.png';
import dq from '@/assets/owner/img/dq.png';
import plate from '@/assets/owner/img/plate.png';
import biz from '@/assets/owner/img/online.png';


import { useAuthStore } from '@/stores/authenticationStore';
import { computed } from 'vue';

export default {
    components: {
        Header,
        PicTitleBox,
        ArrowText,
        AppFooter
    },
    setup() {
        const restStore = useRestStore()
        const userStore = useUserStore()
        const categoryStore = useCategoryStore()
        const ordersStore = useOrdersStore()
        const transactionStore = useTransactionStore()
        const authStore = useAuthStore()
        const isLoggedIn = computed(() => !!authStore.user);

        restStore.fetchRests()
        userStore.fetchUsers()
        categoryStore.fetchCategories()
        categoryStore.fetchFoodItemsByRest(2)
        ordersStore.fetchOrders(2)
        // ordersStore.fetchOrdersItems()
        transactionStore.fetchTransactions(2)

        return { 
            restStore,
            userStore,
            categoryStore,
            ordersStore,
            transactionStore,
            isLoggedIn
        }
    },
    data() {
        return {
            ownerUrl: true,
            burger: burger,
            pasta: pasta,
            logo: logo,
            market: market,
            brands : [
                tasty,
                pano,
                burgerking,
                yellowcab,
                dq,
                tasty,
                pano,
            ],
            actions: [
                "View our Terms and Policy",
                "Register with Us",
                "Got questions? Contact Us"
            ],
            isOpen: false,
            reasons: [
                {
                    imageSrc: market,
                    title: "Expand Your Online Market",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                },
                {
                    imageSrc: plate,
                    title: "Bring Your Menu Online",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                },
                {
                    imageSrc: biz,
                    title: "Manage Your Business Online",
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                }
            ],
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    font-family: 'Raleway';
    background-color: #292929;
    color: white;
}
.landingContainer {
    background-color: #292929;
}
#banner {
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

}
#bannerText {
    font-size: 72px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
}
#bannerText :nth-child(1), #bottomBannerTitle p, #bottomBannerTitle :nth-child(3) {
    font-weight: bold;
    font-size: 72px;
}
.ahago {
    font-weight: bold;
    color: #D90000;
    font-size: 72px;
}
#bannerButtons {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
}
#bannerButtons :nth-child(1) {
    background-color: #D90000;
    color: white;
    padding: 15px 20px;
    border-radius: 25px 0 25px 25px;
    border-color: #D90000;
    font-size: 20px;
    cursor: pointer;
}
#bannerButtons :nth-child(2) {
    color: white;
    background-color: #292929;
    border: none;
    font-size: 20px;
    cursor: pointer;
}

#about {
    padding-left: 185px;
    padding-right: 185px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 150px;
}

.title {
    font-size: 56px;
    font-weight: bold;
}
#aboutText {
    display: flex;
    align-items: center;
    margin-top: 40px;
}
#aboutText img {
    width: 376px;
    height: 274px;
}
#aboutText p {
    font-size: 18px;
    margin-left: 40px;
    text-align: justify;
}
#containers {
    display: flex;
}
.partner01 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 240px;
    padding-left: 185px;
    padding-right: 185px;
}
#brands {
    display: flex;
    padding: 40px;
    border: 2px solid #959595;
    border-radius: 20px;
    margin-top: 40px;
}
.brand {
    width: 150px;
    margin: 15px;
}
.bottomBannerActions {
    display: flex;
    flex-direction: column;
    margin-left: 200px;
}
#bottomBanner {
    display: flex;
    align-items: center;
    padding-left: 300px;
    margin-top: 120px;
    margin-bottom: 120px;
}
#footerBorder {
    background-color: white;
    width: 100vw;
}
</style>
