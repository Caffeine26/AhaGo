<template>
<Header
:ownerUrl="ownerUrl"
></Header>

<div class="content">
    <img :src="restImg" alt="" id="image">

    <div class="login">
        <div id="title">Register Your Restaurant</div>

        <div v-if="!page2" class="page1">
            <RegisterInputBox
            title="Restaurant's Name"
            :add-icon="addIcon"
            @send-data="handleName"
            ></RegisterInputBox>

            <RegisterInputBox
            title="Restaurant's Address"
            :add-icon="addIcon"
            @send-data="handleAddress"
            ></RegisterInputBox>

            <RegisterInputBox
            title="Telephone"
            :add-icon="addIcon"
            @send-data="handleTel"
            ></RegisterInputBox>

            <button 
            id="loginbtn"
            @click="goToNext"
            >Next</button>
        </div>

        <div v-if="page2" class="page2">
            <RegisterInputBox
            title="Email"
            :add-icon="addIcon2"
            :input-icon="mail"
            @send-data="handleEmail"
            ></RegisterInputBox>

            <RegisterInputBox
            title="Password"
            :add-icon="addIcon2"
            :input-icon="eye"
            @send-data="handlePassword"
            ></RegisterInputBox>

            <div class="agree">
                <input type="checkbox" v-model="agreed">
                <label for="">I have read and agreed to the terms and conditions in Terms of Use and Privacy Policy.</label>

            </div>
            

            <button 
            id="backBtn"
            @click="goToPrev"
            >Back</button>

            <button 
            id="loginbtn"
            @click="getSignupInfo"
            >Register</button>

            <div class="registerText">
                <span>Already registered?</span>
                <RouterLink to="/owner/login">
                    <span>Log in</span>
                </RouterLink>
            </div>
        </div>
        
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authenticationStore';
import Header from '@/components/all/header.vue';
import RegisterInputBox from '@/components/RegisterInputBox.vue';

import google from '@/assets/owner/svg/google.svg';
import mail from '@/assets/owner/svg/mail.svg';
import eye from '@/assets/owner/svg/eye.svg';
import restImg from '@/assets/owner/img/loginImg.png';

const authStore = useAuthStore();
const page2 = ref(false);

const ownerUrl = true;
const addIcon = false;
const addIcon2 = true;
const agreed = ref(false);

const address = ref('');
const tel = ref('');

function handleName(name) {
  authStore.firstName = name; 
}

function handleAddress(data) {
  address.value = data;
}

function handleTel(data) {
  tel.value = data;
}

function handleEmail(email) {
  authStore.email = email;
}

function handlePassword(password) {
  authStore.password = password;
  authStore.confirmPassword = password;
}

function goToNext() {
  if (!authStore.firstName || !address.value || !tel.value) {
    alert("Please fill in all the fields.");
    return;
  }
  page2.value = true;
}

function goToPrev() {
  page2.value = false;
}

function getSignupInfo() {
  if (!authStore.email || !authStore.password) {
    alert("Email and password are required.");
    return;
  }

  if (!agreed.value) {
    alert("You must agree to the Terms of Use and Privacy Policy.");
    return;
  }

  authStore.handleSignUp("restaurant", {
  restaurant_profile: {},               
  address: address.value,
  phone_number: tel.value,
});

}
</script>

<style scoped>
* {
    font-family: 'Raleway';
}
a {
    text-decoration: none;
    color: inherit;

}
.content {
    width: 100vw;
    display: flex;
}
#image {
    width: 40vw;
    height: 90vh;
}
.login {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
#loginbtn {
    color: white;
    background-color: #D90000;
    width: 350px;
    height: 50px;
    border-radius: 10px;
    border: none;
    font-weight: bold;
    font-size: 20px;
    margin-top: 30px;
    cursor: pointer;
}
#backBtn {
    width: 350px;
    height: 50px;
    border-radius: 10px;
    border: 1px solid #C8C3C3;
    font-weight: bold;
    font-size: 20px;
    margin-top: 30px;
    cursor: pointer;
    color: #656262;
}
#title {
    font-weight: bold;
    font-size: 32px;
    margin-bottom: 40px;
}
#orBox {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;

}
#orBox hr {
    width: 100px;
}
#or {
    margin-left: 10px;
    margin-right: 10px;
    color: #656262;
}
.googleBox {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 20px;
    color: #656262;
    border: 2px solid #C8C3C3;
    padding-top: 15px;
    padding-bottom: 15px;
    width: 350px;
    border-radius: 10px;
    margin-bottom: 40px;


}
.googleBox span {
    margin-left: 20px;
}

.registerText {
    font-size: 12px;
    margin-top: 20px;
}
.registerText :nth-child(1) {
    color: #656262;
}
.registerText :nth-child(2) {
    color: #D90000;
    font-weight: 600;
    margin-left: 4px;
}
.page2 {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.agree {
    display: flex;
    width: 350px;
    align-items: flex-start;
    color: #767676;
    font-size: 12px;
    margin-top: 20px;
}
.agree label {
    text-align: left;
}
</style>