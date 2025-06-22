<template>
<ReviewSection></ReviewSection>
</template>

<script>
import ReviewSection from '@/components/ReviewSection.vue';

export default {
    components: {
        ReviewSection
    },
    // async created() {
    //     const categoryStore = useCategoryStore()
    //     this.foodItemId = parseInt(this.$route.params.foodItemId)

    //     // fetch reviews by food item id
    //     console.log('food id=', this.foodItemId)
    //     this.reviews = await categoryStore.getReviewsbyFoodId(this.foodItemId)
    //     console.log('food page review=', this.reviews)
    // },
    data() {
        return {
            foodItemId: null,
            reviews: null,
        }
    },
}
</script>

<style scoped>
</style>