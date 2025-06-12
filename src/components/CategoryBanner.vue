<template>
<div
:class="{ categoryName: !chosen, chosenCateg: chosen }"
@click="toggleChosen">
    {{ title }}
</div>

</template>

<script>
export default {
    props: {
        title: String
    },
    methods: {
        toggleChosen() {
            this.chosen = !this.chosen
        }
    },
    data() {
        return {
            chosen: false,
        }
    }
}
</script>

<style scoped>
.categoryName {
    width: fit-content;
    font-family: 'Raleway';
    font-size: 24px;
    color: white;
    background-color: #3E3E3E;
    padding: 20px 30px;
    border: 1px solid white;
}
.categoryName:hover {
    cursor: pointer;
    font-weight: 500;
    background-color: #787878;
}
.chosenCateg {
    width: fit-content;
    font-family: 'Raleway';
    font-size: 24px;
    font-weight: 600;
    color: #292929;
    background-color: white;
    padding: 20px 30px;
    border: 1px solid white;
}
</style>