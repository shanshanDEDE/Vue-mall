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
                  <h2 class="accordion-header" :id="'heading' + feedback.feedbackID">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      :data-bs-target="'#collapse' + feedback.feedbackID"
                      aria-expanded="true"
                      :aria-controls="'collapse' + feedback.feedbackID">
                    >
                      訂單編號:{{ feedback.orderID }} 反應類別:{{
                        feedback.type
                      }}
                      評價日期:{{ formattedRegisterDate(feedback) }} 狀態:{{
                        feedback.customerFeedbackStatus
                      }}
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
                        產品名稱: {{ product }} 價格:{{
                          feedback.prices[productIndex]
                        }}$
                      </div>

                      <p>回饋內容: {{ feedback.description }}</p>

                      <template
                        v-if="feedback.customerFeedbackStatus != '已處理'"
                      >
                        <button
                          @click="updateFeedback(feedback)"
                          class="btn btn-primary"
                        >
                          更改評論
                        </button>
                      </template>
                      <template v-else>
                        <button class="btn btn-primary" disabled>
                          無法更改
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
    </main>
  </main>
</template>

<script>
import MemberOption from "@/components/MemberOption.vue";
import axios from "axios";

// 引入外部 CSS 文件
import "@/assets/track.css";
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

    updateFeedback(feedback) {
      const feedbackStore = useFeedbackStore();
      feedbackStore.setFeedback(feedback);

      this.$router.push({
        name: 'CustomerFeedbackUpdate',
      });
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

<style></style>
