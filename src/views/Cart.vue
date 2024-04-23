<template>
  <main class="bg-light">
    <div class="container py-5">
      <div class="row">

        <div class="col-lg-8">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="free-shipping-banner">
              <span class="free-shipping-text">Your order qualifies for free shipping!</span>
              <div class="striped-bar"></div>
            </div>
          </div>
          <div class="row text-muted mb-3 text-lg align-items-center">
            <div class="col-1">移除</div>
            <div class="col-2">圖片</div>
            <div class="col-3">商品</div>
            <div class="col-2">數量</div>
            <div class="col-2 text-center">價格</div>
            <div class="col-2 text-center">小計</div>
          </div>
          <div v-if="cartItems.length > 0">
            <div v-for="item in cartItems" :key="item.cartItemId" class="card mb-3">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-auto text-center">
                    <a href="#" class="text-secondary" @click.prevent="deleteCartItem(item.cartItemId)">
                      <i class="fas fa-times"></i>
                    </a>
                  </div>
                  <div class="col-2 text-center">
                    <img :src="getPhotoUrl(item.photoFile)" class="img-fluid" alt="product">
                  </div>
                  <div class="col-3 text-center">
                    <p class="text-secondary">{{ item.productName }}</p>
                  </div>
                  <div class="col-2 text-center">
                    <div class="d-flex">
                      <button class="btn btn-outline-secondary" @click="decrement(item)">-</button>
                      <input type="number" class="form-control text-center mx-1" v-model="item.quantity" min="1">
                      <button class="btn btn-outline-secondary" @click="increment(item)">+</button>
                    </div>
                  </div>
                  <div class="col-2 text-end">
                    <span class="text-secondary">{{ item.productPrice }}</span>
                  </div>
                  <div class="col-2 text-end">
                    <span class="text-secondary">{{ item.subtotal }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="empty-cart-message-container">
            <div class="empty-cart-container d-flex justify-content-center align-items-center">
              <i class="fas fa-shopping-cart fa-3x mb-3"></i>
              <p class="mb-4">您的購物車是空的！</p>
              <button class="btn btn-primary btn-shop" @click="goToShop">前往選購</button>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="summary-card">
            <div class="summary-title">購物車總計</div>
            <div class="summary-item">
              <span class="item-title">小計</span>
              <span class="total-price">{{ totalAmount }}</span>
            </div>
            <div class="summary-options">
              <h6 class="options-title">運送方式</h6>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="deliveryOption" id="pickup-center"
                       value="pickup-center" v-model="deliveryOption">
                <label class="form-check-label" for="pickup-center">
                  自行取貨 (商品體驗中心)
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="deliveryOption" id="pickup-hq" value="pickup-hq"
                       v-model="deliveryOption">
                <label class="form-check-label" for="pickup-hq">
                  自行取貨 (總公司)
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="deliveryOption" id="free-shipping"
                       value="free-shipping" v-model="deliveryOption">
                <label class="form-check-label" for="free-shipping">
                  免費運送
                </label>
              </div>
              <p v-if="errorMsg1" class="error-message">{{ errorMsg1 }}</p>
            </div>

            <div class="summary-total">
              <span class="total-title">總計</span>
              <span class="total-price">{{ totalAmount }}</span>
            </div>
            <div class="button-container">
              <p v-if="errorMsg2" class="error-message">{{ errorMsg2 }}</p>
              <button class="btn btn-primary" @click="checkDeliveryOption('/checkout')">結帳</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import {useCheckoutStore} from '@/stores/checkoutStore';

export default {
  data() {
    return {
      cartItems: [],
      deliveryOption: null,
      errorMsg1: '',
      errorMsg2: '',
      total: 0
    };
  },
  computed: {
    totalAmount() {
      return this.cartItems.reduce((total, item) => total + item.subtotal, 0);
    },
  },
  methods: {
    async initializeCart() {
      try {
        await this.fetchCartItems(); // 等待購物車項目的數據拉取完成
        this.updateTotal(); // 當購物車項目更新後計算總計
      } catch (error) {
        console.error("Failed to initialize cart items: ", error);
        alert("Failed to load cart data!");
      }
    },
    async fetchCartItems() {
      try {
        const response = await axios.get(`${this.API_URL}/cart`);
        this.cartItems = response.data;
        this.cartItems.forEach(item => {
          this.updateSubtotal(item);
        });
      } catch (error) {
        console.error(error);
        alert("Please log in!");
      }
    },
    checkDeliveryOption(path) {
      if (this.cartItems.length === 0) {
        this.errorMsg2 = "請選取商品"; // Error message for empty cart
      } else if (!this.deliveryOption) {
        this.errorMsg1 = "請選擇運送方式"; // Error message for no delivery option selected
      } else {
        this.errorMsg1 = '';
        this.errorMsg2 = '';
        this.proceedToCheckout(path);
      }
    },
    proceedToCheckout() {
      const checkoutStore = useCheckoutStore();
      const cartItems = this.cartItems; // assuming cartItems is your reactive cart data array
      const orderDetails = cartItems.map(item => ({
        specId: item.specId,
        quantity: item.quantity,
        price: item.quantity * item.productPrice
      }));
      checkoutStore.addOrderDetails(orderDetails);
      this.$router.push('/checkout');
    },
    goToShop() {
      this.$router.push('/'); // Replace '/shop' with the path to your shop's main page.
    },
    async deleteCartItem(cartItemId) {
      try {
        await axios.delete(`${this.API_URL}/cart/item/${cartItemId}`);
        // After deleting, fetch the updated cart items
        await this.fetchCartItems();
      } catch (error) {
        console.error(error);
        alert("Failed to delete item from cart!");
      }
    },
    async decrement(item) {
      if (item.quantity > 1) {
        item.quantity--;
        await this.updateCartItemQuantity(item.cartItemId, item.quantity);
        this.updateSubtotal(item);
      }
    },
    async increment(item) {
      item.quantity++;
      await this.updateCartItemQuantity(item.cartItemId, item.quantity)
      this.updateSubtotal(item);
    },
    async updateCartItemQuantity(cartItemId, quantity) {
      try {
        const cartDto = {cartItemId, quantity};
        const response = await axios.put(`${this.API_URL}/cart/${cartItemId}`, cartDto);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        alert("Failed to update cart item quantity!");
      }
    },
    updateSubtotal(item) {
      item.subtotal = item.quantity * item.productPrice;
    },
    updateTotal() {
      this.total = this.cartItems.reduce((total, item) => total + item.subtotal, 0);
    },
    getPhotoUrl(photoFile) {
      if (photoFile) {
        // Check if it's a JPEG Base64 string
        if (photoFile.startsWith('/9j/')) {
          return `data:image/jpeg;base64,${photoFile}`;
        }
        // Check if it's a PNG Base64 string
        else if (photoFile.startsWith('iVBORw0KGgo')) {
          return `data:image/png;base64,${photoFile}`;
        }
        // Add more conditions here for other image formats if necessary
        else {
          // Handle other cases or return a default/placeholder image
          return 'placeholder_image_url.jpg';
        }
      } else {
        return 'placeholder_image_url.jpg';  // Provide a valid placeholder URL
      }
    }

  },

  mounted() {
    this.initializeCart();
  },
};
</script>

<style scoped>
.form-control {
  min-width: 35px;
}

.quantity-selector input {
  max-width: 40px;
}

.btn-outline-secondary {
  width: 60px;
  border-color: #e0e0e0;
}

/* For WebKit-based browsers */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* For Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

/* For all browsers */
input[type="number"] {
  appearance: none;
}

.free-shipping-banner {
  border: 2px dashed #6fa8dc;
  padding: 15px;
  margin: 10px 0px 10px 0px;
  width: 100%;
}

.free-shipping-text {
  color: #656a7a;
  font-weight: bold;
  display: block;
  margin: 10px 0px 10px 0px;
}

.striped-bar {
  width: 100%;
  height: 10px;
  background-image: repeating-linear-gradient(45deg,
  #6fa8dc,
  #6fa8dc 10px,
  #428bca 10px,
  #428bca 20px);
}

.summary-card {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
}

.button-container {
  text-align: center;
  padding-top: 20px;
}

.btn-primary {
  width: 100%;
  background-color: #606060;
  color: #fff;
  border: none;
  padding: 12px 0;
  font-size: 18px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover, .btn-primary:focus {
  background-color: #505050;
}

.summary-title {
  font-size: 20px;
  margin-bottom: 16px;
  font-weight: bold;
}

.summary-item,
.summary-total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.summary-options {
  margin-bottom: 20px;
}

.payment-options h3 {
  margin-bottom: 20px;
}

.error-message {
  color: red;
  font-weight: bold;
}

.btn-primary {
  background-color: #606060;
  border: none;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 3px;
  transition: background-color 0.3s ease;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.2);
}

.btn-primary:hover, .btn-primary:focus {
  background-color: #505050;
  cursor: pointer;
}

.btn-shop {
  width: 50%;
  max-width: 200px;
}

.empty-cart-container {
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>