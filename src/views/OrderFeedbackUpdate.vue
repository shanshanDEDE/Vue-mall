<template>
  <main class="container-fluid">
    <!-- ...其他HTML代码... -->
    <div class="row">
      <!-- 左側選項列 -->
      <MemberOption></MemberOption>
      <!-- 主要內容 -->
      <div class="col-md-9">
        <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
          <div class="col-md-5 p-lg-5 mx-auto my-5">
            <div v-if="order">
              <h1 class="display-4 fw-normal">新增評論</h1>
              <label>訂單編號：{{ order.orderId }}</label>
              <!-- 留言类型和描述的表单 -->
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
                  <div class="form-group">
                    <label for="feedbackDescription">描述：</label>
                    <textarea v-model="feedback.description" id="feedbackDescription" required></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary">提交評論</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ...其他HTML代码... -->
  </main>
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
      // this.feedback.ordersDetailId = this.order.ordersDetailId;
      this.feedback.ordersDetailId = 1;
      this.feedback.feedbackDate = new Date().toISOString(); // 设置当前时间为反馈时间

      alert(this.feedback.userId);
      alert(this.feedback.orderId);
      console.log(this.feedback.userId);
      console.log(this.feedback.orderId);
      alert(this.feedback.ordersDetailId);
      alert(this.feedback.feedbackDate);
      alert(this.feedback.type);
      alert(this.feedback.description);
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
            alert('评论新增成功！');
            this.$router.push('/MemberCenter/MemberFeedback');
          })
          .catch(error => {
            // 处理错误
            alert('评论新增失败！');
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
/* ...样式代码... */
</style>
