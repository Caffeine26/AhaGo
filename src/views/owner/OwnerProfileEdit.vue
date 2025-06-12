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
add-category="false"
edit-profile="true"
rest-id=1
banner-btn="Edit Profile"
:banner-icon="edit"
></CategoryBannerV2>

<div class="editBox">
    <div class="editImg">
        <div id="photo">
            <img v-if="imageSrc" :src="imageSrc" alt="" id="dishImg">
            <div v-if="!imageSrc" class="uploadBtn">
                <input
                type="file"
                accept="image/*"
                ref="fileInput"
                @change="handleFileUpload"
                style="display: none"
                />
                <button
                @click="triggerFileInput"
                id="upload"
                >
                <img :src="image" alt="img">
                Upload Image</button>
            </div>
        </div>

        <div v-if="imageSrc" class="button-wrapper">
            <input
            type="file"
            accept="image/*"
            ref="fileInput"
            @change="handleFileUpload"
            style="display: none"
            />
            <button
            class="editBtn"
            @click="triggerFileInput"
            >
                <img :src="edit" alt="edit">
                <span id="editText">Edit Image</span>
            </button>
        </div>
    </div>
    <div class="grid-container">
        <div>Restaurant Name</div>
        <input 
        v-model="restName"
        type="text">

        <div>Open Hours</div>
        <input
        v-model="openHours"
        type="text">

        <div>Address</div>
        <input
        v-model="address"
        type="text">

        <div>Description</div>
        <textarea 
        v-model="desc"
        name="" id=""></textarea>

        <div>Email</div>
        <input 
        v-model="email"
        type="text">

        <div>Telephone</div>
        <input 
        v-model="tele"
        type="text">
    </div>

    <div class="btns">
        <button id="cancel">Cancel</button>
        <button 
        @click="getInfo"
        id="save">Save</button>
    </div>
</div>


<AppFooter></AppFooter>
</template>

<script>
import Header from '@/components/all/header.vue';
import AppFooter from '@/components/AppFooter.vue';
import CategoryBannerV2 from '@/components/CategoryBannerV2.vue';
import Header2 from '@/components/delivery/header2.vue';

import edit from '@/assets/owner/svg/edit-white.svg';
import image from '@/assets/owner/svg/image.svg';
import malis from '@/assets/owner/img/malis.png';

export default {
    components: {
        Header,
        Header2,
        AppFooter,
        CategoryBannerV2
    },
    created() {
        const restId = this.$route.params.restId;
        const rest = this.rests.find( item => item.restId == restId);

        this.restName = rest.restName;
        this.openHours = rest.openHours;
        this.address = rest.address;
        this.desc = rest.desc;
        this.email = rest.email;
        this.tele = rest.tele;
        this.imageSrc = rest.imageSrc;
    },
    methods: {
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.imageSrc = URL.createObjectURL(file);
            }
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
    },
    data() {
        return {
            image: image,
            restName: '',
            openHours: '',
            address: '',
            desc: '',
            email: '',
            tele: '',
            imageSrc: '',
            rests : [
                {
                    restId: 1,
                    imageSrc: malis,
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
.editBox {
    border-left: 2px solid #D90000;
    border-right: 2px solid #D90000;
    border-bottom: 2px solid #D90000;
    padding: 64px 245px;
    border-bottom-right-radius: 30px;
    border-bottom-left-radius: 30px;
    box-shadow: 0 4px 5px #ccc;
    justify-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 60px;
}
.grid-container {
    width: fit-content;
    display: grid;
    grid-template-columns: 300px 700px;
    grid-template-rows: auto auto;
    font-size: 24px;
    font-family: 'Raleway';
    margin-left: 44px;
    margin-bottom: 60px;
    
}
.grid-container div {
    text-align: left;
    margin-bottom: 32px;
}
.grid-container :nth-child(odd) {
    font-weight: bold;
}
.grid-container input {
    height: 30px;
    position: relative;
    padding: 10px;
    top: -14px;
    border-radius: 10px;
    border: 2px solid #C8C3C3;
    font-size: 24px;
    font-family: 'Raleway';
}
.grid-container textarea {
    border-radius: 10px;
    border: 2px solid #C8C3C3;
    font-size: 24px;
    font-family: 'Raleway';
    padding: 10px;
    height: 200px;
    margin-bottom: 30px;
    position: relative;
    top: -10px;
}
.grid-container input:focus, textarea:focus {
    border:2px solid #D90000;
    outline: none;
    box-shadow: none;
}
.button-wrapper {
    display: flex;
    justify-content: flex-end; /* Align button to the right */
    position: relative;
}
.editImg {
    width: 50%;
    height: 500px;
    display: flex;
    align-items: start;

}
#photo {
    background-color: rgb(192, 192, 192);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
#dishImg {
    width: 100%;
    height: 400px;
    position: relative;
    top: 80px;
}
.uploadBtn {
    position: relative;
}
.editBtn {
    background-color: #D90000;
    position: absolute;
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgb(255, 255, 255);
    padding: 10px;
    border: none;
    border-radius: 999px;
    overflow: hidden;
    transition: width 0.3s ease;
    width: 44px;
    white-space: nowrap;
    cursor: pointer;
    height:fit-content;
    right: 20px;
    bottom: -380px;

}
.editBtn:hover {
    width: 124px;
    background-color: #af0202;
}
.editBtn #editText {
    opacity: 0;
    width: 0;
    transition: opacity 0.3s ease, margin-left 0.3s ease;
}
.editBtn:hover #editText{
    margin-left: 8px;
    opacity: 1; 
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
    align-self: flex-end;
}
.btns button {
    margin-left: 24px;
}
</style>