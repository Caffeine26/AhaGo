<template>
    <div class="registerBox">
        <div id="title">{{ title }}</div>

        <div class="inputBox">
            <input 
            v-model="usrInput"
            @change="sendUsrInput"
            type="text" id="userInput">
            <img v-if="addIcon" :src="inputIcon" alt="*" id="inputIcon">
        </div>
        <div class="extras">
            <span>{{ extraText }}</span>
            <span>{{ extraAction }}</span>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        title: String,
        addIcon: Boolean,
        inputIcon: String,
        extraText: String,
        extraAction: String
    },
    methods: {
        sendUsrInput() {
            this.$emit('send-data', this.usrInput)
        }
    },
    data() {
        return {
            usrInput: '',
            // title: 'Password',
            // extraText: 'Forgot password?',
            // extraAction: 'Reset password',
            // inputIcon: mail,
            // addIcon: true
        }
    }
}
</script>

<style scoped>
* {
    font-family: 'Quicksand';
}
.registerBox {
    display: flex;
    flex-direction: column;
    width: fit-content;
}
#title {
    align-self: flex-start;
}
#userInput {
    width: 300px;
    height: 18px;
    outline: none;
    border: none;
    font-size: 20px;
    /* padding: 10px;
    border-radius: 10px; */
}
#userInput:focus {
    outline: none;
    border: none;
}
.extras {
    align-self: flex-end;
    font-size: 12px;
}
.extras :nth-child(1) {
    color: #656262;
}
.extras :nth-child(2) {
    color: #D90000;
    font-weight: 600;
    margin-left: 4px;
}
.inputBox {
    display: flex;
    margin: 4px 0;
    padding: 10px;
    border: 2px solid;
    border-radius: 10px;
}
.inputBox:hover {
    border: 2px solid #D90000;
}

</style>