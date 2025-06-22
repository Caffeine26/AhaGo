import OrderItemsService from "@/services/OrdersItemsService";
import OrderService from "@/services/OrderService";
import { defineStore } from "pinia";

export const useOrdersStore = defineStore('orders', {
    state: () => ({
        orders: [],
        ordersItems: [],
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

        }
    }
})