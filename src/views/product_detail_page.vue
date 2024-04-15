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
          <ul class="list-inline mb-2 text-sm">
            <li class="list-inline-item m-0"><i class="fas fa-star small text-warning"></i></li>
            <li class="list-inline-item m-0 1"><i class="fas fa-star small text-warning"></i></li>
            <li class="list-inline-item m-0 2"><i class="fas fa-star small text-warning"></i></li>
            <li class="list-inline-item m-0 3"><i class="fas fa-star small text-warning"></i></li>
            <li class="list-inline-item m-0 4"><i class="fas fa-star small text-warning"></i></li>
          </ul>
          <h1>{{ reProductName }}</h1>
          <p class="text-muted lead">${{ rePrice }}</p>
          <p class="text-sm mb-4">{{ reProductDescription }}</p>
          <div class="row align-items-stretch mb-4">

<!--            <div class="col-sm-5 pr-sm-0">-->
              <div class="quantity-container">
                <span class="quantity-label">Quantity</span>
                <button class="quantity-btn dec-btn" @click="decrement">-</button>
                <input class="quantity-input" type="number" v-model="product.quantity" min="1">
                <button class="quantity-btn inc-btn" @click="increment">+</button>
                <button class="add-to-cart-btn" @click.prevent="addToCart">Add to Cart</button>
              </div>
<!--            </div>-->


          </div><a class="text-dark p-0 mb-4 d-inline-block" href="#!"><i class="far fa-heart me-2"></i>Add to wish list</a><br>
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
                    <h6 class="mb-0 text-uppercase">Jason Doe</h6>
                    <p class="small text-muted mb-0 text-uppercase">20 May 2020</p>
                    <ul class="list-inline mb-1 text-xs">
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star-half-alt text-warning"></i></li>
                    </ul>
                    <p class="text-sm mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                </div>
                <div class="d-flex">
                  <div class="flex-shrink-0"><img class="rounded-circle" src="../assets/img/customer-2.png" alt="" width="50"/></div>
                  <div class="ms-3 flex-shrink-1">
                    <h6 class="mb-0 text-uppercase">Jane Doe</h6>
                    <p class="small text-muted mb-0 text-uppercase">20 May 2020</p>
                    <ul class="list-inline mb-1 text-xs">
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                      <li class="list-inline-item m-0"><i class="fas fa-star-half-alt text-warning"></i></li>
                    </ul>
                    <p class="text-sm mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
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
      item: {
        quantity: 1,
        specId: null,
      },

      product: {
        id: null,
        quantity: 1,  // Default starting quantity
        specId: ''
      },
      reProductId: this.$route.query.reProductId,
      reProductName: this.$route.query.reProductName,
      rePrice: this.$route.query.rePrice,
      rePhotoId: this.$route.query.rePhotoId,
      reProductDescription: this.$route.query.reProductDescription,
      reSpecIds: this.$route.query.reSpecIds
    };
  },
  computed: {
    // This computed property ensures that specId is reactive and updates correctly
    computedSpecId() {
      return this.reSpecIds && this.reSpecIds.length > 0 ? this.reSpecIds[0] : null;
    }
  },
  watch: {
    // Whenever reSpecIds changes, update the product.specId reactively
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
      const store = useUserStore();
      if (!store.isLoggedIn) {
        alert('Please log in to add items to your cart.');
        this.$router.push('/login');
        return;
      }

      const payload = {
        userId: store.userId,
        specId: this.product.specId,
        quantity: this.product.quantity

      };

      console.log('Sending to backend:', payload);

      try {
        const response = await axios.post('http://localhost:8080/mall/cart/add', payload);
        console.log('Added to cart successfully:', response.data);
      } catch (error) {
        console.error('Failed to add to cart:', error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        }
      }
    }
  },
  mounted() {
    console.log(this.$route.query.reSpecIds); // Check what is received
    // If reSpecIds is received as a string, you might need to parse it:
    if (typeof this.$route.query.reSpecIds === 'string') {
      this.product.specId = JSON.parse(this.$route.query.reSpecIds)[0];
    } else {
      this.product.specId = this.$route.query.reSpecIds[0];
    }
  },
}
</script>

<style>
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