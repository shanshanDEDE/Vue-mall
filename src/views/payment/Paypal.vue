<script setup>
import { loadScript } from '@paypal/paypal-js'
import { onBeforeMount, ref } from 'vue'
import axios from "axios";

// Change to your CLIENT ID gotten from the developer dashboard
const CLIENT_ID = 'test'

// Define props
const { cartTotal } = defineProps({
  cartTotal: {
    type: Number,
    default: 0.01,
  }
})

// Define a reactive variable to track payment status
const paid  = ref(false)

// Load PayPal script and render buttons before mounting the component
onBeforeMount(function() {
  loadScript({ 'client-id': CLIENT_ID }).then((paypal) => {
    paypal
        .Buttons({
          createOrder: createOrder,
          onApprove: onApprove,
        })
        .render('#paypal-button-container')
  })
})

// Function to create an order
function createOrder(data, actions) {
  console.log('Creating order...')
  return actions.order.create({
    purchase_units: [
      {
        amount: {
          value: cartTotal,
        },
      },
    ],
  })
}

// Function to handle approval of the order
function onApprove(data, actions) {
  console.log('Order approved...')
  return actions.order.capture().then(() => {
    paid.value = true
    window.location.href = 'http://localhost:5173/successPage';
})
}
</script>

<template>
  <div id="button-container">
  <div v-if="!paid" id="paypal-button-container"></div>
  <div v-else id="confirmation">Order complete!</div>
  </div>
</template>

<script>
export default {
}

</script>
<style scoped>
#button-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
#paypal-button-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

#confirmation {
  color: white;
  margin-top: 1em;
  font-size: 2em;
  text-align: center; /* 将文本水平置中 */
}
.btn-secondary {
  display: block;
  width: 100%; /* Full width */
  padding: 12px 0; /* Comfortable padding */
  margin-top: 1rem; /* Space it out from other content */
  font-size: 18px; /* Easy to read */
  border-radius: 5px; /* Rounded corners for modern look */
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */
  background-color: #7f8c8d; /* A gray that complements the industrial style */
  color: #fff; /* White text for readability */
  border: none; /* No border for a clean look */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

.btn-secondary:hover, .btn-secondary:focus {
  background-color: #95a5a6; /* Lighter shade on hover */
}
</style>
