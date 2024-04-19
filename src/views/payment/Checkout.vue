<template>
  <div class="container">
    <h2>結帳資訊</h2>
    <form @submit.prevent="submitOrder">
      <div class="form-group">
        <label for="recipientName">收件人姓名:</label>
        <input type="text" class="form-control" id="recipientName" v-model="orderData.recipientName" required>
      </div>
      <div class="form-group">
        <label for="recipientPhone">收件人手機:</label>
        <input type="tel" class="form-control" id="recipientPhone" v-model="orderData.recipientPhone" required>
      </div>
      <div class="form-group">
        <label for="deliverAddress">送貨地址:</label>
        <input type="text" class="form-control" id="deliverAddress" v-model="orderData.deliverAddress" required>
      </div>


      <!-- Payment Options -->
      <div class="payment-options">
        <h3 class="payment-title">付款方式</h3>
        <div class="payment-options-container">
          <button @click.prevent="selectPaymentMethodAndSubmitOrder('Paypal')" class="payment-option">
            <div class="payment-option-content">
              <img src="@/assets/paymentImg/paypal.png" alt="Paypal" class="payment-icon">
              <span>Paypal</span>
            </div>
          </button>
          <button @click.prevent="selectPaymentMethodAndSubmitOrder('Linepay')" class="payment-option">
            <div class="payment-option-content">
              <img src="@/assets/paymentImg/linepay.png" alt="Linepay" class="payment-icon">
              <span>Linepay</span>
            </div>
          </button>
          <button @click.prevent="selectPaymentMethodAndSubmitOrder('Stripe')" class="payment-option">
            <div class="payment-option-content">
              <img src="@/assets/paymentImg/stripe.png" alt="Stripe" class="payment-icon">
              <span>Stripe</span>
            </div>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router'; // Import useRouter
import { useUserStore } from '@/stores/userStore';
import { useCheckoutStore } from '@/stores/checkoutStore';

export default {
  data() {
    return {
      orderData: {
        recipientName: '',
        recipientPhone: '',
        deliverAddress: '',
        paymentMethod: '',
      },
    };
  },
  setup() {
    const router = useRouter(); // Use useRouter to access the router instance
    const userStore = useUserStore(); // Moved here to use inside setup for better practices
    const checkoutStore = useCheckoutStore(); // Moved here to use inside setup for better practices
  },
  methods: {
    async selectPaymentMethodAndSubmitOrder(paymentMethod) {
      this.orderData.paymentMethod = paymentMethod;
      this.isFormSubmitted = true;

      const fullOrderData = {
        userId: useUserStore().userId,
        orderDate: new Date(),
        orderStatus: '處理中',
        deliverDate: new Date(),
        pickupDate: new Date(),
        paymentTime: new Date(),
        ...this.orderData
      };

      try {
        const response = await axios.post('http://localhost:8080/mall/orders/insertOrdersCart', fullOrderData);
        const orderId = response.data.orderId;
        console.log('Order ID received:', orderId);
        if (orderId) {
          await this.submitOrderDetails(orderId);
          switch (paymentMethod) {
            case 'Stripe':
              this.$router.push({ name: 'stripe', params: { orderData: this.orderData } });
              break;
            case 'Paypal':
              this.$router.push({ name: 'paypal', params: { orderData: this.orderData } });
              break;
            case 'Linepay':
              this.$router.push({ name: 'linepay', params: { orderData: this.orderData } });
              break;
          }
        }
      } catch (error) {
        console.error('Failed to submit order:', error);
        alert('Failed to submit the order.');
      }
    },

    async submitOrderDetails(orderId) {
      const orderDetails = useCheckoutStore().orderDetails;
      const detailPromises = orderDetails.map(detail =>
          axios.post('http://localhost:8080/mall/orders/insertOrdersDetail', { ...detail, orderId })
      );

      try {
        const responses = await Promise.all(detailPromises);
        responses.forEach((response, index) => {
          if (response.status === 200) {
            console.log('Detail submitted successfully:', orderDetails[index]);
          } else {
            console.error('Detail submission failed:', response);
          }
        });
        console.log('All order details successfully submitted.');
        useCheckoutStore().clearOrderDetails(); // Clear store details after successful submission
        this.$router.push({ name: 'paypal' }); // Use router to navigate
      } catch (error) {
        console.error('Failed to submit order details:', error);
      }
    },
  }
};
</script>



<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  color: #333; /* Dark text for an industrial look */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Modern, clean font */
}
h2 {
  margin-bottom: 35px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.form-control {
  background-color: #e7e7e7; /* Light gray for that metallic feel */
  border: 1px solid #ced4da;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); /* Inner shadow for depth */
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: none;
}

.payment-options {
  display: flex;
  flex-direction: column;
  align-items: center; /* Aligns children (the title and buttons) in the center */
  margin-top: 80px;
  margin-bottom: 2rem;
}

.payment-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.payment-options-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.payment-option {
  margin-right: 1rem;
  border: none;
  background-color: transparent;
  padding: 0.5rem;
  cursor: pointer;
}

.payment-option:last-child {
  margin-right: 0;
}

.payment-icon {
  width: 50px;
  height: 50px;
  display: block;
  margin: 0 auto 0.5rem;
  border-radius: 50%;
  background: linear-gradient(145deg, #bdc3c7, #2c3e50);
  box-shadow: 0px 0px 10px #7f8c8d;
  border: 2px solid #7f8c8d;
}

</style>