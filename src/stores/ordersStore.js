import OrderItemsService from "@/services/OrdersItemsService";
import OrderService from "@/services/OrderService";
import { defineStore } from "pinia";

export const useOrdersStore = defineStore('orders', {
    state: () => ({
        ordersCount: 0,
        orders: [],
        allorders: [],
        filteredOrders: [],
        orderItems: [],
        recentOrders: {},
        topCategories: {},
        orderTypes: {},
    }),
    persist: true,
    actions: {
        filterOrders(status) {

            this.filteredOrders = this.orders.filter(order => order.status === status)

            if(status == 'all') {
                this.filteredOrders = this.orders
            }
            console.log('filteredOrders=', this.filteredOrders)
        },
        async fetchAllOrders() {
            try {
                const response = await OrderService.getAll();
                this.allorders = response.data;
                console.log('ALL Orders = ', this.allorders)
            } catch (err) {
                console.log(err)
            }
        },
        async fetchAllOrdersCount() {
            try {
                const response = await OrderService.getAllCount();
                this.ordersCount = response.data;
                console.log('ordersCount = ', this.ordersCount)
            } catch (err) {
                console.log(err)
            }
        },
        async getOrderTypes() {
            try {
                const response = await OrderService.getOrderTypes();
                this.orderTypes = response.data;
                console.log('orderTypes = ', this.orderTypes)
            } catch (err) {
                console.log(err)
            }
        },
        async fetchOrders(id) {
            try {
                const response = await OrderService.getAllByRest(id);
                this.orders = response.data;
                console.log('orders = ', this.orders)
            } catch (err) {
                console.log(err)
            }
        },
        // async fetchOrdersItems() {
        //     try {
        //         const response = await OrderItemsService.getAll();
        //         this.ordersItems = response.data;
        //         console.log('ordersItems = ', this.ordersItems)
        //     } catch (err) {
        //         console.log(err)
        //     }
        // },
        async fetchOrdersItemsById(restId) {
            try {
                const response = await OrderItemsService.getAllById(restId);
                this.orderItems = response.data;
                console.log('orderItems = ', this.orderItems)
            } catch (err) {
                console.log(err)
            }
        },
        async updateOrderStatus(orderId, newStatus) {
            await OrderService.update(orderId, { 'status': newStatus })
            const order = this.orders.find(o => o.id === orderId)
            if(order) order.status = newStatus

        },
        async updatePaymentStatus(orderId, newStatus) {
            await OrderService.update(orderId, { 'payment_status': newStatus })
            const order = this.orders.find(o => o.id === orderId)
            if(order) order.payment_status = newStatus

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
        },
        // delete order from store only, still keep in db
        async deleteOrder(id) {
            this.orders = this.orders.filter(order => order.id !== id)
            this.filteredOrders = this.filteredOrders.filter(order => order.id !== id)
        },
    }
})