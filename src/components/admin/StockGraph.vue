<template>
  <div class="stock-graph-container">
    <h2>Stock Level Overview</h2>
    <h3>Total Products: {{ totalFoodItems }}</h3>
    
    <!-- Stock Graph -->
    <div class="stock-graph">
      <div class="graph">
        <span
          v-for="(bar, index) in stockGraph"
          :key="index"
          :class="bar.class"
        >|</span>
      </div>
    </div>
    
    <!-- Stock Notes with Matching Colors -->
    <div class="stock-notes">
      <div class="note">
        <h3 class="in-stock-title">In Stock</h3>
        <p class="in-stock-count">{{ inStock }} Products</p>
      </div>
      <div class="note">
        <h3 class="out-of-stock-title">Out of Stock</h3>
        <p class="out-of-stock-count">{{ outOfStock }} Products</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StockGraph",
  props: {
    totalFoodItems: Number,
    inStock: Array,
    outOfStock: Array,
  },
  created() {
    this.totalInStockCount = this.totalFoodItems
    this.inStockCount = this.inStock.total
    this.outOfStockCount = this.outOfStock.total
  },
  data() {
    return {
      totalInStockCount: 0,
      inStockCount: 0,
      outOfStockCount: 0,
      // products: [
      //   { name: "Product A", stock: 20 },
      //   { name: "Product B", stock: 90 },
      //   { name: "Product C", stock: 0 },
      //   { name: "Product D", stock: 5 },
      //   { name: "Product E", stock: 10 },
      // ],
    };
  },
  computed: {
    stockGraph() {
      const totalBars = 50;
      const total = Math.max(1, this.totalFoodItems); // Ensure at least 1 to prevent division by zero

      // Calculate bar counts with safeguards
      const inStockBars = Math.min(
        totalBars,
        Math.max(0, Math.round((this.inStock / total) * totalBars))
      );
      
      const outOfStockBars = Math.min(
        totalBars - inStockBars,
        Math.max(0, Math.round((this.outOfStock / total) * totalBars))
      );

      return [
        ...Array(inStockBars).fill({ class: "in-stock" }),
        ...Array(outOfStockBars).fill({ class: "out-of-stock" })
      ];
    }
  }
};
</script>

<style scoped>
.stock-graph-container {
  padding: 20px;
  border: 1px solid #ccc;
  background: #fff;
  max-width: 800px;
  height: 300px;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #2c3e50;
  margin-bottom: 10px;
}

h3 {
  color: #34495e;
  margin-bottom: 20px;
  font-weight: normal;
}

.graph {
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  height: 100px;
  align-items: flex-end;
  justify-content: center;
  gap: 2px;
}

.graph span {
  text-align: center;
  font-size: 24px;
  width: 10px;
  line-height: 1;
  transition: all 0.3s ease;
}

/* Stock Colors for Graph Bars */
.in-stock {
  color: #2ecc71;
  height: 100%;
}

.out-of-stock {
  color: #e74c3c;
  height: 30%;
}

/* Notes Section */
.stock-notes {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin-top: 30px;
}

.note {
  flex: 1;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Titles and Counts Styling */
.in-stock-title {
  color: #2ecc71;
  margin-bottom: 10px;
}

.out-of-stock-title {
  color: #e74c3c;
  margin-bottom: 10px;
}

.in-stock-count,
.out-of-stock-count {
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .stock-graph-container {
    padding: 15px;
    height: auto;
  }

  .graph {
    height: 80px;
  }

  .graph span {
    font-size: 18px;
    width: 8px;
  }

  .stock-notes {
    flex-direction: column;
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .stock-graph-container {
    padding: 10px;
  }

  .graph {
    height: 60px;
  }

  .graph span {
    font-size: 16px;
    width: 6px;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1rem;
  }
}
</style>