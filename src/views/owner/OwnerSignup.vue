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
                <input type="checkbox">
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

<script>
import Header from '@/components/all/header.vue';
import RegisterInputBox from '@/components/RegisterInputBox.vue';

import google from '@/assets/owner/svg/google.svg';
import mail from '@/assets/owner/svg/mail.svg';
import eye from '@/assets/owner/svg/eye.svg';
import restImg from '@/assets/owner/img/loginImg.png';

export default {
    components: {
        Header,
        RegisterInputBox
    },
    methods: {
        handleName(data) {
            this.name = data
            console.log('this.name = ', this.name)
        },
        handleAddress(data) {
            this.address = data
            console.log('this.address = ', this.address)
        },
        handleTel(data) {
            this.tel = data
            console.log('this.tel = ', this.tel)
        },
        handleEmail(data) {
            this.email = data
            console.log('this.email = ', this.email)
        },
        handlePassword(data) {
            this.password = data
            console.log('this.password = ', this.password)
        },
        getSignupInfo() {
            const signupInfo = {
                'name': this.name,
                'address': this.address,
                'tel': this.tel,
                'email': this.email,
                'pass': this.password
            }
            console.log(signupInfo)
        },
        goToNext() {
            this.page2 = !this.page2
        },
        goToPrev() {
            this.page2 = !this.page2
        }
    },
    data() {
        return {
            ownerUrl: true,
            restImg: restImg,
            mail: mail,
            eye: eye,
            google: google,
            addIcon: false,
            addIcon2: true,
            page2: false,

            name: '',
            address: '',
            tel: '',
            email: '',
            password: '',
        }
    }
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