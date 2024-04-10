<template>
  <main class="container col-xl-10 col-xxl-8 px-4 py-5">
    <div class="row align-items-center g-lg-5 py-5">
      <div class="col-lg-7 text-center text-lg-start">
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="@/assets/img/iphone.png" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="@/assets/img/macbook2.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="@/assets/img/ipad.jpg" class="d-block w-100" alt="...">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="col-md-10 mx-auto col-lg-5">
        <form class="p-4 p-md-5 border rounded-3 bg-light">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="name@example.com"
              v-model="email"
            />
            <label>Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
            <label>Password</label>
          </div>
          <div class="row mb-4">
            <div class="col">
              <!-- Simple link -->
              <a href="/forget">Forgot password?</a>
            </div>
          </div>
          <button class="w-100 btn btn-lg btn-primary" @click.prevent="login">
            SING IN
          </button>
          <div class="text-danger text-center mt-3">{{ message }}</div>

          <hr class="my-4" />
          <div class="text-center">
            <p>Not a member? <a href="/register">Register</a></p>
            <p>or sign up with:</p>

            <button
              type="button"
              class="btn btn-link btn-floating mx-1"
              @click.prevent="gotoGoogleLoginPage"
            >
              <i class="fab fa-google"></i>
            </button>
            <button type="button" class="btn btn-link btn-floating mx-1" @click.prevent="gotoLineLoginPage">
              <i class="fab fa-line"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
<script>
import axios from "axios";
import { useUserStore } from "@/stores/userStore";

export default {
  data() {
    return {
      email: "amy@mail.com",
      password: "12345678",
      message: "",
    };
  },
  methods: {
    login() {
      const fd = new FormData();
      fd.append("email", this.email);
      fd.append("password", this.password);

      axios
        .post(`${this.API_URL}/user/login`, fd)
        .then((rs) => {
          console.log(rs.data.authentication);
          if(rs.data.authentication==3){
            alert("此帳號已遭停權！")
          }else{
            const userStore = useUserStore();
            userStore.loginSuccess(rs.data);
            sessionStorage.setItem("loggedInMember", JSON.stringify(rs.data));
            this.$router.push("/");
          }

        })
        .catch(() => {
          this.message = "登入失敗";
        });
    },
    check() {
      axios.get(`${this.API_URL}/check`).then((rs) => console.log(rs.data));
    },
    gotoGoogleLoginPage() {
      window.location.href = "http://localhost:8080/mall/google-login";
    },
    gotoLineLoginPage() {
      window.location.href = "http://localhost:8080/mall/line-login";
    },
  },
};
</script>
<style></style>
