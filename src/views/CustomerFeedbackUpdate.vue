<template>
  <main>
    <main class="container-fluid">
      <div class="row">
        <!-- 左側選項列 -->
        <MemberOption></MemberOption>
        <!-- 主要內容 -->
        <div class="col-md-9">
          <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
            <div class="col-md-5 p-lg-5 mx-auto my-5">
              <div v-if="feedback"> <!-- 只有当feedback存在时才尝试渲染相关内容 -->
                <h1 class="display-4 fw-normal">更改評論</h1>
                <label>訂單編號：{{ feedback.orderID }}</label>
                <!-- 其他依赖于feedback的代码 -->
              </div>
              <p/>

                <div class="container">
                  <div v-if="feedback">
                    <div>
                      <label for="feedbackType">類型：</label>
                      <select v-model="feedback.type" id="feedbackType">
                        <option value="服務態度">服務態度</option>
                        <option value="商品品質">商品品質</option>
                        <option value="配送速度">配送速度</option>
                        <option value="售後服務">售後服務</option>
                        <option value="其它">其它</option>
                      </select>
                    </div>
                    <p/>
                    <div class="form-group">
                      <label for="feedbackDescription" class="form-label">內容：</label>
                      <textarea v-model="feedback.description" id="feedbackDescription" class="textarea-large"></textarea>
                    </div>
                    <button @click="submitFeedback">提交更新</button>
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
import { useUserStore } from "@/stores/userStore"; //user store
import axios from "axios";

// 引入外部 CSS 文件
import "@/assets/memberReData.css"; // 样式文件路径根据实际情况修改
// CustomerFeedbackUpdate.vue
import { useFeedbackStore } from '@/stores/feedbackStore';

export default {
  data() {
    return {
      isLoggedInUserId: null,
      feedback: useFeedbackStore().feedback
    };
  },
  created() {
    const feedbackStore = useFeedbackStore();
    this.feedback = feedbackStore.feedback;
    if(!feedbackStore.feedback){
      this.$router.push("/MemberCenter/MemberFeedback");
    }
  },
  unmounted() {
    const feedbackStore = useFeedbackStore();
    feedbackStore.clearFeedback();
  },
  components: {
    MemberOption,
  },
  methods: {


    submitFeedback() {
      axios.put(`${this.API_URL}/update/customerFeedbacks`, {
        ...this.feedback,
        feedbackDate: new Date().toISOString()
      })
          .then(response => {
            alert('評論更新成功！');
            // 這裡您可以添加更多的業務邏輯
          })
          .catch(error => {
            alert('評論更新失敗！');
            console.error(error);
          });

    },
  },
  mounted() {
    const userStore = useUserStore();
    if (userStore.isLoggedIn) {
      this.isLoggedInUserId = userStore.userId;
    } else {
      console.log("會員未登入");
    }
  },
  computed: {

  },
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
</style>
