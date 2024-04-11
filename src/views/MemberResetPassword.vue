<template>
  <main class="main-container">
    <MemberOption class="sidebar"></MemberOption>
    <div class="content-container">
      <div class="profile-card">
        <div class="profile-header">
          <h1 class="brand-title">APPLE TREE</h1>
          <h1 class="display-4 fw-normal">會員密碼修改</h1>

        </div>
        <div class="horizontal-divider"></div> <!-- 橫向灰色線 -->
        <div class="startdiv"> (<span class="start">*</span> 為必填欄位)</div>
        <div class="form-container">
          <form @submit.prevent="submitUpdate" class="member-form">

            <div v-if="memberPasswordData" class="form-group">
              <label for="userName">姓名</label>
              <input type="text" id="userName" v-model="memberPasswordData.userName" :disabled="true" />
            </div>

                <div v-if="memberPasswordData" class="form-group">
                  <label>電子信箱</label>
                  <input type="text" v-model="memberPasswordData.email" :disabled="true" />
                </div>

                <div v-if="memberPasswordData" class="form-group">
                      <label>密碼<span class="start">*</span></label>
                      <input type="password" v-model="inputemberPasswordData.password" />
                  <div class="icon-label-group">
                    <template v-if="sendfirstcode">
                    <img v-if="!IsInputMemberPasswordData" src="/wrong.jpg" class="icon-background" />
                      <label v-if="!confirmPasswordData.password" class="missing-data-label">密碼錯誤</label>
                    </template>
                  </div>
                </div>

                <div v-if="memberPasswordData && ResetPasswordData" class="form-group">
                      <label>重設密碼<span class="start">*</span></label>
                      <input type="password" v-model="ResetPasswordData.password" />
                  <div class="icon-label-group">
                      <img v-if="!this.ResetPasswordData.password" src="/wrong.jpg" class="icon-background" />
                      <label v-if="!ResetPasswordData.password" class="missing-data-label">尚未填寫</label>
                  </div>
                </div>

                <div v-if="memberPasswordData && confirmPasswordData" class="form-group">
                      <label>確認密碼<span class="start">*</span></label>
                      <input type="password" v-model="confirmPasswordData.password" />

                  <div class="icon-label-group">
                    <img :src="IsConfirmPassword ? '/greentick.jpg' : '/wrong.jpg'" class="icon-background" />
                    <label v-if="!confirmPasswordData.password" class="missing-data-label">尚未填寫</label>
                    <label v-else-if="confirmPasswordData.password !== ResetPasswordData.password && ResetPasswordData.password && confirmPasswordData.password" class="missing-data-label">密碼錯誤</label>
                  </div>

                </div>
                <div>
                  <div>
                    <div class="vinput">
                      <div>驗證碼<span class="start">*</span> </div>
                      <input type="text" v-model="VerificationCode"/>
                      <span v-if="sendFirstVerificationCode">
                      <img :src="VerificationCodePass ? '/greentick.jpg' : '/wrong.jpg'" class="icon-background" />
                      <label class="missing-data-label">驗證碼錯誤</label>
                      </span>
                    </div>
                      <br>
                    <div class="button-group">
                      <button type="primary" @click="sendCode" :disabled="disableSend" class="myButton vbutton">取得驗證碼</button>
                      <button @click="submitUpdate" :disabled="disableupdate" class="myButton">重設密碼</button>
                    </div>
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
                alert('驗證碼發送錯誤!');
                this.VerificationCodePass = false; // 當驗證失敗時設置為 false
                reject(error);
              });
        });
      },
      confirmAndResetPassword() {
        if (this.ResetPasswordData.password && this.confirmPasswordData.password) {
          if (this.confirmPasswordData.password !== this.ResetPasswordData.password) {
            this.IsConfirmPassword = false;
            alert("密碼重設與確認不符"); // 使用 alert 函數顯示成功消息
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
                  alert('原密碼錯誤!');
                  reject(false); // 解决 Promise 为 false

                }
              })
              .catch(error => {
                console.error(error);
                alert('原密碼發送錯誤!');
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
         // alert(error.message);
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
  margin: 0; /* 移除任何外邊距 */
}


.icon-label-group {
  display: flex; /* 啟用flexbox */
  align-items: center; /* 垂直居中對齊 */
  gap: 10px; /* 圖標和標籤之間的間隔 */
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
  font-size: 12px;
  margin: 0; /* 移除任何外邊距，根據需要進行調整 */
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
.myButton{
  background-color: white; /* For example, a green button */
  border-color: black;
  color: black;
  padding: 10px 20px; /* Sufficient padding for a button */
  border-radius: 25px; /* Rounded corners like other inputs */
  cursor: pointer; /* Cursor pointer to indicate it's clickable */
  font-size: 16px; /* Slightly larger font size for better visibility */
  font-weight: bold; /* Bold text for emphasis */
  text-transform: uppercase; /* Uppercase text for a formal appearance */
  margin-top: 10px; /* Top margin to give space from previous elements */
  margin-left: 10px;
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */

}


button:hover {
  background-color: black; /* Darker green on hover */
  color: white;
}

.member-form {
  display: flex;
  flex-direction: column; /* This ensures the stacked layout */
}

.form-group {
  display: flex;
  flex-direction: column; /* 使標籤在輸入框上方 */
  margin-bottom: 20px; /* 為每個表單組添加底部邊距 */
  width: 100%; /* 表單組寬度為100% */
}

.form-group label {
  margin-bottom: 5px; /* 標籤和輸入框之間的間隔 */
}

.form-group input {
  padding: 10px; /* 輸入框的內填充 */
  border: 1px solid #ced4da; /* 邊框顏色和樣式 */
  border-radius: 4px; /* 邊框圓角 */
  font-size: 1rem; /* 文本大小 */
}


.start{
  color: red;
}
.startdiv{
  display: block; /* 確保它是塊級元素 */
  text-align: right; /* 文字向右對齊 */
  margin-left: auto; /* 左邊距自動，推到右側 */
  margin-right: 20px; /* 右邊距保留一些空間 */
}


.myButton {
  border: 2px solid black;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: white; /* For example, a green button */
  color: black;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  display: block; /* 確保它是塊級元素 */

  margin: 0; /* 移除margin，由.button-group的gap控制間隔 */
  width: auto; /* 防止按鈕被拉伸填滿整個容器 */
}

.myButton:hover {
  background-color: black; /* Darker green on hover */
  color: white;
}

.vbutton{
  margin-right: 10px;
}
.vinput{
  width: 200px;
  margin-left: 20px;
}

.button-group {
  display: flex;
  justify-content: center; /* 水平居中 */
  gap: 10px; /* 按鈕之間的間隔 */
  margin-top: 10px;
}

@media (max-width: 600px) {
  .button-group {
    flex-direction: column;
  }
}

</style>
