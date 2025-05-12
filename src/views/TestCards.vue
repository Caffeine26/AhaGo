<template>
  <div class="test-container">
    <!-- Graphs Section -->
    <h2 class="test-title">Analytics</h2>
    <div class="graphs-grid">
      <LineGraph
        title="Supply Overview"
        value="1678"
        :data="[50, 150, 180, 320, 180, 350, 400]"
        :months="['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug']"
      />
      <LineGraph
        title="Total Revenue"
        value="$ 186,899"
        :data="[5000, 6000, 5500, 10000, 7000, 12000, 8000, 10000]"
        :months="['Mar', 'April', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct']"
      />
    </div>

    <!-- Existing Categories Section -->
    <h2 class="test-title">Categories</h2>
    <div class="category-grid">
      <CategoryCard
        v-for="category in categories"
        :key="category.title"
        :title="category.title"
        :image="category.image"
      />
    </div>

    <h2 class="test-title">Products</h2>
    <div class="product-grid">
      <ProductCard
        v-for="product in products"
        :key="product.title"
        :title="product.title"
        :image="product.image"
        :price="product.price"
        :rating="product.rating"
      />
    </div>

    <!-- Messages Section -->
    <h2 class="test-title">Messages</h2>
    <div class="messages-grid">
      <MessageItem
        v-for="(message, index) in messages"
        :key="index"
        :name="message.name"
        :role="message.role"
        :time="message.time"
        :avatar="message.avatar"
      >
        {{ message.content }}
      </MessageItem>
    </div>

    <!-- New Reviews Section -->
    <h2 class="test-title">Reviews</h2>
    <div class="reviews-grid">
      <ReviewCard
        v-for="(review, index) in reviews"
        :key="index"
        :name="review.name"
        :date="review.date"
        :rating="review.rating"
        :review="review.review"
        :avatar="review.avatar"
      />
    </div>

    <!-- New Receipts Section -->
    <h2 class="test-title">Receipts</h2>
    <div class="receipts-grid">
      <ReceiptCard
        v-for="(receipt, index) in receipts"
        :key="index"
        :date="receipt.date"
        :time="receipt.time"
        :customer-name="receipt.customerName"
        :order-number="receipt.orderNumber"
        :status="receipt.status"
        :dining-type="receipt.diningType"
        :table-number="receipt.tableNumber"
        :items="receipt.items"
        :total="receipt.total"
      />
    </div>
  </div>
</template>

<script>
import CategoryCard from '@/components/product_cards/CategoryCard.vue'
import ProductCard from '@/components/product_cards/ProductCard.vue'
import LineGraph from '@/components/charts/LineGraph.vue'
import MessageItem from '@/components/chat/MessageItem.vue'
import ReviewCard from '@/components/review/ReviewComponent.vue'
import ReceiptCard from '@/components/receipt/ReceiptCard.vue' // Import the new ReceiptCard component

export default {
  name: 'TestCards',
  components: {
    CategoryCard,
    ProductCard,
    LineGraph,
    MessageItem,
    ReviewCard,
    ReceiptCard // Register the new component
  },
  data() {
    return {
      categories: [
        {
          title: 'Food',
          image: require('@/assets/category/category1.png')
        },
        {
          title: 'Dessert',
          image: require('@/assets/category/category2.png')
        },
        {
          title: 'Drink',
          image: require('@/assets/category/category3.png')
        }
      ],
      products: [
        {
          title: 'Nom Ahkor',
          image: require('@/assets/products/product1.png'),
          price: 0.75,
          rating: 5
        },
        {
          title: 'Chek Katis',
          image: require('@/assets/products/product2.png'),
          price: 1.5,
          rating: 4.5
        },
        {
          title: 'Nom Chak Kachan',
          image: require('@/assets/products/product3.png'),
          price: 0.5,
          rating: 4.5
        }
      ],
      messages: [
        {
          name: 'Sonita Yakorn',
          role: 'Customer',
          time: '10:30 AM',
          avatar: require('@/assets/avatars/avatar2.png'),
          content: 'Absolutelty! We will reserve a window table for dinner tonight..'
        },
        {
          name: 'Bob Smith',
          role: 'Support',
          time: '10:35 AM',
          avatar: require('@/assets/avatars/avatar3.png'),
          content: 'Thanks you so much for your helping !'
        }
      ],
      reviews: [
        {
          name: 'Sonita Yakorn',
          date: '26-01-2025',
          rating: 4,
          review: 'Absolutely delicious! This burger and cheese combine together well, perfect balancing.',
          avatar: require('@/assets/avatars/avatar2.png')
        },
        {
          name: 'Bob Smith',
          date: '28-01-2025',
          rating: 5,
          review: 'Best meal I have had in a while! Highly recommend.',
          avatar: require('@/assets/avatars/avatar3.png')
        }
      ],
      receipts: [
        {
          date: 'Sat, October 20, 2024',
          time: '02:47 PM',
          customerName: 'Sonita Yakorn',
          orderNumber: '#ORD1025',
          status: 'Completed',
          diningType: 'Dine-In',
          tableNumber: 'Table 12',
          items: [
            {
              image: require('@/assets/products/product1.png'),
              name: 'Nom Ahkor',
              quantity: 1,
              price: 0.75
            },
            {
              image: require('@/assets/products/product2.png'),
              name: 'Chek Katis',
              quantity: 1,
              price: 1.5
            }
          ],
          total: 2.25
        }
      ]
    }
  }
}
</script>

<style scoped>
.test-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.test-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.graphs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.messages-grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.reviews-grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.receipts-grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;
}
</style>