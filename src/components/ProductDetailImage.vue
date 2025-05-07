<template>
    <div class="food-gallery">
      <div class="left-image">
        <img :src="image1" alt="Main Dish" @click="openModal(image1)" />
      </div>
      <div class="right-images">
        <img :src="image2" alt="Close Up 1" @click="openModal(image2)" />
        <img :src="image3" alt="Close Up 2" @click="openModal(image3)" />
      </div>
  
      <div v-if="isModalOpen" class="modal" @click.self="closeModal">
        <img :src="modalImage" alt="Enlarged" />
        <span class="close-btn" @click="closeModal">&times;</span>
      </div>
    </div>
  </template>
  
  <script>
  import img1 from '@/assets/Koung1.jpg'
  import img2 from '@/assets/Koung2.jpg'
  import img3 from '@/assets/Koung3.jpg'
  
  export default {
    name: 'FoodGallery',
    data() {
      return {
        image1: img1,
        image2: img2,
        image3: img3,
        isModalOpen: false,
        modalImage: ''
      };
    },
    methods: {
      openModal(image) {
        this.modalImage = image;
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      }
    }
  }
  </script>
  
  <style scoped>
  .food-gallery {
    display: flex;
    gap: 10px;
    height: 400px;
    width: 50%;
    margin: 0 auto;
  }
  
  .left-image,
  .right-images {
    flex: 1;
    overflow: hidden;
  }
  
  .left-image img,
  .right-images img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .right-images {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .right-images img {
    height: calc(50% - 5px);
  }
  
  /* Modal popup */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  .modal img {
    max-width: 90%;
    max-height: 90%;
    border-radius: 10px;
  }
  
  .close-btn {
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 40px;
    color: white;
    cursor: pointer;
  }
  </style>
  