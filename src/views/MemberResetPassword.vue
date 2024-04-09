<template>
  <main class="main-container">
    <MemberOption class="sidebar"></MemberOption>
    <div class="content-container">
      <div class="profile-card">
        <div class="profile-header">
          <h1 class="brand-title">APPLE TREE</h1>
          <p class="brand-slogan">CAREFULLY CREATED COLLECTIONS<br>BROWSE OUR CATEGORIES</p>
        </div>
        <div class="horizontal-divider"></div> <!-- 橫向灰色線 -->
        <div class="form-container">
          <form @submit.prevent="submitUpdate" class="member-form">

                <div v-if="memberPasswordData" class="divider">
                  <label>姓名：</label>
                  <input type="text" v-model="memberPasswordData.userName" :disabled="true" />
                </div>

                <div v-if="memberPasswordData" class="divider">
                  <label>電子信箱:</label>
                  <input type="text" v-model="memberPasswordData.email" :disabled="true" />
                </div>
  
                <div v-if="memberPasswordData" class="divider">
                  <div>
                      <label>密碼:</label>
                      <input type="password" v-model="inputemberPasswordData.password" />
                    <span v-if="sendfirstcode">
                    <img v-if="!IsInputMemberPasswordData" src="/wrong.jpg" class="icon-background" />
                    </span>
                  </div>
                </div>

                <div v-if="memberPasswordData && ResetPasswordData" class="divider">
                  <div>
                      <label>重設密碼:</label>
                      <input type="password" v-model="ResetPasswordData.password" />
                      <img v-if="!this.ResetPasswordData.password" src="/wrong.jpg" class="icon-background" />
                      <!-- 右側提示標籤 -->
                      <label v-if="!ResetPasswordData.password" class="missing-data-label">尚未填寫</label>
                  </div>
                </div>

                <div v-if="memberPasswordData && confirmPasswordData" class="divider">
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
                    驗證碼:<input v-model="VerificationCode" class="divider"></input>
                    <span v-if="sendFirstVerificationCode">
                    <img :src="VerificationCodePass ? '/greentick.jpg' : '/wrong.jpg'" class="icon-background" />
                    </span>
                      <br>
                    <button type="primary" @click="sendCode" :disabled="disableSend" class="submit-button">取得驗證碼</button>
                    <button @click="submitUpdate" :disabled="disableupdate" class="submit-button">重設密碼</button>
                  </div>
                </div>

    </form>
    </div>
    </div>
    </div>
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
        disableupdate: false,
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
                  alert("驗證碼驗證成功");
                  this.VerificationCodePass = true;
                  resolve(true);

                } else {
                  alert("驗證碼驗證錯誤");
                  this.VerificationCodePass = false;
                  reject(false);

                }
              })
              .catch(error => {
                console.error(error);
                alert('驗證碼的部分發生錯誤!');
                this.VerificationCodePass = false; // 當驗證失敗時設置為 false
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
                  reject(false); // 解决 Promise 为 false

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
        if (this.disableupdate) return; // 如果正在进行更新操作，直接返回防止再次提交

        this.disableSend = true;  // 应该禁用发送按钮，直到操作完成
        this.disableupdate = true; // 确保提交按钮在操作过程中禁用

        try {
          const codeVerified = await this.verifyCodeNumber();
          if (!codeVerified) throw new Error('驗證碼驗證失敗');

          const passwordCorrect = await this.oringPassword();
          if (!passwordCorrect) throw new Error('原始密碼不正確');

          const passwordConfirmed = this.confirmAndResetPassword();
          if (!passwordConfirmed) throw new Error('密碼重設與確認不符');

          await axios.put(`${this.API_URL}/update/memberRePasswordDTO`, {
            userID: this.memberRePasswordDTO.userID,
            password: this.ResetPasswordData.password
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

          alert('重設密碼成功!');
        } catch (error) {
          console.error(error);
          alert(error.message);
        } finally {
          this.disableSend = false; // 恢复发送按钮
          this.disableupdate = false; // 恢复提交按钮
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

  <style scoped>
  .icon-background {
    display: inline-block; /* 或其他适合的显示方式 */
    width: 20px;
    height: 20px;
    background-size: cover;
    background-position: center;
  }
  .main-container {
    display: flex;
    min-height: 100vh;
  }

  .sidebar {
    width: 250px;
    background-color: #333;
    padding: 20px;
    color: white;
    display: flex;
    flex-direction: column;
  }

  .content-container {
    flex-grow: 1;
    padding: 20px;
    background-color: #f8f9fa;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .profile-card {
    width: 100%;
    max-width: 700px; /* 設定最大寬度 */
    padding: 20px;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .profile-header {
    text-align: center;
    margin-bottom: 30px;
  }

  .brand-title {
    font-size: 2.5em;
    color: #333;
  }

  .brand-slogan {
    font-size: 1em;
    color: #666;
  }

  .member-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }


  .missing-data-label {
    color: red;
    margin-bottom: 15px;
    font-size: 12px;
    margin-top: 10px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
  }

  .form-group input[type="text"],
  .form-group input[type="password"],
  .form-group input[type="email"],
  .form-group input[type="tel"] {
    width: calc(100% - 20px);
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }


  /* 如果footer覆蓋到了內容，你可能需要添加一些底部邊距 */
  .content-container {
    margin-bottom: 50px; /* 根據實際footer高度調整 */
  }

  .divider{
    margin-top: 10px;
  }

  .horizontal-divider {
    width: 100%;
    height: 1px;
    background-color: #ccc; /* 淡灰色背景色 */
    margin-bottom: 20px; /* 根據需要增加下邊距 */
  }



  /* 表單輸入框的樣式 */
  .input-wrapper input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
  }


  button:hover {
    background-color: #0056b3;
  }

  </style>
