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

            <div v-for="order in Orders" :key="order.orderId">
              <div v-if="order.orderStatus == '已完結' ">
                <div class="accordion mb-3" id="accordionExample">
                  <div class="accordion-item">
                    <!-- 折叠标题 -->
                    <h2 class="accordion-header" :id="'heading' + order.orderId">
                      <button
                          class="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          :data-bs-target="'#collapse' + order.orderId"
                          aria-expanded="true"
                          :aria-controls="'collapse' + order.orderId"
                      >
                        訂單編號:{{ order.orderId }} 下單日期:{{ formattedRegisterDate(order) }}
                        付款方式:{{ order.paymentMethod }} 訂單狀態:{{ order.orderStatus }}
                      </button>
                    </h2>
                    <!-- 折叠内容 -->
                    <div
                        :id="'collapse' + order.orderId"
                        class="accordion-collapse collapse"
                        :aria-labelledby="'heading' + order.orderId"
                        data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <div v-for="(detail, index) in order.orderDetails" :key="index">
                          <p>產品名稱: {{ detail.productName }}{{ detail.color }}色</p>
                          <p>數量: {{ detail.quantity }}個,單價: {{ detail.price }}$</p>
                          <p>總價: {{ detail.orderPrice }}$</p>
                        </div>

                        <p>收貨地址: {{ order.deliverAddress }}</p>
                        <p>聯絡電話: {{ order.recipientPhone }}</p>


                        <template
                            v-if="order.orderStatus == '已完結'"
                        >
                          <button
                              @click="addOrders(order)"
                              class="myButton"
                          >
                            新增評論
                          </button>
                        </template>
                        <template v-else>
                          <button class="myButton" disabled>
                            無法新增評論
                          </button>
                        </template>

                      </div>
                    </div>
                  </div>
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

// 引入外部 CSS 文件
import {useUserStore} from "@/stores/userStore.js";
import {OrdersFeedbackStore} from "@/stores/OrdersFeedbackStore.js"; // 样式文件路径根据实际情况修改

export default {
  components: {
    MemberOption,
  },
  data() {
    return {
      Orders: [],
    };
  },
  methods: {
    fetchOrdersData(userId) {
      axios
          .get(`${this.API_URL}/memberOrders/showAllUserOrders?userId=${userId}`)
          .then((rs) => {
            console.log(rs);
            this.Orders = rs.data;
          });
    },

    addOrders(order) {
      const ordersFeedbackStore = OrdersFeedbackStore();
      const ordersDetailId = order.orderDetails[0].id; // 举例，取第一个订单详情的ID
      ordersFeedbackStore.setOrder(order, ordersDetailId);
      this.$router.push({
        name: 'OrderFeedbackUpdate',
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

</style>
