<template>
  <div class="container">
    <form id="payment-form" @submit.prevent="handleSubmit">
      <div id="card-element">
        <!-- Stripe's Card Element will be mounted here -->
      </div>
      <button type="submit" :disabled="isProcessing">Pay</button>
    </form>
  </div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';  // 確保導入 useRouter

export default {
  props: ['orderData'],
  setup(props) {
    const stripePromise = loadStripe('pk_test_51OkJlJCV4kbjUPV04E64xqbgbe6eEYliSmLewce1cPPhVgaBC5M0nP0kIELqL1TXufaXKE0qGc7ZCtmqQDsEPB6e00TEqhb0rR');
    const stripe = ref(null);
    const cardElement = ref(null);
    const isProcessing = ref(false);
    const router = useRouter();  // 使用 useRouter 來導航

    onMounted(async () => {
      stripe.value = await stripePromise;
      const elements = stripe.value.elements();
      cardElement.value = elements.create('card');
      cardElement.value.mount('#card-element');
    });

    const handleSubmit = async () => {
      isProcessing.value = true;
      const { token, error } = await stripe.value.createToken(cardElement.value);

      if (error) {
        console.error('Error:', error);
        alert(error.message);
        isProcessing.value = false;
      } else {
        console.log('Received Stripe Token:', token.id);
        // 這裡添加發送 token 到你的後端的代碼
        isProcessing.value = false;
        // 假設付款處理成功，導向成功頁面
        router.push({ name: 'successPage' });  // 使用 router.push 來導航到成功頁面
      }
    };

    return { handleSubmit, isProcessing };
  }
};
</script>


<style>
.container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}

#card-element {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
