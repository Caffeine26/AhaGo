import OrderItemsService from "@/services/OrdersItemsService";
import OrderService from "@/services/OrderService";
import { defineStore } from "pinia";

export const useOrdersStore = defineStore('orders', {
    state: () => ({
        orders: [],
        ordersItems: [],
        recentOrders: {},
        topCategories: {},
    }),
    persist: true,
    actions: {
        async fetchOrders(id) {
            try {
                const response = await OrderService.getAllByRest(id);
                this.orders = response.data;
                console.log('orders = ', this.orders)
            } catch (err) {
                console.log(err)
            }
        },
        async fetchOrdersItems() {
            try {
                const response = await OrderItemsService.getAll();
                this.ordersItems = response.data;
                console.log('ordersItems = ', this.ordersItems)
            } catch (err) {
                console.log(err)
            }
        },
        async updateOrderStatus(orderId, newStatus) {
            await OrderService.update(orderId, { 'status': newStatus })
            const order = this.orders.find(o => o.id === orderId)
            if(order) order.status = newStatus

        },
        async fetchRecentOrders(restId) {
            const response = await OrderService.getRecentOrders(restId)
            this.recentOrders = response.data
            console.log('recent orders=', this.recentOrders)    // obj of arrays dates and orders
        },
        async fetchTopCategories() {
            const response = await OrderItemsService.getTopCats()
            this.topCategories = response.data
            console.log('topCategories=', this.topCategories)    // obj of arrays dates and orders
        }
    }
})