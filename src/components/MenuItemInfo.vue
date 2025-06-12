<template>
<div class="content-container">
<div class="content">
    <div class="editImg">
        <div id="photo">
            <img v-if="uploaded" :src="uploaded" alt="" id="dishImg">
            <div v-if="!uploaded" class="uploadBtn">
                <input
                type="file"
                accept="image/*"
                ref="fileInput"
                @change="handleFileUpload"
                style="display: none"
                />
                <button
                @click="triggerFileInput"
                id="upload"
                >
                <img :src="image" alt="img">
                Upload Image</button>
            </div>
        </div>

        <div v-if="uploaded" class="button-wrapper">
            <input
            type="file"
            accept="image/*"
            ref="fileInput"
            @change="handleFileUpload"
            style="display: none"
            />
            <button
            class="editBtn"
            @click="triggerFileInput"
            >
                <img :src="edit" alt="edit">
                <span id="editText">Edit Image</span>
            </button>
        </div>
    </div>
    <div class="grid-container">
        <div>Category:</div>
        <div>
            <select v-model="selectedCategory">
                <option 
                v-for="(item,index) in categories" 
                :value="index"
                :key="item"
                >
                {{ item }}
                </option>
            </select>
        </div>

        <div>Name:</div>
        <div>
            <input
            v-model="name"
            type="text" 
            placeholder="Enter item name"
            >
        </div>
        
        <div>Price:</div>
        <div>
            <input 
            v-model="price"
            type="text" 
            placeholder="Enter item price"
            >
        </div>

        <div>Description (Optional):</div>
        <div>
            <textarea 
            v-model="description"
            type="text" id="descInput" placeholder="Write item description"></textarea>
        </div>

        <div>Availability:</div>
        <div>
            <select v-model="selectedStock">
                <option value="1">In Stock</option>
                <option value="0">Out of Stock</option>
            </select>
        </div>

        <div class="discount">
            <div>Discount:</div>
            <div class="withdiscount">
                <label class="switch">
                    <input type="checkbox" id="hello" v-model="isChecked" @change="getCheckValue">
                    <span class="slider round"></span>
                </label>
                <div :style="{ visibility: isChecked ? 'visible' : 'hidden' }" class="discountP">
                    <input 
                    v-model="discountP"
                    type="text" placeholder="Discount %" id="">
                    <span>%</span>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="btns">
    <button id="cancel">Cancel</button>
    <button 
    @click="getInfo"
    id="save">{{ toDo }}</button>
</div>
</div>
</template>

<script>
import edit from '@/assets/owner/svg/edit-white.svg';
import image from '@/assets/owner/svg/image.svg';

export default {
    props: {
        itemId: Number,
        toDo: String,
        categories: Array
    },
    created() {
        if (this.itemId) {
            console.log('item id = ', this.itemId);
            const item = this.items.find( item => item.id == this.itemId );
            this.uploaded = item.imageSrc;
            this.selectedCategory = item.categoryId;
            this.name = item.name;
            this.price = item.price;
            this.description = item.desc;
            this.selectedStock = 1;
            this.discountP = 10;

            if(this.discountP > 0) {
                this.isChecked = true
            }
        }
    },
    methods: {
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.uploaded = URL.createObjectURL(file);
            }
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        getCheckValue(event) {
            console.log(this.isChecked)
        },
        getInfo() {
            const item = {
                category: this.selectedCategory,
                name: this.name,
                price: this.price,
                desc: this.description,
                stock: this.selectedStock,
                discount: this.discountP
            }
            console.log(item)
        }
    },
    data() {
        return {
            addTitle: 'Add item',
            rest: 'Malis Restaurant',
            plea: 'src/assets/owner/img/pleasachko.jpg',
            edit: edit,
            delete: 'src/assets/owner/svg/delete.svg',
            image: image,

            // required data
            uploaded: '',
            selectedCategory: '',
            name: '',
            price: 0,
            description: '',
            selectedStock: '',
            discountP: 0,

            items: [
                {
                    id: 1,
                    imageSrc: 'https://malis.thalias.com.kh/wp-content/uploads/2024/08/MicrosoftTeams-image-3-scaled.jpg',
                    name: 'Plear Sach Ko 1',
                    price: '11',
                    desc: 'Fine slices of tender beef marinated in a blend of prahok, lemongrass, fresh green peppercorns wo!',
                    statusId: 1,
                    categoryId: 1
                },
                {
                    id: 2,
                    imageSrc: 'https://malis.thalias.com.kh/wp-content/uploads/2024/08/MicrosoftTeams-image-3-scaled.jpg',
                    name: 'Plear Sach Ko 2',
                    price: '11',
                    desc: 'Fine slices of tender beef marinated in a blend of prahok, lemongrass, fresh green peppercorns wo!',
                    statusId: 1,
                    categoryId: 2
                },
                {
                    id: 3,
                    imageSrc: 'https://malis.thalias.com.kh/wp-content/uploads/2024/08/MicrosoftTeams-image-3-scaled.jpg',
                    name: 'Plear Sach Ko3',
                    price: '11',
                    desc: 'Fine slices of tender beef marinated in a blend of prahok, lemongrass, fresh green peppercorns wo!',
                    statusId: 1,
                    categoryId: 3
                },
                {
                    id: 4,
                    imageSrc: 'https://malis.thalias.com.kh/wp-content/uploads/2024/08/MicrosoftTeams-image-3-scaled.jpg',
                    name: 'Plear Sach Ko4',
                    price: '11',
                    desc: 'Fine slices of tender beef marinated in a blend of prahok, lemongrass, fresh green peppercorns wo!',
                    statusId: 1,
                    categoryId: 4
                },
                {
                    id: 5,
                    imageSrc: 'https://malis.thalias.com.kh/wp-content/uploads/2024/08/MicrosoftTeams-image-3-scaled.jpg',
                    name: 'Plear Sach Ko5',
                    price: '11',
                    desc: 'Fine slices of tender beef marinated in a blend of prahok, lemongrass, fresh green peppercorns wo!',
                    statusId: 1,
                    categoryId: 1
                },
                {
                    id: 6,
                    imageSrc: 'https://malis.thalias.com.kh/wp-content/uploads/2024/08/MicrosoftTeams-image-3-scaled.jpg',
                    name: 'Plear Sach Ko6',
                    price: '11',
                    desc: 'Fine slices of tender beef marinated in a blend of prahok, lemongrass, fresh green peppercorns wo!',
                    statusId: 1,
                    categoryId: 1
                },
                {
                    id: 7,
                    imageSrc: 'https://malis.thalias.com.kh/wp-content/uploads/2024/08/MicrosoftTeams-image-3-scaled.jpg',
                    name: 'Plear Sach Ko7',
                    price: '11',
                    desc: 'Fine slices of tender beef marinated in a blend of prahok, lemongrass, fresh green peppercorns wo!',
                    statusId: 1,
                    categoryId: 1
                },
                {
                    id: 8,
                    imageSrc: 'https://malis.thalias.com.kh/wp-content/uploads/2024/08/MicrosoftTeams-image-3-scaled.jpg',
                    name: 'Plear Sach Ko8',
                    price: '11',
                    desc: 'Fine slices of tender beef marinated in a blend of prahok, lemongrass, fresh green peppercorns wo!',
                    statusId: 1,
                    categoryId: 1
                },
                {
                    id: 9,
                    imageSrc: 'https://malis.thalias.com.kh/wp-content/uploads/2024/08/MicrosoftTeams-image-3-scaled.jpg',
                    name: 'Plear Sach Ko9',
                    price: '11',
                    desc: 'Fine slices of tender beef marinated in a blend of prahok, lemongrass, fresh green peppercorns wo!',
                    statusId: 1,
                    categoryId: 3
                },
            ],
            categs: [
                'All items',
                'A La Carte',
                'Breakfast',
                'Business Lunch',
                'Highlights',
                'New'
            ],
            isChecked: false,
        }
    },
}
</script>

<style scoped>
.content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    margin-bottom: 80px;
}
.content-container .btns {
    position: relative;
    right: 0;
}
.editContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 128px;
}
#save {
    color: white;
    background-color: #D90000;
    padding: 16px 24px;
    border-radius: 18px;
    border: none;
    font-size: large;
    font-weight: 600;
}
#save:hover {
    background-color: #af0202;
    cursor: pointer;
    
}
#cancel {
    border: none;
    font-size: large;
    font-weight: 500;
    background-color: white;
    cursor: pointer;
}
.btns {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 56px;
}
.btns button {
    margin-left: 24px;
}
.grid-container {
    width: 40%;
    display: grid;
    grid-template-columns: 160px 100px;
    grid-template-rows: auto auto;
    font-size: 24px;
    font-family: 'Raleway';
    margin-left: 44px;
}
.grid-container :nth-child(even) {
    text-align: left;
    margin-bottom: 16px;
}
.grid-container input, textarea, select {
    font-size: 24px;
    padding: 15px 15px;
    font-family: 'Raleway';
    border-radius: 10px;
    border: 2px solid #C8C3C3;
}
.grid-container input:focus, textarea:focus, select:focus {
    border:2px solid #D90000;
    outline: none;
    box-shadow: none;
}
.grid-container :nth-child(odd) {
    text-align: left;
    padding-top: 10px;
    margin-top: 10px;
}
.editImg {
    width: 40%;
    display: flex;
    align-items: end;

}
#descInput {
    height: 120px;
    line-height: 1.5;
    font-size: 24px;
    padding: 8px;
}
#dishImg {
    width: 100%;
    height: 400px;
    position: relative;
    top: 80px;
}
.content {
    width: 80%;
    display: flex;
    align-items: flex-start;
    margin-top: 32px;
    padding: 30px 30px;
    border: 1px solid #D9D9D9;
    border-radius: 50px;
    box-shadow: 0 8px 5px #C8C3C3;
}
.button-wrapper {
    display: flex;
    justify-content: flex-end; /* Align button to the right */
    position: relative;
}
#photo {
    background-color: rgb(192, 192, 192);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.uploadBtn {
    position: relative;
}
.editBtn {
    background-color: #D90000;
    position: absolute;
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgb(255, 255, 255);
    padding: 10px;
    border: none;
    border-radius: 999px;
    overflow: hidden;
    transition: width 0.3s ease;
    width: 44px;
    white-space: nowrap;
    cursor: pointer;
    height:fit-content;
    right: 20px;
    bottom: -150px;

}
.editBtn:hover {
    width: 124px;
    background-color: #af0202;
}
.editBtn #editText {
    opacity: 0;
    width: 0;
    transition: opacity 0.3s ease, margin-left 0.3s ease;
}
.editBtn:hover #editText{
    margin-left: 8px;
    opacity: 1; 
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  height: 34px;
  
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #D90000;
}

input:focus + .slider {
  box-shadow: 0 0 1px #D90000;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.discount {
    width: fit-content;
    display: flex;
    align-items: flex-start;
}
.discountP {
    display: flex;
    margin-left: 64px;
    margin-top: 24px;
}
.discountP span {
    padding: 10px;
    position: relative;
    top: 10px;
    font-size: 24px;
    font-family: 'Raleway';
}
.withdiscount {
    display: flex;
    flex-direction: column;
}
.switch {
  position: relative;
  top: 10px;
  /* display: inline-block; */
  width: 60px;
  height: 34px;
  margin-left: 64px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}
#upload {
    color: white;
    background-color: #D90000;
    border: none;
    padding: 10px 15px;
    border-radius: 50px;
    font-weight: 600;
    font-family: 'Raleway';
    display: flex;
    align-items: center;
    box-shadow: 0 4px 5px rgb(128, 128, 128);
}
</style>