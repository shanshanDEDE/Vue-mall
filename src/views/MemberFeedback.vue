<template>
  <main class="main-container">
    <MemberOption class="sidebar"></MemberOption>
    <div class="content-container">
      <div class="profile-card">
        <div class="profile-header">
          <h1 class="brand-title">APPLE TREE</h1>
          <h6 class="display-4 fw-normal">我的意見反應</h6>
        </div>
        <div class="horizontal-divider"></div> <!-- 橫向灰色線 -->


        <!-- 交易记录 -->
            <div v-for="feedback in feedbacks" :key="feedback.feedbackID">
              <div class="accordion mb-3" id="accordionExample">
                  <!-- 折叠标题 -->
                  <h2 class="accordion-header accordion" :id="'heading' + feedback.feedbackID">
                    <button
                      class="accordion-button accordion2"
                      type="button"
                      data-bs-toggle="collapse"
                      :data-bs-target="'#collapse' + feedback.feedbackID"
                      aria-expanded="true"
                      :aria-controls="'collapse' + feedback.feedbackID">

                      <div style="flex-grow: 1; display: flex; justify-content: space-between; align-items: center; width: 100%;">
                        <span> 回饋編號:{{feedback.feedbackID}}訂單編號:{{ feedback.orderID }} 反應類別:{{feedback.type }}
                      評價日期:{{ formattedRegisterDate(feedback) }}</span>
                        <span class="order-status-group">狀態:{{
                            feedback.customerFeedbackStatus
                          }}</span>
                      </div>
                    </button>
                  </h2>
                  <!-- 折叠内容 -->
                  <div
                      :id="'collapse' + feedback.feedbackID"
                    class="accordion-collapse collapse"
                      :aria-labelledby="'heading' + feedback.feedbackID"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <div
                        v-for="(product, productIndex) in feedback.productNames"
                        :key="productIndex"
                      >
                        <div class="accordion-body">
                          <div class="member-info-wrapper">
                            <div class="member-info-group">
                              產品名稱: {{ product }} x {{feedback.quantities[productIndex] }}
                            </div>


                            <div class="member-info-grouptwo">
                              價格:{{
                                feedback.prices[productIndex]
                              }}$
                            </div>
                          </div>
                        </div>
                        <div class="horizontal-dividermany"></div> <!-- 橫向灰色線 -->
                      </div>


                      <div class="accordion-body">
                        <div class="member-info-totle-wrapper">
                          <div class="total-amount-wrapper"> <!-- 新增的包裝層，用於居中顯示總金額 -->
                            <div>總金額: {{ calculateTotalAmount(feedback) }}$</div>
                          </div>
                        </div>
                      </div>
                      <div class="horizontal-dividermany"></div> <!-- 橫向灰色線 -->
                      <div class="accordion-body">
                        <div class="member-info-wrapper">
                          <div class="member-info-group">
                            <p>回饋內容: {{ feedback.description }}</p>
                          </div>

                        </div>
                      </div>


                      <template
                        v-if="feedback.customerFeedbackStatus == '等待回覆中'"
                      >
                        <button
                          @click="updateFeedback(feedback)"
                          class="myButton"
                        >
                          更改評論
                        </button>
                      </template>

                      <template
                          v-if="feedback.customerFeedbackStatus == '已回覆'"
                      >
                        <button @click="confirmResolution(feedback)" class="myButton">已解決</button>
                      </template>

                      <div v-if="showModal" class="modal">
                        <div class="modal-content">
                          <h4>確認操作</h4>
                          <p>您確定要將這條反饋標記為「已結案」嗎？</p>
                          <button @click="resolveFeedback" class="yes-button">確定</button>
                          <button @click="cancelResolution" class="yes-button">取消</button>
                        </div>
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
import MemberOption from "@/components/MemberOption.vue";
import axios from "axios";

import {useUserStore} from "@/stores/userStore.js"; // 样式文件路径根据实际情况修改
import { useFeedbackStore } from '@/stores/feedbackStore';

export default {
  components: {
    MemberOption,
  },
  data() {
    return {
      feedbacks: [],
      feedbackDTO: {
        userID: null, // 初始化為空，等待登錄後填充
        orderID: null, // 初始化為空，等待需要時填充
      },
      showModal: false,
      currentFeedback: null,
    };
  },
  methods: {
    confirmResolution(feedback) {
      this.currentFeedback = feedback;
      this.showModal = true;
    },
    resolveFeedback() {
      this.updateFeedbackStatuse(this.currentFeedback);
      this.showModal = false;
    },
    cancelResolution() {
      this.showModal = false;
    },

    fetchFeedbackData(userId) {
      // const userId = 1;
      axios
        .get(`${this.API_URL}/feedbacks/showCustomerFeedbacks?userId=${userId}`)
        .then((rs) => {
          console.log(rs);
          this.feedbacks = rs.data;
        });
    },
    toggleCollapse(feedbackID) {
      this.feedbacks = this.feedbacks.map(fb => ({ ...fb, showDetails: fb.feedbackID === feedbackID ? !fb.showDetails : fb.showDetails }));
    },
    calculateTotalAmount(feedback) {
      if (!feedback.productNames || !Array.isArray(feedback.productNames)) {
        console.error('Expected productNames to be an array', feedback.productNames);
        return 0; // Return 0 or any other fallback value
      }
      return feedback.productNames.reduce((total, _, index) => {
        return total + (feedback.quantities[index] * feedback.prices[index]);
      }, 0);
    },

    updateFeedback(feedback) {
      const feedbackStore = useFeedbackStore();
      feedbackStore.setFeedback(feedback);

      this.$router.push({
        name: 'CustomerFeedbackUpdate',
      });
    },

    updateFeedbackStatuse(feedback) {
      if (confirm("確定要將此訂單標記為已結案嗎？")) {
        axios.put(`${this.API_URL}/update/customerFeedbacksStatus`, {
          ...feedback,
          customerFeedbackStatus: '已解決'
        })
            .then(response => {
              alert('訂單已結案！');
              // 這裡更新前端狀態，不需要重新加載整個頁面，僅更新該筆資料的狀態
              this.feedbacks = this.feedbacks.map(item => {
                if (item.feedbackID === feedback.feedbackID) {
                  return {...item, customerFeedbackStatus: '已結案'};
                }
                return item;
              });
            })
            .catch(error => {
              alert('發生錯誤！');
              console.error(error);
            });
      }
    },

    // deleteFeedback(feedback) {
    //   // 这里添加取消收藏的逻辑
    //   console.log("取消收藏的产品ID:", feedback.feedbackID);
    //   // 例如，发起一个请求到后端取消收藏
    //   this.feedbackDTO.userID = feedback.userID;
    //   this.feedbackDTO.orderID = feedback.orderID;
    //
    //   axios
    //     .delete(`${this.API_URL}/delete/customerFeedbacks`, {
    //       data: this.feedbackDTO,
    //     })
    //     .then((response) => {
    //       // 处理响应
    //       console.log(response);
    //       // 更新tracks数组，移除取消收藏的产品
    //       this.feedbacks = this.feedbacks.filter(
    //         (item) => item.feedbackID !== feedback.feedbackID
    //       );
    //     })
    //     .catch((error) => {
    //       // 处理错误
    //       console.error(error);
    //     });
    // },
  },
  mounted() {
    const userStore = useUserStore();
    if (userStore.isLoggedIn) {
      this.fetchFeedbackData(userStore.userId);
    } else {
      console.log("會員未登入");
    }
  },

  computed: {
    formattedRegisterDate() {
      return function (feedback) {
        if (!feedback || !feedback.feedbackDate) {
          return ''; // 如果沒有訂單日期，則返回空字符串
        }
        // 將註冊日期轉換為 Date 物件
        const registerDate = new Date(feedback.feedbackDate);
        // 使用 Date 物件的方法取得年、月、日、時、分
        const year = registerDate.getFullYear();
        const month = ('0' + (registerDate.getMonth() + 1)).slice(-2); // 確保月份是兩位數
        const day = ('0' + registerDate.getDate()).slice(-2); // 確保日期是兩位數
        const hours = ('0' + registerDate.getHours()).slice(-2); // 確保小時是兩位數
        const minutes = ('0' + registerDate.getMinutes()).slice(-2); // 確保分鐘是兩位數
        // 格式化日期時間字串，例如：2024-03-01 00:00
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      }
    },
  },
};
</script>

<style scoped>
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


.custom-sidebar {
  background-color: #333; /* 調整為與頂部導航欄相同的背景顏色 */
  color: white; /* 文字顏色為白色 */
}

.custom-sidebar .list-group-item {
  background-color: #333; /* 調整背景顏色 */
  color: white; /* 文字顏色 */
  border: none; /* 移除邊框 */
}

.custom-sidebar .list-group-item:hover {
  background-color: #555; /* 滑鼠懸停時的背景顏色 */
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

.accordion{
  background-color:	#FCFCFC !important;  /* Darker green on hover */
  color: #272727	 !important;
}

.accordion:hover{
  background-color:		white !important; /* For example, a green button */
  color:  #4F4F4F !important;
}


.accordion2{
  border: black solid 3px !important;
  border-radius: 10px;
  background-color:	#FCFCFC !important;  /* Darker green on hover */
  color: #272727	 !important;
}



.order-status-group {
  margin-left: 10px; /* 推送到容器的右边 */
  white-space: nowrap;
}
.accordion-button {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.horizontal-dividermany {
  width: 100%;
  height: 1px;
  background-color: #F0F0F0; /* 淡灰色背景色 */
  margin-bottom: 20px; /* 根據需要增加下邊距 */
}

.member-info-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 分为两列，每列宽度相等 */
  gap: 200px; /* 设置列与列之间的间隔 */
  align-items: start; /* 确保所有内容在顶部对齐 */
  padding: 0px; /* 可选：为了更好的视觉效果添加内边距 */
}
.member-info-totle-wrapper{
  text-align: center;
}

.member-info-group {
  display: flex;
  flex-direction: column;
  min-width: 0; /* 设置最小宽度为0，防止溢出 */
}
.member-info-grouptwo{
  display: flex;
  flex-direction: column;
  min-width: 0; /* 设置最小宽度为0，防止溢出 */
  margin-left: auto;
}

.myButton {
  padding: 10px 15px;
  border-radius: 20px;
  border: black solid 3px !important;
  background-color: white  !important;  /* Darker green on hover */
  color: 	black  !important;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  display: block; /* 確保它是塊級元素 */
  margin: auto; /* 左邊距自動，推到右側 */
}

.myButton:hover {
  background-color:	black !important;
  color: white !important;
}

.total-amount-wrapper {
  text-align: center; /* 水平居中文本 */
  width: 100%; /* 確保div占滿其父元件的寬度 */
  margin-top: 10px; /* 可選，添加一些頂部邊距 */
  margin-bottom: 10px; /* 可選，添加一些底部邊距 */
}
/* 可以根據需要進一步調整樣式 */
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
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 25%; /* 控制模態框的寬度 */
  max-width: 600px; /* 確保模態框不會超過這個最大寬度 */
  box-sizing: border-box;
}
button {
  margin: 10px;
}
.yes-button {
  padding: 10px 15px;
  border: none !important;
  border-radius: 6px;
  background-color: #3C3C3C !important; /* Darker green on hover */
  color: white !important;
  cursor: pointer;
  text-transform: uppercase;
}
.yes-button:hover {
  background-color:	#6C6C6C  !important;  /* Darker green on hover */
  color: 	#FCFCFC  !important;
  border-radius: 6px;

}
</style>
