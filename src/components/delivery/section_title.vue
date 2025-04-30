<template>
    <div class="section_title"> {{ SectionTitle }} </div>
</template>
<script>
export default {
    name: 'SectionTitle',
    props: {
        SectionTitle: String
    }
}
</script>
<style scoped>
.section_title {
    font-size: 32px;
    font-weight: 500;
    
}</style>