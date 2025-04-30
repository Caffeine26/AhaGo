<template>
    <div class="profile">
        <div class="username">
            <!-- admin -->
            <template v-if="userId == 1">
                <div id="worker">{{ name }}</div>
                <div id="role">Admin</div>
            </template>

            <!-- owner -->
            <template v-else-if="userId == 2">
                <div id="worker">{{ name }}</div>
                <div id="role">Owner</div>
            </template>

            <!-- delivery -->
            <template v-else-if="userId == 3">
                <div id="worker">{{ name }}</div>
                <div id="role">Driver</div>
            </template>
            

            <!-- client -->
            <template v-else-if="userId == 4">
                <div id="role">Welcome back,</div>
                <div id="worker">{{ name }}</div>
            </template>

            <!-- not logged in -->
            <template v-else>
                <div id="worker">Log in</div>
            </template>

        </div>

        <div class="profile">
            <img id="imgUrl" v-bind:src="imgUrl" alt="User">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        userId: {
            type: Number,
            required: true
        },
        name: String,
        imgUrl: String,
    }
}
</script>

<style scoped>
* {
    font-family: 'Raleway';
}
.profile{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-left: 16px;
}

.username {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 8px;

}

#imgUrl {
    width: 77px;
    height: 70px;
    border-radius: 30px;

}

#worker {
    font-size: 24px;
}

#role {
    font-size: 14px;
}
</style>