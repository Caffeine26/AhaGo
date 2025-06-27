<template>
    <div class="cont">
        <div class="heade">
        <Header
            title="<span style='color: #9A0404;'>AhaGo</span> Restaurant"
            :basePath="'owner'"
            :userLoggedIn="isLoggedIn"
            :userProfileImg="user?.img_src"
        />
        <OwnerHeader
            title="Restaurant"
            it1="Home"
            it2="Orders"
            it3="Transactions"
            it4="Menu"
            it5="Profile"
        ></OwnerHeader>
        </div>

        <div class="contnt">
            <router-view />
        </div>

        <AppFooter />
    </div>
</template>

<script setup>
import Header from "@/components/all/header.vue";
import AppFooter from "@/components/AppFooter.vue";
import Header2 from "@/components/delivery/header2.vue";
import OwnerHeader from "@/components/OwnerHeader.vue";

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authenticationStore";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { user, role } = storeToRefs(authStore);

const isLoggedIn = ref(false);
const router = useRouter();

// const goToAccount = () => {
//     router.push("/delivery/settings/profile");
// };

onMounted(async () => {
    const storedRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${storedRole}_token`);

    if (storedRole !== "restaurant") {
        authStore.logout();
        return router.push("/owner/login");
    }

    if (token) {
        authStore.role = storedRole;
        const restId = await authStore.fetchProfile();
        isLoggedIn.value = !!user.value;
    } else {
        isLoggedIn.value = false;
    }
});
</script>

<style>
body {
margin: 0px;
}
.cont {
font-family: Raleway;
}
.heade {
position: fixed;
top: 0;
left: 0;
right: 0;
z-index: 3;
}
.contnt {
padding-top: 136px;
}
</style>
  