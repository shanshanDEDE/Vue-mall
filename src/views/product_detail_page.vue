<template >
  <section class="py-5">
    <div class="container">
      <div class="row mb-5">
        <div class="col-lg-6">
          <!-- PRODUCT SLIDER-->
          <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">

            <div class="carousel-inner">
              <div v-for="(id, index) in reSpecIds" :key="index" :class="{ 'carousel-item': true, 'active': index === 0 }" :data-bs-interval="index === 0 ? 10000 : 2000">
                <img :src="`http://localhost:8080/mall/productSpec/photo/${id}`" class="d-block w-100" style="height: 300px; width: 100%; object-fit: contain " :alt="reProductName">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>

          </div>


        </div>
        <!-- PRODUCT DETAILS-->
        <div class="col-lg-6">
          <h1>{{ reProductName }}</h1>
          <p class="text-muted lead">${{ rePrice }}</p>
          <p class="text-sm mb-4">{{ reProductDescription }}</p>
          <div class="row align-items-stretch mb-4">
            <select v-model="selectedColor" class="form-select">
              <option disabled value="">請選擇商品顏色</option>
              <option v-for="spec in productSpecs" :key="spec.id" :value="spec.color">
                {{ spec.color }}
              </option>
            </select>
<!--            <div class="col-sm-5 pr-sm-0">-->
              <div class="quantity-container">
                <span class="quantity-label">Quantity</span>
                <button class="quantity-btn dec-btn" @click="decrement">-</button>
                <input class="quantity-input" type="number" v-model="product.quantity" min="1">
                <button class="quantity-btn inc-btn" @click="increment">+</button>
                <button class="add-to-cart-btn" @click.prevent="addToCart">Add to Cart</button>
              </div>
          </div>

          <template v-if="!isTracked">
            <button class="btn btn-link text-dark p-0 mb-4 no-underline" @click="submitUpdate(this.UserID,this.reSpecIds)"><i class="far fa-heart me-2"></i>Add to wish list</button>
          </template>
          <template v-if="isTracked">
            <button class="btn btn-link text-dark p-0 mb-4 no-underline" @click="deleteTrack(this.UserID,this.reSpecIds)"><i class="fas fa-heart me-2 text-danger"></i>Delete this wish</button>
          </template>

          <br>
          <ul class="list-unstyled small d-inline-block">

          </ul>
        </div>
      </div>
      <!-- DETAILS TABS-->
      <ul class="nav nav-tabs border-0" id="myTab" role="tablist">
        <li class="nav-item"><a class="nav-link text-uppercase active" id="description-tab" data-bs-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">Description</a></li>
        <li class="nav-item"><a class="nav-link text-uppercase" id="reviews-tab" data-bs-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false">Reviews</a></li>
      </ul>
      <div class="tab-content mb-5" id="myTabContent">
        <div class="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
          <div class="p-4 p-lg-5 bg-white">
            <h6 class="text-uppercase">Product description </h6>
            <p class="text-muted text-sm mb-0">{{reProductDescription}}</p>
          </div>
        </div>
        <div class="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
          <div class="p-4 p-lg-5 bg-white">
            <div class="row">
              <div class="col-lg-8">
                <div class="d-flex mb-3">
                  <div class="flex-shrink-0"><img class="rounded-circle" src="../assets/img/customer-1.png" alt="" width="50"/></div>
                  <div class="ms-3 flex-shrink-1">
                    <h6 class="mb-0 text-uppercase">Peggy Lin</h6>
                    <p class="small text-muted mb-0 text-uppercase">11 April 2024</p>
                    <ul class="list-inline mb-1 text-xs">
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star-half-alt text-warning"></i></li>
                    </ul>
                    <p class="text-sm mb-0 text-muted">金屬質感佳，符合期待!</p>
                  </div>
                </div>
                <div class="d-flex">
                  <div class="flex-shrink-0"><img class="rounded-circle" src="../assets/img/customer-2.png" alt="" width="50"/></div>
                  <div class="ms-3 flex-shrink-1">
                    <h6 class="mb-0 text-uppercase">Ron Wu</h6>
                    <p class="small text-muted mb-0 text-uppercase">10 April 2024</p>
                    <ul class="list-inline mb-1 text-xs">
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star-half-alt text-warning"></i></li>
                    </ul>
                    <p class="text-sm mb-0 text-muted">送貨速度快，包裝仔細，有機會再回購其他產品。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import {useUserStore} from "@/stores/userStore.js";

function injectSvgSprite(path) {
  var ajax = new XMLHttpRequest();
  ajax.open("GET", path, true);
  ajax.send();
  ajax.onload = function(e) {
    var div = document.createElement("div");
    div.className = 'd-none';
    div.innerHTML = ajax.responseText;
    document.body.insertBefore(div, document.body.childNodes[0]);
  }
}

export default {
  data() {
    return {
      colorToSpecIdMap: {},
      item: {
        quantity: 1,
        specId: null,
      },
      product: {
        id: null,
        quantity: 1,  // Default starting quantity
        specId: ''
      },
      selectedColor: '',
      productSpecs:[],
      reProductId: this.$route.query.reProductId,
      reProductName: this.$route.query.reProductName,
      rePrice: this.$route.query.rePrice,
      rePhotoId: this.$route.query.rePhotoId,
      reProductDescription: this.$route.query.reProductDescription,
      reSpecIds: this.$route.query.reSpecIds,
      isTracked: false,
      UserID: null,
      trackDTO: {
        userID: null, // 初始化為空，等待登錄後填充
        specID: null, // 初始化為空，等待需要時填充
      },
    };
  },
  computed: {
    computedSpecId() {
      return this.reSpecIds && this.reSpecIds.length > 0 ? this.reSpecIds[0] : null;
    }
  },
  watch: {
    computedSpecId(newSpecId) {
      this.product.specId = newSpecId;
    }
  },
  methods: {

    increment() {
      this.product.quantity++;
    },
    decrement() {
      if (this.product.quantity > 1) {
        this.product.quantity--;
      }
    },
    async addToCart() {
      console.log('Selected Color:', this.selectedColor);
      console.log('Mapped specId:', this.colorToSpecIdMap[this.selectedColor]);

      if (!this.selectedColor) {
        alert('請選擇商品顏色！');
        return;
      }
      const store = useUserStore();
      if (!store.isLoggedIn) {
        alert('Please log in to add items to your cart.');
        this.$router.push('/login');
        return;
      }

      const payload = {
        userId: store.userId,
        specId: this.colorToSpecIdMap[this.selectedColor],
        quantity: this.product.quantity,
      };
      console.log('Sending to backend:', payload);
      try {
        const response = await axios.post('http://localhost:8080/mall/cart/add', payload);
        console.log('Added to cart successfully:', response.data);
        alert('Added to cart successfully!')
      } catch (error) {
        console.error('Failed to add to cart:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        }
      }
    },
    toggleTrack() {
      this.isTracked = !this.isTracked;
    },
    async updateQuantity(item, newQuantity) {
      if (newQuantity < 1) {
        alert('Quantity cannot be less than 1.');
        return; // Prevent quantity from going below 1
      }
      try {
        const response = await axios.post(`${this.API_URL}/cart/add`, null, {
          params: {
            specId: item.specId,  // Assuming each item has a specId
            quantity: newQuantity  // Passing new quantity directly to the backend
          }
        });
        item.quantity = response.data.quantity; // Update quantity with server response
      } catch (error) {
        console.error('Failed to update cart item:', error);
        alert('Failed to update cart quantity. Please try again.');
      }
    },
    IsSpectRacked(userId, SpecIds) {
      const data = {
        userID: userId,
        specID: SpecIds
      };
      axios
          .post(`${this.API_URL}/check/track`, data)
          .then((response) => {
            console.log(response);
            this.isTracked = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    submitUpdate(userId, SpecIds) {
      const data = {
        userID: userId,
        specID: SpecIds
      };
      axios
          .post(`${this.API_URL}/create/track`, data)
          .then((response) => {
            console.log(response);
            this.isTracked = true;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    deleteTrack(userId, SpecIds) {
      this.trackDTO.userID =userId;
      this.trackDTO.specID =SpecIds;
      console.log(userId, SpecIds);
      axios.delete(`${this.API_URL}/Dedelete/track`,{
        data: this.trackDTO,
      })
          .then((response) => {
            console.log(response);
            this.isTracked = false;
          })
          .catch((error) => {
            console.error('Error deleting:', error);
            alert("取消失敗：" + error.message);
          });
    },
  },
  mounted() {
    console.log("Query Parameters:", this.$route.query);
    const reSpecIds = this.$route.query.reSpecIds;

    if (!reSpecIds) {
      console.error("No specIds found in the route query.");
      return;
    }

    const spId = Array.isArray(reSpecIds) ? reSpecIds : JSON.parse(reSpecIds);
    console.log("Parsed specIds:", spId);

    const userStore = useUserStore();
    if (userStore.isLoggedIn) {
      this.IsSpectRacked(userStore.userId, spId[0]);
      this.UserID = userStore.userId;
    } else {
      console.log("會員未登入");
    }

    // Continuing with the requests if spId is defined
    if (spId && spId.length > 0) {
      const requests = spId.map(specId => {
        return axios.get(`http://localhost:8080/mall/products/findProductSpecBySpecId/${specId}`);
      });
      console.log('All requests resolved:', requests);
      Promise.all(requests)

          .then(responses => {
            responses.forEach((response, index) => {
              console.log(`Response for specId ${spId[index]}:`, response.data);
              this.productSpecs[index] = response.data;
              this.colorToSpecIdMap[response.data.color] = response.data.specId;
              console.log("colorToSpecIdMap",this.colorToSpecIdMap);
            });
            console.log('Color to Spec ID Map:', this.colorToSpecIdMap);
            // Ensure productSpecId is set correctly
            this.product.specId = spId[0];
          })
          .catch(error => {
            console.error('Error with specId requests:', error);
          });
    } else {
      console.error("SpecIds array is empty or undefined.");
    }
  }

}
</script>

<style>
.text-danger {
  color: red; /* Or use any specific shade of red you prefer */
}
.no-underline {
  text-decoration: none !important;
}
.quantity-container {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: white;
  border: 1px solid #dee2e6; /* You can change this color to match your design */
  display: flex;
  align-items: center;
}

.quantity-label {
  margin-right: 0.75rem;
  text-transform: uppercase;
  color: #6c757d; /* This is a gray color, adjust as needed */
}

.quantity-btn {
  padding: 0.25rem 0.5rem;
  border: 1px solid #dee2e6; /* Adjust border color as needed */
  background-color: #f8f9fa; /* Light background for the button, change as needed */
  cursor: pointer;

}

.dec-btn {
  /* Styles for decrement button, if needed */
}

.inc-btn {
  /* Styles for increment button, if needed */
}

.quantity-input {
  width: 3rem; /* Adjust width as needed */
  text-align: center;
  margin: 0 0.5rem;
  border: 1px solid #ced4da; /* Input border color, adjust as needed */
}
/* For Chrome, Safari, Edge, Opera */
.quantity-input::-webkit-inner-spin-button,
.quantity-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* For Firefox */
.quantity-input[type=number] {
  -moz-appearance: textfield;
}
.add-to-cart-btn {
  flex-grow: 1; /* This will allow the button to take up the remaining space */
  padding: 0.5rem 1rem;
  color: white;
  background-color: #586074; /* Adjust to match your primary button color */
  border: none;
  cursor: pointer;
  margin-left: 16px; /* Adjust the left margin to create more space */
  flex-grow: 1; /* This will make the button expand to fill available space */
}

/* Add responsive design if necessary */
@media (max-width: 768px) {
  .quantity-container {
    /* Adjust styles for mobile if needed */
  }
}


</style>
