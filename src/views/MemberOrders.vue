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
              <p class="lead fw-normal">訂單資訊</p>
            </div>

            <div v-for="order in Orders" :key="order.orderId">
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
                      訂單編號:{{ order.orderId }} 下單日期:{{ order.orderDate }}
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
                          v-if="order.orderStatus == '處理中'"
                      >
                        <button
                            @click="deleteOrders(order)"
                            class="btn btn-primary"
                        >
                          取消訂單
                        </button>
                      </template>
                      <template v-else>
                        <button class="btn btn-primary" disabled>
                          無法取消
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

// 引入外部 CSS 文件
import "@/assets/track.css";
import {useUserStore} from "@/stores/userStore.js"; // 样式文件路径根据实际情况修改

export default {
  components: {
    MemberOption,
  },
  data() {
    return {
      Orders: [],
      // orderDTO: {
      //   userID: null, // 初始化為空，等待登錄後填充
      //   orderID: null, // 初始化為空，等待需要時填充
      // },
    };
  },
  methods: {
    fetchOrdersData(userId) {
      // const userId = 1;
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
            // 更新tracks数组，移除取消收藏的产品
            this.Orders = this.Orders.filter(
                (item) => item.orderId !== order.orderId
            );
          })
          .catch((error) => {
            // 处理错误
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
};
</script>

<style></style>
