<template>
  <div class="container">
    <h1>Stripe Payment</h1>
    <form class="payment-form" @submit.prevent="handleSubmit">
      <div class="input-group">
        <label for="card-number-element">卡號</label>
        <div id="card-number-element" class="stripe-element"></div>
      </div>

      <div class="input-group">
        <label for="card-expiry-element">月 / 年</label>
        <div id="card-expiry-element" class="stripe-element"></div>
      </div>

      <div class="input-group">
        <label for="card-cvc-element">CVC</label>
        <div id="card-cvc-element" class="stripe-element"></div>
      </div>

      <div class="input-group">
        <label for="currency-selector">幣別</label>
        <select id="currency-selector">
          <option value="ntd">NTD</option>
        </select>
      </div>

      <button type="submit" :disabled="isProcessing">Pay Now!</button>
    </form>
  </div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  props: ['orderData'],
  setup(props) {
    const stripePromise = loadStripe('pk_test_51OkJlJCV4kbjUPV04E64xqbgbe6eEYliSmLewce1cPPhVgaBC5M0nP0kIELqL1TXufaXKE0qGc7ZCtmqQDsEPB6e00TEqhb0rR');
    const stripe = ref(null);
    const elements = ref(null);
    const isProcessing = ref(false);
    const router = useRouter();

    onMounted(async () => {
      stripe.value = await stripePromise;
      elements.value = stripe.value.elements();

      const cardNumberElement = elements.value.create('cardNumber');
      const cardExpiryElement = elements.value.create('cardExpiry');
      const cardCvcElement = elements.value.create('cardCvc');

      cardNumberElement.mount('#card-number-element');
      cardExpiryElement.mount('#card-expiry-element');
      cardCvcElement.mount('#card-cvc-element');
    });

    const handleSubmit = async () => {
      isProcessing.value = true;
      const clientSecret = props.orderData.clientSecret;
      const { error } = await stripe.value.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.value.get('cardNumber'),
        }
      });

      if (error) {
        console.error('Payment error:', error);
        alert(error.message);
        isProcessing.value = false;
      } else {
        router.push('/successPage').catch(err => {
          console.error('Navigation error:', err);
        });
        isProcessing.value = false;
      }
    };

    return { handleSubmit, isProcessing };
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: Arial, sans-serif;
}

.payment-form {
  margin-top: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
}

.input-group input,
.input-group select {
  width: 100px;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 12px 20px;
  background-color: #6772e5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

h1 {
  color: #6772e5;
  font-size: 24px;
  text-align: center;
}

p {
  text-align: center;
  margin-top: 5px;
  margin-bottom: 20px;
}
.stripe-element {
  margin-bottom: 20px;
  width: 100%;
}
#card-expiry-element,
#card-cvc-element {
  width: 48%; /* Adjust the width as needed */
}
/* Adjust this as needed based on the layout */
.input-group > label {
  width: 100%;
}

/* Make sure the button width matches the design */
button {
  width: 100%; /* Full width of the parent container */
  /* Other button styles remain the same */
}

/* You may need to adjust the container width to fit the design */
.container {
  width: 380px; /* Adjust the width as needed */
  /* Other container styles remain the same */
}

/* Responsive adjustments (if needed) */
@media (max-width: 400px) {
  .container {
    width: 95%; /* Adjust based on the device width */
  }
}
/* Additional styles may be added as needed */
</style>
