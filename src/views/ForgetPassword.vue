<template>
  <main class="vh-80" style="background-color: #eee">
    <div class="container h-80">
      <div class="row d-flex justify-content-center align-items-center h-80">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    輸入以下資料以找回密碼
                  </p>

                  <form class="mx-1 mx-md-4">
                    <div class="d-flex flex-row align-items-center mb-4">
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          id="form3Example3c"
                          class="form-control"
                          v-model="email"
                          required
                        />
                        <label class="form-label" for="form3Example3c"
                          >Your Email</label
                        >
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          id="form3Example3c"
                          class="form-control"
                          v-model="phone"
                          required
                        />
                        <label class="form-label" for="form3Example3c"
                          >Your Phone</label
                        >
                      </div>
                    </div>

                    <div
                      class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                    >
                      <button
                        type="button"
                        class="btn btn-primary btn-lg"
                        @click.prevent="sendPwd"
                        :disabled="disableButton"
                      >
                        Submit
                      </button>
                    </div>
                    <div class="text-danger text-center mt-3">
                      {{ message }}
                      <div class="spinner-border spinner-border-sm " role="status" v-if="loading">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>

                  </form>
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
      email: "891001no2@gmail.com",
      phone: "0987654321",
      message: "",
      disableButton: false,
      loading:false,
    };
  },

  methods: {
    sendPwd() {
      const fd = new FormData();
      fd.append("email", this.email);
      fd.append("phone", this.phone);
      this.message = "處理中，請稍等 ";
      this.loading = true;
      this.disableButton = true;
      axios
        .post(`${this.API_URL}/user/mail/pwd`, fd)
        .then((rs) => {
          alert("臨時密碼已寄送至您的信箱，請盡速登入並更改密碼");
          this.$router.push("/login");
        })
        .catch(() => {
          this.message = "信箱或電話錯誤！";
          this.disableButton = false;
          this.loading = false;
        });
    },
  },
};
</script>
<style></style>
