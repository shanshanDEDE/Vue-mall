// checkoutStore.js
import { defineStore } from 'pinia';

export const useCheckoutStore = defineStore('checkoutStore', {
    state: () => ({
        orderDetails: [],
    }),
    getters: {
        totalAmount(state) {
            return state.orderDetails.reduce((total, item) => total + item.price * item.quantity, 0);
        }
    },
    actions: {
        addOrderDetails(details) {
            this.orderDetails.push(...details);
        },
        clearOrderDetails() {
            this.orderDetails = [];
        },
    }
});
