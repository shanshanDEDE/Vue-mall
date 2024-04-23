<template>
  <div class="success-container">
    <h1>Payment Successful!</h1>
    <p>Your order has been processed successfully.</p>
    <button @click="goHome">Go to Home</button>
    <br>
    <button @click="viewOrder">View Order Details</button>
  </div>
</template>

<script>
import axios from 'axios';
import {useUserStore} from '@/stores/userStore'; // Adjust the path as necessary

export default {
  mounted() {
    const userStore = useUserStore();
    axios.get(`${this.API_URL}/user/getSession`).then((rs) => {
      userStore.loginSuccess(rs.data);
      console.log(rs.data);
      sessionStorage.setItem("loggedInMember", JSON.stringify(rs.data));
      if (userStore.isLoggedIn) {
        console.log('User is logged in:', userStore.userId);
        this.clearShoppingCart(userStore.userId);
      }
    });
  },
  methods: {
    clearShoppingCart(userId) {
      console.log('Clearing shopping cart for user:', userId);
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
    viewOrder(){
      this.$router.push('/MemberCenter/MemberOrders');
    }
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
