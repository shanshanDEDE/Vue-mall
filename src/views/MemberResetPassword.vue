<template>
    <main>
      <main class="container-fluid">
        <div class="row">
          <!-- 左側選項列 -->
          <MemberOption></MemberOption>
          <!-- 主要內容 -->
          <div class="col-md-9">
            <!-- ... 您原本的主要內容代碼 ... -->
            <div
              class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light"
            >
              <div class="col-md-5 p-lg-5 mx-auto my-5">
                <h1 class="display-4 fw-normal">Nono商城</h1>

                
                <div v-if="memberPasswordData">
                  <label>姓名：</label>
                  <input type="text" v-model="memberPasswordData.userName" :disabled="true" />
                </div>

                <div v-if="memberPasswordData">
                  <label>電子信箱:</label>
                  <input type="text" v-model="memberPasswordData.email" :disabled="true" />
                </div>
  
                <div v-if="memberPasswordData">
                <div>
                    <label>密碼:</label>
                    <input type="text" v-model="inputemberPasswordData.password" />
                </div>
                </div>

                <div v-if="memberPasswordData && ResetPasswordData">
                <div>
                    <label>重設密碼:</label>
                    <input type="password" v-model="ResetPasswordData.password" />
                    <!-- 右側提示標籤 -->
                    <label v-if="!ResetPasswordData.password" class="missing-data-label">尚未填寫</label>
                </div> 
                </div>

                <div v-if="memberPasswordData && confirmPasswordData">
                <div>
                    <label>確認密碼:</label>
                    <input type="password" v-model="confirmPasswordData.password" />
                    <!-- 右側提示標籤 -->
                    <label v-if="!confirmPasswordData.password" class="missing-data-label">尚未填寫</label>
                    <label v-else-if="confirmPasswordData.password !== ResetPasswordData.password && ResetPasswordData.password && confirmPasswordData.password" class="missing-data-label">密碼錯誤</label>
                    
                </div> 
                </div>

<!-- 
                <div v-if="memberPasswordData">
                <div>
                    <label>密碼:</label>
                    <input type="text" v-model="inputmemberdata.userAddress" />
                    <label v-if="shouldShowMissingLabel(memberdata.userAddress,inputmemberdata.userAddress)" class="missing-data-label">尚未有過資料 建議填寫!</label>
                </div>
                </div> -->
  


                <div>
                <div>
                    <input v-model="VerificationCode"></input>
                    <button type="primary" @click="sendCode" :disabled="disableSend">取得驗證碼</button>
                </div>
                </div>

              </div>

                  <button @click="submitUpdate">重設密碼</button>  <img v-if = "VerificationCodePass" src="/greentick.jpg"/>
              <img v-if = "!VerificationCodePass" src="/wrong.jpg"/>



              </div>
            </div>
          </div>
        
        <div class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="/1.webp" class="d-block w-100" />
            </div>
            <div class="carousel-item">
              <img src="/2.webp" class="d-block w-100" />
            </div>
            <div class="carousel-item">
              <img src="/3.webp" class="d-block w-100" />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </main>
    </main>
  </template>
  
  <script>
  import MemberOption from "@/components/MemberOption.vue";
  import axios from "axios";
  export default {
    data() {
      return {
        memberPasswordData: null,
        inputemberPasswordData: {password: ''},
        ResetPasswordData: {password: ''},
        confirmPasswordData: {password: ''},
        email: '',
        disableSend: false,
        VerificationCode: '',
        VerificationCodePass: false,
      };
    },
    created() {
      this.inputemberPasswordData.password = "";
      this.ResetPasswordData.password = "";
      this.confirmPasswordData.password = "";
    },
    components: {
      MemberOption,
    },
    methods: {
      getMemberPasswordData() {
        const userId = 2;
        axios
          .get(`${this.API_URL}/member/showrepassworddata?userId=${userId}`)
          .then((response) => {
            console.log(response);
            this.memberPasswordData = response.data;
            this.email = response.data.email
          })
          .catch((error) => {
            console.log(error);
          });
      },
                                sendCode () {
                                this.disableSend = true;
                                console.log(this.email);
                                axios.post(`${this.API_URL}/register`, { email: this.email })
                                    .then(res => {
                                        console.log(res.data)
                                        if (res.data.status === 'success') {
                                          alert(res.data.message); // 使用 alert 函數顯示成功消息
                                        } else {
                                            alert(res.data.message); // 使用 alert 函數顯示錯誤消息
                                            console.log("想哭rrrrr");
                                            this.disableSend = false;
                                        }
                                    })
                                    .catch(error => {
                                        console.log("想哭");
                                        console.error(error); // 這裡添加錯誤處理，確保錯誤能夠被正確地捕獲和處理
                                        alert('發送驗證碼失敗'); // 使用 alert 函數顯示錯誤消息
                                        this.disableSend = false;
                                    });
                            },

      verifyCodeNumber(){
        axios.post(`${this.API_URL}/verifyCode`, { email: this.email ,code: this.VerificationCode})
          .then(res => {
            console.log(res.data)
            if (res.data.status === 'success') {
              alert(res.data.message,"驗證碼驗證成功"); // 使用 alert 函數顯示成功消息
              this.VerificationCodePass = true;
            } else {
                alert("驗證碼驗證錯誤"); // 使用 alert 函數顯示錯誤消息
              this.VerificationCodePass = false;
            }
          })
          .catch(error => {
            console.error(error); // 這裡添加錯誤處理，確保錯誤能夠被正確地捕獲和處理
            alert('驗證碼的部分發生錯誤!'); // 使用 alert 函數顯示錯誤消息
          });
      },
      submitUpdate(){
        this.verifyCodeNumber();
      },
    },
    mounted() {
      this.getMemberPasswordData();
    },
  };
  </script>
  
  <style></style>
  