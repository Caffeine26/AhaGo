<template>
    <div class="actions">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff6f6" d="M8 5v14l11-7z"/></svg>
        <div class="actionText">
            <p>{{ title }}</p>
            <hr>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
    }
}
</script>

<style>
hr{
    width: 500px;
    margin-top: 8px;
    margin-bottom: 32px;
}
.actionText{
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    cursor: pointer;
}
.actions {
    display: flex;
}
</style>