<template>
  <main class="main-container">
    <MemberOption class="sidebar"></MemberOption>
    <div class="content-container">
      <div class="profile-card">
        <div class="profile-header">
          <h6 class="display-4 fw-normal">訂單查詢</h6>
        </div>
        <div class="horizontal-divider"></div>
        <div v-for="order in Orders" :key="order.orderId">
          <div v-if="order.orderStatus != '已取消' ">
            <div class="accordion mb-3" id="accordionExample">
              <h2 class="accordion-header accordion" :id="'heading' + order.orderId">
                <button
                    class="accordion-button accordion2"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#collapse' + order.orderId"
                    aria-expanded="true"
                    :aria-controls="'collapse' + order.orderId"
                >
                  <div style="flex-grow: 1; display: flex; justify-content: space-between; align-items: center; width: 100%;">
                    <span>訂單編號:{{ order.orderId }} 下單日期:{{ formattedRegisterDate(order) }} 付款方式:{{ order.paymentMethod }}</span>
                    <span class="order-status-group">訂單狀態: {{ order.orderStatus }}</span>
                  </div>
                </button>
              </h2>
              <div
                  :id="'collapse' + order.orderId"
                  class="accordion-collapse collapse "
                  :aria-labelledby="'heading' + order.orderId"
                  data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div v-for="(detail, index) in order.orderDetails" :key="index">

                    <div class="accordion-body">
                      <div class="member-info-wrapper">
                        <div class="member-info-group">
                          <p>產品名稱: {{ detail.productName }}{{ detail.color }}色</p>
                          <p>單價: {{ detail.price }}$</p>
                        </div>

                        <div class="member-info-group">
                          <p>數量: {{ detail.quantity }}個</p>
                          <p>總價: {{ detail.orderPrice }}$</p>
                        </div>
                      </div>
                    </div>
                    <div class="horizontal-dividermany"></div> <!-- 橫向灰色線 -->
                  </div>

                  <div class="accordion-body">
                    <div class="member-info-wrapper">
                      <div class="member-info-group">
                        <p>收貨地址: {{ order.deliverAddress }}</p>
                      </div>


                      <div class="member-info-group">
                        <p>聯絡電話: {{ order.recipientPhone }}</p>
                      </div>
                    </div>
                  </div>

                  <template
                      v-if="order.orderStatus == '處理中'"
                  >
                    <button
                        @click="confirmResolution(order)"
                        class="submit-button"
                    >
                      取消訂單
                    </button>
                  </template>
                  <template v-else>
                    <button class="submit-button" disabled>
                      無法取消
                    </button>
                  </template>

                  <div v-if="showModal" class="modal">
                    <div class="modal-content">
                      <h4>確認操作</h4>
                      <p>您確定要取消這筆訂單嗎？</p>
                      <button @click="resolveFeedback" class="yes-button">確定</button>
                      <button @click="cancelResolution" class="yes-button">離開</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </main>

  <div class="modal" v-show="showSuccessModal">
    <div class="modal-content">
      <div class="modal-body">
        您的訂單已取消！
      </div>
      <div class="modal-footer">
        <button type="button" class="btn1 btn-primary" @click="closeSuccessModal">確定</button>
      </div>
    </div>
  </div>
</template>

<script>
import MemberOption from "@/components/MemberOption.vue";
import axios from "axios";


import {useUserStore} from "@/stores/userStore.js";

export default {
  components: {
    MemberOption,
  },
  data() {
    return {
      Orders: [],
      showModal: false,
      memberOrder: null,
      showSuccessModal: false
    };
  },
  methods: {
    closeSuccessModal() {
      this.showSuccessModal = false;
    },
    confirmResolution(order) {
      this.memberOrder = order;
      this.showModal = true;
    },
    resolveFeedback() {
      this.deleteOrders(this.memberOrder);
      this.showModal = false;
    },
    cancelResolution() {
      this.showModal = false;
    },

    fetchOrdersData(userId) {
      axios
          .get(`${this.API_URL}/memberOrders/showAllUserOrders?userId=${userId}`)
          .then((rs) => {
            console.log(rs);
            this.Orders = rs.data;
          });
    },

    deleteOrders(order) {
      console.log("取消訂單:", order.orderId);
      axios
          .delete(`${this.API_URL}/delete/UserOrders/${order.orderId}`
          )
          .then((response) => {
            console.log(response);
            this.showSuccessModal = true;
            this.Orders = this.Orders.filter(
                (item) => item.orderId !== order.orderId
            );
          })
          .catch((error) => {
            console.error(error);
          });
    },
  },
  mounted() {
    const userStore = useUserStore();
    if (userStore.isLoggedIn) {
      this.fetchOrdersData(userStore.userId);
    } else {
      console.log("會員未登入");
    }
  },
  computed: {
    formattedRegisterDate() {
      return function (order) {
        if (!order || !order.orderDate) {
          return ''; // 如果沒有訂單日期，則返回空字符串
        }
        // 將註冊日期轉換為 Date 物件
        const registerDate = new Date(order.orderDate);
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
  max-width: 1000px;
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

.horizontal-divider {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-bottom: 20px;
}

.horizontal-dividermany {
  width: 100%;
  height: 1px;
  background-color: #F0F0F0;
  margin-bottom: 20px;
}

.custom-sidebar .list-group-item {
  background-color: #333;
  color: white;
  border: none;
}

.custom-sidebar .list-group-item:hover {
  background-color: #555;
}

.submit-button {
  padding: 10px 15px;
  border: black 3px solid !important;
  border-radius: 15px;
  background-color: white  !important;
  color: 	black  !important;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  display: block;
  margin: auto;
}

.submit-button:hover {
  background-color:		black !important;
  color: white !important;
}

.member-info-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.member-info-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
  background: 	white;

}

.member-info-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 200px;
  align-items: start;
  padding: 0px;
}

.member-info-group {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.member-info-group p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.accordion{
  background-color:	#FCFCFC !important;
  color: #272727	 !important;
}

.accordion:hover{
  background-color:		white !important;
  color:  #4F4F4F !important;
}

.accordion2{
  border: black solid 1px !important;
  border-radius: 5px;
  background-color:	#FCFCFC !important;
  color: #272727	 !important;
}

.order-status-group {
  margin-left: 10px;
  white-space: nowrap;
}
.accordion-button {
  display: flex;
  justify-content: space-between;
  width: 100%;
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
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 25%;
  max-width: 600px;
  box-sizing: border-box;
}
button {
  margin: 10px;
}
.yes-button:hover {
  background-color: black;
  color: white;
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
  background-color:  rgba(0, 0, 0, 0.05);
  color: black;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  display: block;
  margin: auto;
}
.btn1:hover {
  background-color:  rgba(0, 0, 0, 0.15);
  color: black;
}

.btn2{
  border: rgba(0, 0, 0, 0) solid 3px !important;
  background-color: white;
  color: black;
  cursor: pointer;
}
.btn2:hover {
  background-color: rgba(0, 0, 0, 0) !important;
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
  width: 25%;
  max-width: 600px;
  box-sizing: border-box;
}

.modal-title{
  font-weight:  800;
}
</style>


