<template>
    <div class="menuContainer" 
        :style="editProfile ? 
        {   backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${image})`,
            backgroundSize: '100%',
            backgroundPosition: 'center'
        } : {}
        "
    >
        <div class="menuBanner">
            <div class="addContainer">
                <div class="title">{{ titleHeader }}</div>
                <RouterLink :to="goToUrl">
                    <button v-if="addCategory" id="addCategory">
                        <img :src="bannerIcon" alt="*">
                        <span class="text">{{ bannerBtn }}</span>
                    </button>
                </RouterLink>
                
            </div>
            
            <div class="categories">
                <div
                v-for="(label, index) in titles"
                :key="index"
                :class="{ categoryName: true, chosenCateg: chosenIndex === index }"
                @click="toggleChosen(index)">
                    {{ label }}
                </div>
            </div>
            
        </div>
    </div>



</template>

<script>
import add from '@/assets/owner/svg/add.svg';
import image from '@/assets/owner/img/malis.png';
import { useRoute } from 'vue-router';

export default {
    props: {
        titleHeader: String,
        titles: Array,
        addCategory: {
            type: Boolean,
            default: true
        },
        editProfile: Boolean,
        // restId: Number,
        bannerBtn: String,
        bannerIcon: String,
        givenIndex: {
            type: Number,
            default: 0
        }
    },
    created() {
        const route = useRoute()
        this.restId = parseInt(route.params.restId)
        console.log('restaurant Id = ', this.restId)

        // restId find restaurant img and info
        // display img in banner
    },
    computed: {
        goToUrl () {
            if (this.editProfile) {
                return '/owner/profile/' + this.restId + '/edit'
            } else {
                return '/owner/' + this.restId + '/menu/addCategory'
            }
        }
    },
    methods: {
        toggleChosen(index) {
            this.chosenIndex = index
            this.$emit('toggle-category', index)
        },
    },
    data() {
        return {
            restId: null,
            chosen: false,
            chosenIndex: this.givenIndex,
            name: 'Malis Restaurant',
            add: add,
            image: image

        }
    }
}
</script>

<style scoped>
.menuContainer {
    background-color: #292929;
    width: 100vw;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
}
.withImg {
    
}
.menuBanner {
    /* background-color: #292929; */
    /* width: 100%; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 180px;
    font-weight: bolder;
}
.title {
    color: white;
    font-family: 'Playfair Display';
    font-size: 48px;
    /* margin: 50px 0 50px 0; */
}
.categories {
    display: flex;
    flex-direction: row;
}
.categoryName {
    width: fit-content;
    font-family: 'Raleway';
    font-size: 24px;
    color: white;
    background-color: #292929;
    padding: 20px 50px 16px 50px;
}
.categoryName:hover {
    cursor: pointer;
}
.chosenCateg {
    width: fit-content;
    font-family: 'Raleway';
    font-size: 24px;
    font-weight: 600;
    color: #000000;
    background-color: white;
    border-radius: 50px 50px 0 0;
    /* padding: 30px 40px; */
    /* border: 1px solid white; */
}
.chosenCateg:hover {
    font-weight: 600;
}

#addCategory {
    background-color: #3E3E3E;
    border: none;
    border-radius: 999px;
    margin-left: 16px;
    padding: 10px;
    width: 44px;
    height: fit-content;
    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
    overflow: hidden;
    transition: width 0.3s ease;
    white-space: nowrap;
    cursor: pointer;
    position: relative;
}
#addCategory .text {
  opacity: 0;
  width: 0;
  transition: opacity 0.3s ease, width 0.3s ease;
}
#addCategory:hover {
    width: 150px;
    background-color: #000000;
    cursor: pointer;
    border:#000000 1px solid;
}
#addCategory:hover .text {
  width: auto;
  opacity: 1;
}
.addContainer {
    display: flex;
    align-items: center;

    margin-top: 30px;
    margin-bottom: 20px;
}

</style>