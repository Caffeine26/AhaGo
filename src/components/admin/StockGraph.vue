<template>
    <div class="stock-graph-container">
      <h2>Stock Level Overview</h2>
      <h3>Total In Stock: {{ totalInStockCount }} Products</h3>
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
      
      <!-- Total In Stock Count -->
      <div class="total-in-stock">
        
      </div>
  
      <!-- Stock Notes with Matching Colors -->
      <div class="stock-notes">
        <div class="note">
          <h3 class="in-stock-title">In Stock</h3>
          <p class="in-stock-count">{{ inStockCount }} Products</p>
        </div>
        <div class="note">
          <h3 class="low-stock-title">Low Stock</h3>
          <p class="low-stock-count">{{ lowStockCount }} Products</p>
        </div>
        <div class="note">
          <h3 class="out-of-stock-title">Out of Stock</h3>
          <p class="out-of-stock-count">{{ outOfStockCount }} Products</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "StockGraph",
    data() {
      return {
        products: [
          { name: "Product A", stock: 20 },
          { name: "Product B", stock: 90 },
          { name: "Product C", stock: 0 },
          { name: "Product D", stock: 5 },
          { name: "Product E", stock: 10 },
        ],
      };
    },
    computed: {
      totalInStockCount() {
        return this.inStockProducts.reduce((sum, product) => sum + product.stock, 0);
      },
      inStockCount() {
        return this.inStockProducts.length;
      },
      lowStockCount() {
        return this.lowStockProducts.length;
      },
      outOfStockCount() {
        return this.outOfStockProducts.length;
      },
      inStockProducts() {
        return this.products.filter((p) => p.stock > 50);
      },
      lowStockProducts() {
        return this.products.filter((p) => p.stock <= 50 && p.stock > 0);
      },
      outOfStockProducts() {
        return this.products.filter((p) => p.stock === 0);
      },
      stockGraph() {
        const totalBars = 50;
        const total = this.products.length;
  
        const inStockBars = Math.round((this.inStockCount / total) * totalBars);
        const lowStockBars = Math.round((this.lowStockCount / total) * totalBars);
        const outOfStockBars = Math.round((this.outOfStockCount / total) * totalBars);
  
        return [
          ...Array(inStockBars).fill({ class: "in-stock" }),
          ...Array(lowStockBars).fill({ class: "low-stock" }),
          ...Array(outOfStockBars).fill({ class: "out-of-stock" }),
        ];
      },
    },
  };
  </script>
  
  <style scoped>
  /* Base styles for larger screens */
  .stock-graph-container {
    padding: 20px;
    border: 1px solid #ccc;
    background: #fff;
    max-width: 800px; /* Set max width for the container */
    height: 300px;
    margin: 20px auto;
  }
  
  .graph {
    display: flex;
    margin-bottom: 20px;
    width: 70%; /* Full width of the container */
    justify-content: flex-start;
  }
  
  .graph span {
    margin-right: 2px; /* Adjusted margin for better spacing */
    text-align: center;
    display: inline-block;
    font-size: 50px;
    width: calc(100% / 50); /* Ensures bars take full width and are responsive */
    max-width: 20px; /* Limits maximum width */
    line-height: 1;
  }
  
  /* Stock Colors for Graph Bars */
  .in-stock {
    color: green;
  }
  
  .low-stock {
    color: orange;
  }
  
  .out-of-stock {
    color: red;
  }
  
  /* Total In Stock Count */
  .total-in-stock {
    margin-bottom: 20px;
  }
  
  .total-in-stock h3 {
    font-size: 20px;
    color: #333;
  }
  
  /* Notes Section */
  .stock-notes {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  
  .note {
    flex: 1;
    background: #f9f9f9;
    padding: 10px;
    border-radius: 8px;
  }
  
  /* Titles and Counts Styling */
  .in-stock-title {
    color: green;
    margin-bottom: 10px;
  }
  
  .low-stock-title {
    color: orange;
    margin-bottom: 10px;
  }
  
  .out-of-stock-title {
    color: red;
    margin-bottom: 10px;
  }
  
  .in-stock-count, .low-stock-count, .out-of-stock-count {
    font-size: 16px;
    margin-top: 5px;
  }
  
  /* Responsive Design: For smaller screens */
  @media (max-width: 768px) {
    .stock-graph-container {
      padding: 10px; /* Reduced padding */
      max-width: 90%; /* Ensure it takes full width */
    }
  
    .graph {
      font-size: 30px; /* Smaller font size for bars */
    }
  
    .graph span {
      width: calc(100% / 40); /* Adjust bar width for smaller screens */
    }
  
    .stock-notes {
      flex-direction: column; /* Stack notes vertically */
      align-items: center; /* Center align */
    }
  
    .note {
      flex: 0; /* Disable flexible width */
      margin-bottom: 20px; /* Space between notes */
      width: 90%; /* Full width within container */
    }
  
    .total-in-stock h3 {
      font-size: 18px; /* Smaller font size for smaller screens */
    }
  }
  
  @media (max-width: 480px) {
    .stock-graph-container {
      padding: 10px; /* Less padding for very small screens */
    }
  
    .graph {
      font-size: 25px; /* Even smaller font size for very small screens */
    }
  
    .graph span {
      width: calc(100% / 30); /* Adjust the bar width for very small screens */
    }
  
    .total-in-stock h3 {
      font-size: 16px; /* Smaller font size for very small screens */
    }
  }
  </style>
  