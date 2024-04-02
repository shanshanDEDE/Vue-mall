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
              <p class="lead fw-normal">我的意見回饋</p>
            </div>

            <!-- 交易记录 -->
            <div v-for="feedback in feedbacks" :key="feedback.feedbackID">
              <div class="accordion mb-3" id="accordionExample">
                <div class="accordion-item">
                  <!-- 折叠标题 -->
                  <h2
                    class="accordion-header"
                    id="heading{{ feedback.orderID }}"
                  >
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      :data-bs-target="'#collapse' + feedback.orderID"
                      aria-expanded="true"
                      :aria-controls="'collapse' + feedback.orderID"
                    >
                      訂單編號:{{ feedback.orderID }} 反應類別:{{
                        feedback.type
                      }}
                      評價日期:{{ feedback.feedbackDate }} 狀態:{{
                        feedback.customerFeedbackStatus
                      }}
                    </button>
                  </h2>
                  <!-- 折叠内容 -->
                  <div
                    :id="'collapse' + feedback.orderID"
                    class="accordion-collapse collapse"
                    aria-labelledby="heading{{ feedback.orderID }}"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <div
                        v-for="(product, productIndex) in feedback.productNames"
                        :key="productIndex"
                      >
                        產品名稱: {{ product }} 價格:{{
                          feedback.prices[productIndex]
                        }}$
                      </div>

                      <p>回饋內容: {{ feedback.description }}</p>

                      <template
                        v-if="feedback.customerFeedbackStatus != '已處理'"
                      >
                        <button
                          @click="deleteFeedback(feedback)"
                          class="btn btn-primary"
                        >
                          刪除
                        </button>
                      </template>
                      <template v-else>
                        <button class="btn btn-primary" disabled>
                          無法刪除
                        </button>
                      </template>
                      <!-- 在这里添加更多详细信息 -->
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
      feedbacks: [],
      feedbackDTO: {
        userID: null, // 初始化為空，等待登錄後填充
        orderID: null, // 初始化為空，等待需要時填充
      },
    };
  },
  methods: {
    fetchFeedbackData(userId) {
      // const userId = 1;
      axios
        .get(`${this.API_URL}/feedbacks/showCustomerFeedbacks?userId=${userId}`)
        .then((rs) => {
          console.log(rs);
          this.feedbacks = rs.data;
        });
    },

    deleteFeedback(feedback) {
      // 这里添加取消收藏的逻辑
      console.log("取消收藏的产品ID:", feedback.feedbackID);
      // 例如，发起一个请求到后端取消收藏
      this.feedbackDTO.userID = feedback.userID;
      this.feedbackDTO.orderID = feedback.orderID;

      axios
        .delete(`${this.API_URL}/delete/customerFeedbacks`, {
          data: this.feedbackDTO,
        })
        .then((response) => {
          // 处理响应
          console.log(response);
          // 更新tracks数组，移除取消收藏的产品
          this.feedbacks = this.feedbacks.filter(
            (item) => item.feedbackID !== feedback.feedbackID
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
      this.fetchFeedbackData(userStore.userId);
    } else {
      console.log("會員未登入");
    }
  },
};
</script>

<style></style>
