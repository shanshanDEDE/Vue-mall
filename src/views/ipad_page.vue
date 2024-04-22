<template>
  <main>
    <category></category>
    <hr />
    <div class="py-1 bg-light">
    <div class="row justify-content-end align-items-center">
      <div class="col-auto">
        <label for="inputPassword6" class="col-form-label">名稱</label>
      </div>
      <div class="col-auto">
        <input type="text" class="control1" v-model="searchKeyWord" @keyup.enter="goKeywordSearch"/>
      </div>
      <div class="col-auto">
        <button class="btn-custom" @click="goKeywordSearch">查詢</button>
      </div>
      <div class="col-2">
        <select
            v-model="sortBy"
            @change="sortCart"
            id="sortSelect"
            class="form-select"
        ><option value="預設">預設排序</option>
          <option value="價格低至高">價格低至高</option>
          <option value="價格高至低">價格高至低</option>
        </select>
      </div>
    </div>


      <div class="container">
        <div class="row">
          <div class="col">
            <ul class="pagination justify-content-center custom-pagination">
              <li class="page-item">
                <button class="page-link" @click="prevPage">
                  <span>&laquo;</span>
                </button>
              </li>
              <li class="page-item" v-for="p of showPageBar" :key="p" @click="goToPage(p)" :class="{ active: p === currentPage }">
                <button class="page-link">{{ p }}</button>
              </li>

              <li class="page-item">
                <button class="page-link" @click="nextPage">
                  <span>&raquo;</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <p class="text-center">iPad</p>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 text-center">
          <div class="col" v-for="p in products" :key="p.productId">
            <div class="card shadow-sm">
              <router-link to="/product/detail" @click="redirectToSpec(p)">
                <div>
                  <img :src="`http://localhost:8080/mall/product/photo/${p.photoId}`" class="card-img-top" alt="Product Image" style="height: 300px; width: 100%; object-fit: contain " />
                  <p class="card-text mt-2 px-3 text-truncate">{{ p.productName }}</p>
                </div>
              </router-link>
              <div class="d-flex justify-content-between align-items-center">
                <div class="m-3">NTD$:{{ p.price }}</div>
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
import "@/assets/shop.css";

import category from "@/components/category.vue";

export default {
  components: {

    category
  },
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
        keywordSearchActive: false,
        sortBy: "預設",
      };
  },
  mounted() {
    window.a = this
    axios.get(`http://localhost:8080/mall/products/findProductsByCategoryId?categoryId=C&pageNumber=0`).then((rs) => {
      console.log(rs.data)

      this.currentPage =rs.data.number+1;
      this.totalPage = rs.data.totalPages;
      this.products = rs.data.content;
    });
  },
  computed: {
    showPageBar() {
      const cp = this.currentPage;
      const tp = this.totalPage;
      let arr = [];

      if (tp === 1) {
        arr.push(1);
        return arr;
      }

      arr.push(1);
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
    }

  },
  methods: {
    goToPage(p) {
      if (p == "..") {
        return
      }
      this.currentPage = p;
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
    },
    goKeywordSearch() {
      axios.get(`http://localhost:8080/mall/products/searchProduct/0?categoryId=C&productName=${this.searchKeyWord}`).then((rs) => {
        this.currentPage = rs.data.number + 1;
        this.totalPage = rs.data.totalPages;
        this.products = rs.data.content;
        this.keywordSearchActive = true //建立搜尋狀態
      })
    },
    prevPage() {
      if(this.currentPage>1){
        this.currentPage--;
      }
    },
    nextPage() {
      if(this.currentPage<this.totalPage){
        this.currentPage++;
      }
    },
    sortCart() {
      if (this.sortBy === "價格低至高") {
        this.products.sort((a, b) => a.price - b.price)
      } else if (this.sortBy === "價格高至低") {
        this.products.sort((a, b) => b.price - a.price);
      }else if (this.sortBy === "預設") {
        this.init();
      }
    }
  },
  watch: {
    currentPage(newVal, oldVal) {
      let newPage = newVal - 1  //頁碼變化時重新計算currentPage(解決無法讀取第0頁面的狀況)

      if (this.keywordSearchActive == true) {  //若已開始搜尋狀態則走搜尋調用的後端方法
        axios.get(`http://localhost:8080/mall/products/searchProduct/${newPage}?categoryId=C&productName=${this.searchKeyWord}`).then((rs) => {
          this.currentPage = rs.data.number + 1;
          this.totalPage = rs.data.totalPages;
          this.products = rs.data.content;
        })
        this.keywordSearchActive = true

      } else {    //一般的商品頁面
        axios.get(`http://localhost:8080/mall/products/findProductsByCategoryId?categoryId=C&pageNumber=${newPage}`).then((rs) => {
          this.totalPage = rs.data.totalPages;
          this.products = rs.data.content;

        })
      }
    }
  },
};
</script>
<style></style>