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
              <p class="lead fw-normal">訂單評價</p>
            </div>

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
                              class="btn btn-primary"
                          >
                            新增評論
                          </button>
                        </template>
                        <template v-else>
                          <button class="btn btn-primary" disabled>
                            無法新增評論
                          </button>
                        </template>

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
  </main>
</template>

<script>
import MemberOption from "@/components/MemberOption.vue";
import axios from "axios";

// 引入外部 CSS 文件
import "@/assets/track.css";
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

<style></style>
