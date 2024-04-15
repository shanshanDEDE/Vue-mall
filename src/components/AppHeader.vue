<template>
  <!-- navbar-->
  <header class="header bg-white">
    <div class="container px-lg-3">
      <nav class="navbar navbar-expand-lg navbar-light py-3 px-lg-0"><router-link to="/" class="navbar-brand"><span class="fw-bold text-uppercase text-dark">Apple Tree</span></router-link>
        <button class="navbar-toggler navbar-toggler-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link active">home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/product" class="nav-link active">shop</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/member_center" class="nav-link active">member</router-link>
            </li>

          </ul>
          <ul class="navbar-nav ms-auto">
            <router-link to="/cart" class="nav-link">
            <li class="nav-item"> <i class="fas fa-dolly-flatbed me-1 text-gray"></i>Cart<small class="text-gray fw-normal">(2)</small></li></router-link>
            <li class="nav-item"><a class="nav-link" href="#!"> <i class="far fa-heart me-1"></i><small class="text-gray fw-normal"> (0)</small></a></li>
            <li class="nav-item"><a class="nav-link" href="#!"> <i class="fas fa-user me-1 text-gray fw-normal"></i>Login</a></li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
<!--  <header class="p-3 text-bg-dark mb-3">-->
<!--    <div class="container">-->
<!--      <div-->
<!--        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"-->
<!--      >-->
<!--        <ul-->
<!--          class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"-->
<!--        >-->
<!--          <li>-->
<!--            <router-link to="/" class="nav-link px-2 text-secondary"-->
<!--              >首頁</router-link-->
<!--            >-->
<!--          </li>-->
<!--          <li>-->
<!--            <router-link to="/product" class="nav-link px-2 text-white"-->
<!--            >商城</router-link-->
<!--            >-->
<!--          </li>-->
<!--          &lt;!&ndash;-->
<!--          <li>-->
<!--            <router-link to="/cart" class="nav-link px-2 text-white"-->
<!--              >購物車</router-link-->
<!--            >-->
<!--          </li>-->
<!--          <li>-->
<!--            <router-link to="/orders" class="nav-link px-2 text-white"-->
<!--              >所有訂單</router-link-->
<!--            >-->
<!--          </li>-->
<!--          <li>-->
<!--            <router-link to="/order/detail/1" class="nav-link px-2 text-white"-->
<!--              >訂單細項</router-link-->
<!--            >-->
<!--          </li> &ndash;&gt;-->
<!--          <li>-->
<!--            <router-link to="/member_center" class="nav-link px-2 text-white"-->
<!--              >會員中心</router-link-->
<!--            >-->
<!--          </li>-->
<!--        </ul>-->

<!--        &lt;!&ndash; <div class="text-end">-->
<!--          <router-link-->
<!--            to="/login"-->
<!--            class="text-decoration-none"-->
<!--            v-if="!isLoggedIn"-->
<!--          >-->
<!--            <button type="button" class="btn btn-outline-light me-2">-->
<!--              登入-->
<!--            </button>-->
<!--          </router-link>-->
<!--          <template v-if="isLoggedIn">-->
<!--            <router-link to="/profile" class="text-decoration-none">-->
<!--              <button type="button" class="btn btn-warning">-->
<!--                {{ name }}-->
<!--              </button></router-link-->
<!--            >-->
<!--            <img :src="photo" width="8%" class="mx-2" />-->

<!--            <button type="button" class="btn btn-outline-light" @click="logout">-->
<!--              登出-->
<!--            </button>-->
<!--          </template>-->
<!--        </div> &ndash;&gt;-->
<!--      </div>-->
<!--    </div>-->
<!--  </header> -->
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
