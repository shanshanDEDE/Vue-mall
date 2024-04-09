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
                    <span v-if="sendfirstcode">
                    <img v-if="!IsInputMemberPasswordData" src="/wrong.jpg" class="icon-background" />
                    </span>
                  </div>
                </div>

                <div v-if="memberPasswordData && ResetPasswordData">
                  <div>
                      <label>重設密碼:</label>
                      <input type="password" v-model="ResetPasswordData.password" />
                      <img v-if="!this.ResetPasswordData.password" src="/wrong.jpg" class="icon-background" />
                      <!-- 右側提示標籤 -->
                      <label v-if="!ResetPasswordData.password" class="missing-data-label">尚未填寫</label>
                  </div>
                </div>

                <div v-if="memberPasswordData && confirmPasswordData">
                  <div>
                      <label>確認密碼:</label>
                      <input type="password" v-model="confirmPasswordData.password" />
                      <img :src="IsConfirmPassword ? '/greentick.jpg' : '/wrong.jpg'" class="icon-background" />
                      <!-- 右側提示標籤 -->
                      <label v-if="!confirmPasswordData.password" class="missing-data-label">尚未填寫</label>
                      <label v-else-if="confirmPasswordData.password !== ResetPasswordData.password && ResetPasswordData.password && confirmPasswordData.password" class="missing-data-label">密碼錯誤</label>
                  </div>
                </div>
                <div>
                  <div>
                    驗證碼:<input v-model="VerificationCode"></input>
                    <span v-if="sendFirstVerificationCode">
                    <img :src="VerificationCodePass ? '/greentick.jpg' : '/wrong.jpg'" class="icon-background" />
                    </span>
                      <br>
                    <button type="primary" @click="sendCode" :disabled="disableSend" class="mr-2">取得驗證碼</button>
                    <button @click="submitUpdate">重設密碼</button>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
      </main>
    </main>
  </template>
  
  <script>
  import MemberOption from "@/components/MemberOption.vue";
  import axios from "axios";
  import {useUserStore} from "@/stores/userStore.js";
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
        IsConfirmPassword: false,
        IsInputMemberPasswordData: '',
        sendfirstcode: false,
        sendFirstVerificationCode: false,
        feedbackDTO: {
          userID: null, // 初始化為空，等待登錄後填充
          orderID: null, // 初始化為空，等待需要時填充
        },
        memberRePasswordDTO:{
          userID: null,
          password: null,
        },
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
    watch: {
      // 監聽ResetPasswordData.password和confirmPasswordData.password的變化
      'ResetPasswordData.password'(newVal, oldVal) {
        this.updateIsConfirmPassword();
      },
      'confirmPasswordData.password'(newVal, oldVal) {
        this.updateIsConfirmPassword();
      },
      'inputemberPasswordData.password'(newVal, oldVal) {
        this.updateInputPassword();
      }
    },
    methods: {
      getMemberPasswordData(userId) {
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
      sendCode() {
        this.disableSend = true;
        console.log(this.email);
        axios.post(`${this.API_URL}/register`, {email: this.email})
            .then(res => {
              console.log(res.data)
              if (res.data.code === 1) {
                alert(res.data.message); // 使用 alert 函數顯示成功消息
              } else {
                alert(res.data.message); // 使用 alert 函數顯示錯誤消息
                this.disableSend = false;
              }
            })
            .catch(error => {
              console.error(error); // 這裡添加錯誤處理，確保錯誤能夠被正確地捕獲和處理
              alert('發送驗證碼失敗'); // 使用 alert 函數顯示錯誤消息
              this.disableSend = false;
            });
      },

      verifyCodeNumber() {
        return new Promise((resolve, reject) => {
          axios.post(`${this.API_URL}/verifyCode`, { email: this.email, code: this.VerificationCode })
              .then(res => {
                this.sendFirstVerificationCode=true;
                if (res.data.code === 1) {
                  //alert(res.data.message, "驗證碼驗證成功");
                  this.VerificationCodePass = true;
                  resolve(true);
                } else {
                  alert("驗證碼驗證錯誤");
                  this.VerificationCodePass = false;
                  resolve(false);
                }
              })
              .catch(error => {
                console.error(error);
                alert('驗證碼的部分發生錯誤!');
                reject(error);
              });
        });
      },
      confirmAndResetPassword() {
        if (this.ResetPasswordData.password && this.confirmPasswordData.password) {
          if (this.confirmPasswordData.password !== this.ResetPasswordData.password) {
            this.IsConfirmPassword = false;
            //alert("密碼不正確"); // 使用 alert 函數顯示成功消息
            return false;
          } else {
            this.IsConfirmPassword = true;
            return true;
          }
        }
        return false; // 确保任何非预期路径都会返回 false
      },
      updateIsConfirmPassword() {
        if (this.ResetPasswordData.password && this.confirmPasswordData.password) {
          if (this.confirmPasswordData.password !== this.ResetPasswordData.password) {
            this.IsConfirmPassword = false;
          } else {
            this.IsConfirmPassword = true;
          }
        }
      },

      updateInputPassword(){
        this.memberRePasswordDTO.password = this.inputemberPasswordData;
      },

      oringPassword() {
        // 注意，这里返回了一个新的 Promise
        return new Promise((resolve, reject) => {
          axios.put(`${this.API_URL}/member/memberInputPassword`, {
            userID: this.memberRePasswordDTO.userID,
            password: this.inputemberPasswordData.password
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
              .then(res => {
                this.sendfirstcode = true;
                if(res.data === true){
                  console.log(res);
                  this.IsInputMemberPasswordData = true;
                  //alert('密碼的部份成功!');
                  resolve(true); // 解决 Promise 为 true
                }else{
                  console.log(res);
                  this.IsInputMemberPasswordData = false;
                  alert('密碼的部份失敗!');
                  resolve(false); // 解决 Promise 为 false
                }
              })
              .catch(error => {
                console.error(error);
                alert('密碼的部分發生錯誤!');
                reject(error); // 拒绝 Promise
              });
        });
      },

      submitUpdate: async function() {
        this.disableSend = false;
        try {
          const codeVerified = await this.verifyCodeNumber();
          if (!codeVerified) {
            throw new Error('驗證碼驗證失敗');
          }

          const passwordCorrect = await this.oringPassword();
          if (!passwordCorrect) {
            throw new Error('原始密碼不正確');
          }

          const passwordConfirmed = this.confirmAndResetPassword();
          if (!passwordConfirmed) {
            throw new Error('密碼重設與確認不符');
          }
          // 如果所有驗證都通過了，則在這裡處理成功的邏輯
          // 例如跳轉到成功頁面或顯示成功信息
            axios.put(`${this.API_URL}/update/memberRePasswordDTO`, {
              userID: this.memberRePasswordDTO.userID,
              password: this.ResetPasswordData.password
            }, {
              headers: {
                'Content-Type': 'application/json'
              }
            })
                .then(res => {
                  if(res.data){
                    console.log(res);
                    alert('重設密碼成功!');
                  }else{
                    console.log(res);
                    alert('重設密碼失敗!');
                  }
                })
                .catch(error => {
                  console.error(error);
                  alert('重設密碼的部分發生錯誤!');
                });

          // 如果所有驗證都通過了，則在這裡處理成功的邏輯
          // 例如跳轉到成功頁面或顯示成功信息
        } catch (error) {
          // 處理任何在上面過程中拋出的錯誤
          alert(error.message); // 顯示錯誤信息
        }
      }
    },
    mounted() {
      const userStore = useUserStore();
      if (userStore.isLoggedIn) {
        this.getMemberPasswordData(userStore.userId);
      } else {
        console.log("會員未登入");
      }
      this.updateIsConfirmPassword();
      this.memberRePasswordDTO.userID = userStore.userId;
    },
  };
  </script>
  
  <style>
  .icon-background {
    display: inline-block; /* 或其他适合的显示方式 */
    width: 20px;
    height: 20px;
    background-size: cover;
    background-position: center;
  }
   .mr-2 {
     margin-right: 8px; /* 或根據需要調整距離 */
     margin-top: 8px;
   }
  input {
    margin-bottom: 16px;
  }
  </style>
  