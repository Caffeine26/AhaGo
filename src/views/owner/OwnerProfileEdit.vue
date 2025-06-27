<template>

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
                Upload Image
                </button>
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
        <button 
        @click="cancelChange"
        id="cancel">Cancel</button>
        <button 
        @click="updateRestData"
        id="save">Save</button>
    </div>
</div>

</template>

<script>
import Header from '@/components/all/header.vue';
import AppFooter from '@/components/AppFooter.vue';
import CategoryBannerV2 from '@/components/CategoryBannerV2.vue';
import Header2 from '@/components/delivery/header2.vue';

import edit from '@/assets/owner/svg/edit-white.svg';
import image from '@/assets/owner/svg/image.svg';
import malis from '@/assets/owner/img/malis.png';

import { useRestStore } from '@/stores/restStore';
import { useRoute } from 'vue-router';
import RestService from '@/services/RestService';
import { useUserStore } from '@/stores/userStore';
import UserService from '@/services/UserService';

export default {
    components: {
        Header,
        Header2,
        AppFooter,
        CategoryBannerV2
    },
    async created() {
        const route = useRoute()
        this.store = useRestStore()
        this.userStore = useUserStore()
        this.restId = parseInt(route.params.restId)

        const rest = await this.store.rests.find(r => r.id === this.restId)
        this.userId = rest.user_id
        const user = await this.userStore.users.find(u => u.id === this.userId)
        console.log('Found user=', user)

        if(rest) {
            this.restName = rest.name;
            this.openHours = rest.working_hours;
            this.desc = rest.description;
        }

        if(user) {
            this.email = user.email
            this.address = user.address
            this.tele = user.phone_number
            this.imageSrc = user.img_src
        }

        // reststore: [ name, openhours, desc, userid]
        // userstore: [ email, address, tel, img]

        // this.restName = rest.restName;
        // this.openHours = rest.openHours;
        // this.address = rest.address;
        // this.desc = rest.desc;
        // this.email = rest.email;
        // this.tele = rest.tele;
        // this.imageSrc = rest.imageSrc;
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
        cancelChange () {
            this.$router.back()
        },
        async updateRestData() {
            const restReq = {
                'name': this.restName,
                'user_id': this.userId,
                'working_hours': this.openHours,
                'description': this.desc
            };
            try {
                const res = await RestService.update(this.restId, restReq)
                console.log('Updated: ', res.data)
                // update store
                const index = this.store.rests.findIndex(r => r.id === this.restId)
                if (index !== -1) {
                    this.store.rests[index].name = restReq.name
                    this.store.rests[index].user_id = restReq.user_id
                    this.store.rests[index].working_hours = restReq.working_hours
                    this.store.rests[index].description = restReq.description
                }
            } catch (err) {
                console.log('Failed to update:', err)
                console.log('Data:', restReq)

                if(!restReq.working_hours) {
                    alert('Working hours field is required.')
                }
            }
            const userReq = {
                'email': this.email,
                'address': this.address,
                'phone_number': this.tele,
                'img_src': this.imageSrc
            };
            try {
                const res = await UserService.update(this.userId, userReq)
                console.log('Updated: ', res.data)
                const index = this.userStore.users.findIndex(u => u.id === this.userId)
                if(index !== -1) {
                    this.userStore.users[index].email = userReq.email
                    this.userStore.users[index].address = userReq.address
                    this.userStore.users[index].phone_number = userReq.phone_number
                    this.userStore.users[index].img_src = userReq.img_src

                }
                this.$router.push('/owner/profile/' + this.restId)
            } catch (err) {
                console.log('Failed to update:', err)
                console.log('Data:', userReq)
            }
        }
    },
    data() {
        return {
            store: null,
            userStore: null,
            userId: '',
            restId: '',
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
* {
    font-family: 'Quicksand';
}
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
#upload {
    background-color: #D90000;
    padding: 5px 10px;
    border-radius: 10px;
    color: white;
    display: flex;
    align-items: center;
    border: none;
    cursor: pointer;
    font-family: 'Raleway';
    font-weight: 600;

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