<template>

  <main>
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row px-4 px-lg-5 py-lg-4 align-items-center">
          <div class="col-lg-6">
            <h1 class="h2 text-uppercase mb-0">shop</h1>
          </div>
          <div class="col-lg-6 text-lg-end">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb justify-content-lg-end mb-0 px-0 bg-light">
                <li class="breadcrumb-item"><router-link to="/" class="text-dark" >Home</router-link></li>
                <li class="breadcrumb-item active" aria-current="page"><router-link to="/product" class="text-dark">Shop</router-link>  </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>
    <div class="container mb-3">
      <div class="row align-items-center text-center">
        <div class="col-1">
          <label for="inputPassword6" class="col-form-label">名稱</label>
        </div>
        <div class="col-4">
          <input type="text" class="form-control" v-model="searchKeyWord" />
        </div>

<!--        <div class="col-1">-->
<!--          <label for="inputPassword6" class="col-form-label">價格</label>-->
<!--        </div>-->
<!--        <div class="col-2">-->
<!--          <input type="number" class="form-control" placeholder="最小值" min="0" />-->
<!--        </div>-->
<!--        <div class="col-2">-->
<!--          <input type="number" class="form-control" placeholder="最大值" min="0" />-->
<!--        </div>-->
        <div class="col-2">
          <button class="btn btn-primary" @click="goKeywordSearch">查詢</button>
        </div>
      </div>
    </div>
    <hr />
    <div class="py-1 bg-light">
      <div class="container">
        <div class="row">
          <div class="col">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <button class="page-link">
                  <span>&laquo;</span>
                </button>
              </li>
              <li class="page-item," v-for="p of showPageBar" @click="goToPage(p)"
                  :class="{ active: p == currentPage }">
                <button class="page-link">{{ p }}</button>
              </li>

              <li class="page-item">
                <button class="page-link">
                  <span>&raquo;</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 text-center">
          <div class="col" v-for="p in products" :key="p.productId">
            <div class="card shadow-sm">
              <router-link to="/product/detail" @click="redirectToSpec(p)">
                <div>
              <img :src="`http://localhost:8080/mall/product/photo/${p.photoId}`" class="card-img-top" alt="Product Image" style="height: 300px; width: 100%; object-fit: contain "/>
              <p class="card-text mt-2 px-3 text-truncate">
                {{ p.productName }}
              </p>
                </div>
              </router-link>
              <div class="d-flex justify-content-between align-items-center">
                <div class="m-3">價格:{{ p.price }}</div>
                <div class="m-3">
                  <button type="button" class="btn btn-sm btn-outline-secondary m-2">
                    <i class="fa-solid fa-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      currentPage: 1,
      totalPage: 0,
      products: {
        productId: '',
        productName: '',
        price: '',
        photoId: '',
        productDescription: '',
        specIds:[],
      },
      searchPage:0,

      searchKeyWord: '',
      keywordSearchActive: false
    };
  },
  mounted() {
    window.a = this
    axios.get(`http://localhost:8080/mall/products/0`).then((rs) => {

      this.currentPage =rs.data.number+1;
      this.totalPage = rs.data.totalPages;
      this.products = rs.data.content;
      console.log(rs.data.content)
     });


  },
  computed: {
    showPageBar() {
      const cp = this.currentPage;
      const tp = this.totalPage;
      let arr = [1];
      if (cp > 4) {
        arr.push("..")
      }
      for (let i = cp - 2; i <= cp + 2; i++) {
        if (i > 1 && i < tp) {
          arr.push(i)
        }
      };
      if (cp < tp - 3) {
        arr.push("..")
      }
      arr.push(tp);
      return arr;
    },
    showSearchPageBar() {
      const sp = this.searchPage;
      const tp = this.totalPage;
      let arr = [1];
      if (sp > 4) {
        arr.push("..")
      }
      for (let i = sp - 2; i <= sp + 2; i++) {
        if (i > 1 && i < tp) {
          arr.push(i)
        }
      };
      if (sp < tp - 3) {
        arr.push("..")
      }
      arr.push(tp);
      return arr;
    },

  },
  methods: {
    goToPage(p) {
      if (p == "..") {
        return
      }
      this.currentPage = p;
    },
    //關鍵字查詢
    goKeywordSearch() {
      axios.get(`http://localhost:8080/mall/products/findFilterProductByPage/0?productName=${this.searchKeyWord}`).then((rs) => {
        this.currentPage =rs.data.number+1;
        this.totalPage = rs.data.totalPages;
        this.products = rs.data.content;
        this.keywordSearchActive = true //建立搜尋狀態
      })

    },
    redirectToSpec(product) {
      this.$router.push({
        path: '/product/detail',
        query: {
          reProductId: product.productId,
          reProductName: product.productName,
          rePrice: product.price,
          rePhotoId: product.photoId,
          reProductDescription: product.productDescription,
          reSpecIds: product.specIds
        }
      });
    }


  },
  watch: {
    currentPage(newVal, oldVal) {
      let newPage = newVal - 1  // 頁碼變化時重新計算currentPage(解決無法讀取第0頁面的狀況)

      if(this.keywordSearchActive==true){  //若已開始搜尋狀態則走搜尋調用的後端方法
        axios.get(`http://localhost:8080/mall/products/findFilterProductByPage/${newPage}?productName=${this.searchKeyWord}`).then((rs) => {
          this.currentPage =rs.data.number+1;
          this.totalPage = rs.data.totalPages;
          this.products = rs.data.content;
        })
        this.keywordSearchActive = true

      }else{    //一般的商品頁面
        axios.get(`http://localhost:8080/mall/products/${newPage}`).then((rs) => {
          this.totalPage = rs.data.totalPages;
          this.products = rs.data.content;
        })
      }
    },


  }

};
</script>
<style></style>