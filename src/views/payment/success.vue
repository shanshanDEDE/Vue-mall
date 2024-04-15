<template>
  <div class="success-container">
    <h1>Payment Successful!</h1>
    <p>Your order has been processed successfully.</p>
    <button @click="goHome">Go to Home</button>
<!--    <button @click="viewOrder">View Order Details</button>-->
  </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/stores/userStore'; // Adjust the path as necessary

export default {
  mounted() {
    if (this.userStore.isLoggedIn) {
      this.clearShoppingCart(this.userStore.userId);
      // this.saveOrderDetails();
    }
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  methods: {
    clearShoppingCart(userId) {
      axios.delete(`${this.API_URL}/cart/clear/${userId}`)
          .then(response => {
            console.log('Cart cleared successfully:', response.data);
          })
          .catch(error => {
            console.error('Failed to clear cart:', error);
          });
    },

    goHome() {
      this.$router.push('/');
    },
    // viewOrder() {
    //   this.$router.push('/order-details');
    // }
  }
}
</script>

<style>
.success-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}
button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
