<template>
<Header
:ownerUrl="ownerUrl"
></Header>

<div class="content">
    <img :src="restImg" alt="" id="image">

    <div class="login">
        <div id="title">Log In</div>
        <RegisterInputBox
        title="Email"
        :add-icon="addIcon"
        :input-icon="mail"
        @send-data="handleEmail"
        ></RegisterInputBox>

        <RegisterInputBox
        title="Password"
        :add-icon="addIcon"
        :input-icon="eye"
        extra-text="Forgot password?"
        extra-action="Reset password"
        @send-data="handlePassword"
        ></RegisterInputBox>

        <button 
        id="loginbtn"
        @click="getLoginInfo"
        >Log in</button>

        <div id="orBox">
            <span><hr></span>
            <span id="or">OR</span>
            <span><hr></span>
        </div>

        <div class="googleBox">
            <img :src="google" alt="">
            <span>Continue with Google</span>
        </div>

        <div class="registerText">
            <span>Don't have a business account?</span>
            <RouterLink to="/owner/signup">
                <span>Register your restaurant</span>
            </RouterLink>
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
        handleEmail(data) {
            this.email = data
            console.log('this.email = ', this.email)
        },
        handlePassword(data) {
            this.password = data
            console.log('this.password = ', this.password)
        },
        getLoginInfo() {
            const loginInfo = {
                'email': this.email,
                'pass': this.password
            }
            console.log(loginInfo)
        }
    },
    data() {
        return {
            ownerUrl: true,
            restImg: restImg,
            mail: mail,
            eye: eye,
            google: google,
            addIcon: true,

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
}
.registerText :nth-child(1) {
    color: #656262;
}
.registerText :nth-child(2) {
    color: #D90000;
    font-weight: 600;
    margin-left: 4px;
}
</style>