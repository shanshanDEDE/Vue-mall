<template>
  <header class="p-3 text-bg-dark mb-3">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <ul
          class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
        >
          <li>
            <router-link to="/" class="nav-link px-2 text-secondary"
              >首頁</router-link
            >
          </li>
          <!-- <li>
            <router-link to="/shop" class="nav-link px-2 text-white"
              >商城</router-link
            >
          </li>
          <li>
            <router-link to="/cart" class="nav-link px-2 text-white"
              >購物車</router-link
            >
          </li>
          <li>
            <router-link to="/orders" class="nav-link px-2 text-white"
              >所有訂單</router-link
            >
          </li>
          <li>
            <router-link to="/order/detail/1" class="nav-link px-2 text-white"
              >訂單細項</router-link
            >
          </li> -->
          <li>
            <router-link to="/member_center" class="nav-link px-2 text-white"
              >會員中心</router-link
            >
          </li>
        </ul>

        <!-- <div class="text-end">
          <router-link
            to="/login"
            class="text-decoration-none"
            v-if="!isLoggedIn"
          >
            <button type="button" class="btn btn-outline-light me-2">
              登入
            </button>
          </router-link>
          <template v-if="isLoggedIn">
            <router-link to="/profile" class="text-decoration-none">
              <button type="button" class="btn btn-warning">
                {{ name }}
              </button></router-link
            >
            <img :src="photo" width="8%" class="mx-2" />

            <button type="button" class="btn btn-outline-light" @click="logout">
              登出
            </button>
          </template>
        </div> -->
      </div>
    </div>
  </header>
</template>
<script>
import { useMemberStore } from "@/stores/memberStore";
import axios from "axios";

export default {
  //   methods: {
  //     logout() {
  //       axios
  //         .get(`${this.API_URL}/logout`)
  //         .then((rs) => {
  //           const memberStore = useMemberStore();
  //           memberStore.logout();
  //           this.$router.push("/");
  //         })
  //         .catch((error) => {
  //           console.log("登出失敗", console.error);
  //         });
  //     },
  //   },
  //   computed: {
  //     id() {
  //       const memberStore = useMemberStore();
  //       return memberStore.memberId;
  //     },
  //     name() {
  //       const memberStore = useMemberStore();
  //       return memberStore.memberName;
  //     },
  //     photo() {
  //       return useMemberStore().memberPhoto;
  //     },
  //     isLoggedIn() {
  //       return useMemberStore().isLoggedIn;
  //     },
  //   },
};
</script>
<style></style>
