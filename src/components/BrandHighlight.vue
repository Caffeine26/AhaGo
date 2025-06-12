<template>
    <div class="brand-item" @click="$emit('click', name)">
      <img :src="logo" :alt="name" class="brand-logo" />
      <div class="brand-name">{{ name }}</div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    name: String,
    logo: String
  });
  </script>
  
  <style scoped>
  .brand-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 120px;
  }
  .brand-logo {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: contain;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    margin-bottom: 0.5rem;
  }
  .brand-name {
    font-size: 1.1rem;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
  }
  @media (max-width: 768px) {
    .brand-item { width: 80px; }
    .brand-logo { width: 48px; height: 48px; }
    .brand-name { font-size: 0.9rem; max-width: 70px; }
  }
  </style>