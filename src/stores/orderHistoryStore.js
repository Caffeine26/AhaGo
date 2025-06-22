import { defineStore } from 'pinia';

export const useOrderHistoryStore = defineStore('orderHistory', {
  state: () => ({
    orders: [
      {
        id: 1,
        date: '2025-06-17T20:27:18',
        status: 'Completed',
        restaurant: {
          name: 'BINGCHUN(Tounhou)',
          logo: '/src/assets/client/bingchun.png'
        },
        items: [
          {
            id: 101,
            name: 'Big Mac milk tea',
            options: 'Regular,Regular',
            quantity: 1,
            price: 2.20,
            image: '/src/assets/products/product1.png'
          }
        ]
      },
      {
        id: 2,
        date: '2025-06-17T20:20:58',
        status: 'Order Canceled',
        restaurant: {
          name: 'The Pizza Company',
          logo: '/src/assets/client/pizza_company.png'
        },
        items: [
          {
            id: 102,
            name: 'Hawaiian Pizza',
            options: 'Medium,Thin Crust',
            quantity: 1,
            price: 10.50,
            image: '/src/assets/client/pizza_company.png'
          }
        ]
      }
    ]
  }),
  actions: {
    addOrder(order) {
      this.orders.unshift(order);
    }
  },
  persist: true
}); 