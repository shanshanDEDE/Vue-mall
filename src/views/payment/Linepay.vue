<template>
  <div>
    <h1>Line Pay Payment</h1>
    <div class="payment-form">
      <label for="amount">Amount:</label>
      <input type="number" id="amount" v-model="payment.amount" />
      <label for="currency">Currency:</label>
      <select id="currency" v-model="payment.currency">
        <option value="TWD">TWD</option>
      </select>
      <button @click="makePayment">Make Payment</button>
    </div>
    <div v-if="paymentResult">
      <h2>Payment Result:</h2>
      <p>{{ paymentResult }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      payment: {
        amount: null,
        currency: 'TWD'
      },
      paymentResult: null
    };
  },
  methods: {
    makePayment() {
      axios.post(`http://localhost:8080/mall/linepay`, {
        amount: this.payment.amount,
        currency: this.payment.currency
      })
          .then(response => {
            this.paymentResult = 'Payment successful. Transaction ID: ' + response.data.transactionId;
          })
          .catch(error => {
            console.error('Error making payment:', error);
            this.paymentResult = 'Payment failed. Please try again later.';
          });
    }
  }
}
</script>

<style scoped>
.payment-form {
  margin-bottom: 20px;
}
</style>
