<template>
  <div class="menu-item">
    <div class="menu-content">
      <div class="menu-title">{{ item.name }}</div>
      <div class="menu-price">from ${{ item.price }}</div>
      <div class="menu-desc">{{ item.description }}</div>
    </div>
    <div class="menu-image-container">
      <img :src="item.img_url" class="menu-img" />
      <button class="add-btn" @click="$emit('add', item)">+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.menu-item {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  border: 1px solid #f0f0f0;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
  min-height: 140px;
}

.menu-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 182, 193, 0.1) 0%,
    rgba(255, 192, 203, 0.15) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.menu-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 35px rgba(185, 28, 28, 0.15);
  border-color: rgba(185, 28, 28, 0.2);
  background: linear-gradient(135deg, #fef7f7 0%, #fdf2f8 100%);
}

.menu-item:hover::before {
  opacity: 1;
}

.menu-item:hover .menu-img {
  transform: scale(1.08);
}

.menu-item:hover .add-btn {
  transform: scale(1.15);
  background: #b91c1c;
  color: #fff;
  box-shadow: 0 6px 16px rgba(185, 28, 28, 0.35);
}

.menu-item:hover .menu-title {
  color: #b91c1c;
}

.menu-item:hover .menu-price {
  color: #b91c1c;
  transform: scale(1.05);
}

.menu-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-right: 1rem;
  position: relative;
  z-index: 2;
}

.menu-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #111;
  transition: color 0.3s ease;
  line-height: 1.3;
  margin-bottom: 0.25rem;
}

.menu-price {
  font-weight: 700;
  color: #111;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
}

.menu-desc {
  color: #888;
  font-size: 0.9rem;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.menu-image-container {
  position: relative;
  flex-shrink: 0;
  z-index: 2;
}

.menu-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 16px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.add-btn {
  background: #f8f8f8;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.3rem;
  color: #b91c1c;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -8px;
  right: -8px;
  z-index: 3;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
}

.add-btn:active {
  transform: scale(0.95);
}
</style>
