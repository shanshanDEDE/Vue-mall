<template>
  <main class="main-container">
    <MemberOption class="sidebar"></MemberOption>
    <div class="content-container">
      <div class="profile-card">
        <div class="profile-header">
          <h1 class="brand-title">APPLE TREE</h1>
          <h6 class="display-4 fw-normal">新增評論</h6>
          <label>訂單編號：{{ order.orderId }}</label>
        </div>
        <div class="horizontal-divider"></div> <!-- 橫向灰色線 -->

              <div class="container">
                <form @submit.prevent="submitFeedback">
                  <div class="form-group">
                    <label for="feedbackType">類型：</label>
                    <select v-model="feedback.type" id="feedbackType" required>
                      <option value="服務態度">服務態度</option>
                      <option value="商品品質">商品品質</option>
                      <option value="配送速度">配送速度</option>
                      <option value="售後服務">售後服務</option>
                      <option value="其他">其他</option>
                    </select>
                  </div>
                  <p/>
                  <div class="form-group">
                    <label for="feedbackDescription" class="form-label">描述：</label>
                    <textarea v-model="feedback.description" id="feedbackDescription" class="textarea-large" required >配送速度快速，非常滿意</textarea>
                  </div>
                  <button type="submit" class="myButton">提交評論</button>
                </form>
              </div>
            </div>
          </div>
  </main>

  <div class="modal fade" id="blockedAccountModalUp" tabindex="-1" aria-labelledby="blockedAccountModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-light text-black"> <!-- 更改背景颜色和标题颜色 -->
          <h5 class="modal-title" id="blockedAccountModalLabel">提示</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          意見反饋新增成功
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MemberOption from "@/components/MemberOption.vue";
import { useUserStore } from "@/stores/userStore";
import { OrdersFeedbackStore } from "@/stores/OrdersFeedbackStore";
import axios from "axios";

export default {

  components: {
    MemberOption,
  },
  data() {
    const userStore = useUserStore();
    return {
      feedback: {
        type: '',
        description: '',
        orderId: null,
        userId:  userStore.userId,
        feedbackDate: null,
        ordersDetailId: null,
      },
      order: null,
    };
  },
  created() {
    const ordersFeedbackStore = OrdersFeedbackStore();
    this.order = ordersFeedbackStore.order;
    if (!this.order) {
      this.$router.push("/MemberCenter/CustomerFeedbackAdd");
    }
  },
  methods: {
    submitFeedback() {
      const userStore = useUserStore();
      if (!userStore.userId) {
        alert("用戶未登入");
        return;
      }
      this.feedback.userId = userStore.userId;
      this.feedback.orderId = this.order.orderId;
      this.feedback.ordersDetailId = 3;
      this.feedback.feedbackDate = new Date().toISOString(); // 设置当前时间为反馈时间

      console.log(this.feedback.userId);
      console.log(this.feedback.orderId);
      console.log(this.feedback.type);
      console.log(this.feedback.description);

      axios.post(`${this.API_URL}/create/customerFeedbacks`, {
        userID: this.feedback.userId,
        orderID: this.feedback.orderId,
        type: this.feedback.type,
        description: this.feedback.description,
        feedbackDate: this.feedback.feedbackDate,
        ordersDetailId: this.feedback.ordersDetailId,

      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(response => {
            // 处理响应
            var myModal = new bootstrap.Modal(document.getElementById('blockedAccountModalUp'));
            myModal.show();
            this.$router.push('/MemberCenter/MemberFeedback');
          })
          .catch(error => {
            // 处理错误
            alert('新增評論失敗！');
            console.error(error);
          });
    },
  },
  unmounted() {
    // 清空在Store中的订单数据
    const ordersFeedbackStore = OrdersFeedbackStore();
    ordersFeedbackStore.clearOrder();
  }
};
</script>

<style>
.form-group {
  display: flex;
  align-items: flex-start; /* 改變此處，讓items在容器的開始處對齊 */
  margin-bottom: 10px; /* 添加一些底部外邊距 */
}

.form-label {
  margin-right: 10px; /* 添加標籤右側的一些空間 */
  white-space: nowrap; /* 防止標籤折行 */
}

.textarea-large {
  flex-grow: 1; /* textarea佔據剩餘空間 */
  min-height: 150px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  margin-top: 0; /* 設置適當的margin-top，如果需要 */
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
  max-width: 1000px; /* 設定最大寬度 */
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

.horizontal-divider {
  width: 100%;
  height: 1px;
  background-color: #ccc; /* 淡灰色背景色 */
  margin-bottom: 20px; /* 根據需要增加下邊距 */
}

.myButton{
  display: block;
  margin: 0 auto;
  width: max-content;
  background-color: #84C1FF; /* A pleasant green that looks professional */
  color: #3C3C3C; /* White text for better readability */
  padding: 10px 20px; /* Sufficient padding for a button */
  border: none; /* No border to keep it sleek */
  border-radius: 4px; /* Rounded corners like other inputs */
  cursor: pointer; /* Cursor pointer to indicate it's clickable */
  font-size: 16px; /* Slightly larger font size for better visibility */
  font-weight: bold; /* Bold text for emphasis */
  text-transform: uppercase; /* Uppercase text for a formal appearance */
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */
}
button:hover {
  background-color: #0056b3;
}

.myButton {
  padding: 10px 15px;
  border: black 3px solid !important;
  border-radius: 25px;
  background-color: white; /* Darker green on hover */
  color: black;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  display: block; /* 確保它是塊級元素 */
  margin: auto; /* 左邊距自動，推到右側 */
}

.myButton:hover {
  background-color:		black !important; /* For example, a green button */
  color: white;
}
</style>
