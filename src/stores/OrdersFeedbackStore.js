// stores/OrdersFeedbackStore.js
import { defineStore } from 'pinia';

export const OrdersFeedbackStore = defineStore('ordersFeedback', {
    state: () => ({
        order: null,
        ordersDetailId: null, // 添加这个状态
    }),
    actions: {
        setOrder(order, ordersDetailId = null) {
            this.order = order;
            this.ordersDetailId = ordersDetailId; // 设置详细信息的ID
        },
        clearOrder() {
            this.order = null;
            this.ordersDetailId = null; // 清除详细信息的ID
        },
    },
});