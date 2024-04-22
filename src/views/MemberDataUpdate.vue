<template>
  <main>
  <div class="main-container">
    <MemberOption class="sidebar"></MemberOption>
    <div class="content-container">
      <div class="profile-card">
        <div class="profile-header">
          <h1 class="brand-title">APPLE TREE</h1>
          <h1 class="display-4 fw-normal">會員資料修改</h1>
        </div>
        <div class="horizontal-divider"></div> <!-- 橫向灰色線 -->
        <div class="startdiv"> (<span class="start">*</span> 為必填欄位)</div>
        <div class="form-container">
          <form @submit.prevent="submitUpdate" class="member-form">
            <!-- 用戶名表單欄位 -->
            <div class="form-group" v-if="memberdata">
              <label for="userName">姓名<span class="start">*</span></label>
              <input type="text" id="userName" v-model="memberdata.userName" :placeholder="!memberdata.userName ? '必填' : ''" required />
            </div>

            <!-- 電子郵件表單欄位 -->
            <div class="form-group" v-if="memberdata">
              <label for="email">電子郵件</label>
              <input type="email" id="email" v-model="memberdata.email" disabled />
            </div>

            <!-- 註冊日期表單欄位 -->
            <div class="form-group" v-if="memberdata">
              <label for="registerDate">註冊日期</label>
              <input type="text" id="registerDate" v-model="formattedRegisterDate" disabled />
            </div>

            <!-- 使用者地址表單欄位 -->
            <div class="form-group" v-if="memberdata">
              <label for="address">使用者地址</label>
              <input type="text" id="address" v-model="inputmemberdata.userAddress"/>
              <label v-if="shouldShowMissingLabel(memberdata.userAddress,inputmemberdata.userAddress)" class="missing-data-label">尚未有過資料 建議填寫!</label>
            </div>

            <!-- 遞送地址表單欄位 -->
            <div class="form-group" v-if="memberdata">
              <label for="deliverAddress">遞送地址</label>
              <input type="text" id="deliverAddress" v-model="inputmemberdata.deliverAddress" />
              <label v-if="shouldShowMissingLabel(memberdata.deliverAddress,inputmemberdata.deliverAddress)" class="missing-data-label">尚未有過資料 建議填寫!</label>
            </div>

            <!-- 電話表單欄位 -->
            <div class="form-group" v-if="memberdata">
              <label for="phone">電話</label>
              <input type="tel" id="phone" v-model="inputmemberdata.phone"/>
              <label v-if="shouldShowMissingLabel(memberdata.phone,inputmemberdata.phone)" class="missing-data-label">尚未有過資料 建議填寫!</label>
            </div>

            <!-- 提交按鈕 -->
            <div class="form-submit">
              <button type="submit" class="submit-button">提交更新</button>
              <div v-if="showsubmitfalseflag" class="error-message">更新失敗，姓名：尚未填寫</div>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
  </main>

  <div class="modal" v-show="showSuccessModal">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">更新成功</h5>
        <button type="button" class="btn2 " @click="closeSuccessModal">×</button>
      </div>
      <div class="modal-body">
        您的會員資料已成功更新。
      </div>
      <div class="modal-footer">
        <button type="button" class="btn1 btn-primary" @click="closeSuccessModal">確定</button>
      </div>
    </div>
  </div>
</template>

<script>
import MemberOption from "@/components/MemberOption.vue";
import { useUserStore } from "@/stores/userStore"; //user store
import axios from "axios";



export default {
  data() {
    return {
      memberdata: null,
      inputmemberdata: null,
      showsubmitfalseflag: false,
      showSuccessModal: false
    };
  },
  components: {
    MemberOption,
  },
  methods: {
    closeSuccessModal() {
      this.showSuccessModal = false;  // 隐藏模态窗口
    },
    getMemberData(userId) {
      axios
          .get(`${this.API_URL}/member/showmemberredata?userId=${userId}`)
          .then((response) => {
            console.log(response);
            this.memberdata = response.data;
            // 將 inputmemberdata 初始化為資料庫的值
            this.inputmemberdata = {
              userAddress: response.data.userAddress,
              deliverAddress: response.data.deliverAddress,
              phone: response.data.phone
            };
          })
          .catch((error) => {
            console.log(error);
          });
    },
    submitUpdate() {
      if (!this.memberdata.userName) {
        this.showsubmitfalseflag = true;
        return
      }
      // 在此提交表單更新
      console.log("提交更新資訊：", this.memberdata);

      // 將 inputmemberdata 的值更新到 memberdata 中
      //判斷除了memberdata為有值並且inputmemberdata不存在時,才去做更新
      if (!(this.memberdata.userAddress && !this.inputmemberdata.userAddress)) {
        this.memberdata.userAddress = this.inputmemberdata.userAddress;
      }
      if (!(this.memberdata.deliverAddress && !this.inputmemberdata.deliverAddress)) {
        this.memberdata.deliverAddress = this.inputmemberdata.deliverAddress;
      }
      if (!(this.memberdata.phone && !this.inputmemberdata.phone)) {
        this.memberdata.phone = this.inputmemberdata.phone;
      }
      axios
          .put(`${this.API_URL}/update/memberdataupdate`, this.memberdata)
          .then((response) => {
            console.log(response);
            this.showSuccessModal = true;
            this.showsubmitfalseflag = false;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    shouldShowMissingLabel(field, inputfile) {
      return !field && !inputfile;
    },
  },
  mounted() {
    const userStore = useUserStore();
    if (userStore.isLoggedIn) {
      this.getMemberData(userStore.userId);
    } else {
      console.log("會員未登入");
    }
  },
  computed: {
    formattedRegisterDate() {
      if (!this.memberdata || !this.memberdata.registerDate) {
        return ''; // 如果沒有註冊日期，則返回空字符串
      }
      // 將註冊日期轉換為 Date 物件
      const registerDate = new Date(this.memberdata.registerDate);
      // 使用 Date 物件的方法取得年、月、日、時、分
      const year = registerDate.getFullYear();
      const month = ('0' + (registerDate.getMonth() + 1)).slice(-2); // 確保月份是兩位數
      const day = ('0' + registerDate.getDate()).slice(-2); // 確保日期是兩位數
      const hours = ('0' + registerDate.getHours()).slice(-2); // 確保小時是兩位數
      const minutes = ('0' + registerDate.getMinutes()).slice(-2); // 確保分鐘是兩位數
      // 格式化日期時間字串，例如：2024-03-01 00:00
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
  },
};
</script>
<style scoped>
.main-container {
  display: flex;
  min-height: calc(100vh - var(--footer-height));
}

.sidebar {
  width: 250px;
  background-color: #333;
  padding: 20px;
  color: white;
}

.content-container {
  flex-grow: 1;
  display: flex;
  justify-content: center; /* 將內容水平居中 */
  padding: 20px;
  background-color: #f8f9fa;
}

.profile-card {
  width: 100%;
  max-width: 700px; /* 設定最大寬度 */
  margin: auto; /* 上下自動填充，達到垂直居中效果 */
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




.error-message {
  color: red;
  margin-top: 10px;
}
.horizontal-divider {
  width: 100%;
  height: 1px;
  background-color: #ccc; /* 淡灰色背景色 */
  margin-bottom: 20px; /* 根據需要增加下邊距 */
}

.member-form {
  display: flex;
  flex-direction: column; /* This ensures the stacked layout */
}

.form-group {
  margin-bottom: 20px; /* Add some space between each form group */
}

.form-group label {
  display: block; /* Ensures the label is above the input field */
  margin-bottom: 8px; /* Space between the label and the input field */
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="tel"] {
  width: 100%; /* Full width of the container */
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

/* Style the submit button to match the rest of the form */
.submit-button {
  padding: 10px 15px;
  border-color: black;
  border-radius: 25px;
  background-color: white; /* For example, a green button */
  color: black;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  display: block; /* 確保它是塊級元素 */
  margin: auto; /* 左邊距自動，推到右側 */
}

.submit-button:hover {
  background-color: black; /* Darker green on hover */
  color: white;
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.modal-header,
.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
}

.modal-body {
  margin-top: 10px;
  margin-bottom: 10px;
}

.btn1 {
  padding: 10px 15px;
  border: rgba(0, 0, 0, 0) solid 3px !important;
  border-radius: 6px;
  width: 50%;
  background-color:  rgba(0, 0, 0, 0.05); /* For example, a green button */
  color: black;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  display: block; /* 確保它是塊級元素 */
  margin: auto; /* 左邊距自動，推到右側 */
}
.btn1:hover {
  background-color:  rgba(0, 0, 0, 0.15); /* Darker green on hover */
  color: black;
}
.btn2{
border: rgba(0, 0, 0, 0) solid 3px !important;
background-color: white; /* For example, a green button */
color: black;
cursor: pointer;
}
.btn2:hover {
  background-color: rgba(0, 0, 0, 0) !important; /* Darker green on hover */
  color: black;
}


.modal {
  border-color: black !important;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  border: rgba(0, 0, 0, 0) solid 3px !important;
  background: white;
  color: black;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 25%; /* 控制模態框的寬度 */
  max-width: 600px; /* 確保模態框不會超過這個最大寬度 */
  box-sizing: border-box;
}

.modal-title{
  font-weight:  800;
}
</style>

