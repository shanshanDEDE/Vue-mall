<template>
  <main class="main-container">
    <MemberOption class="sidebar"></MemberOption>
    <div class="content-container">
      <div class="profile-card">
        <div class="profile-header">
          <h1 class="brand-title">APPLE TREE</h1>
          <p class="brand-slogan">CAREFULLY CREATED COLLECTIONS<br>BROWSE OUR CATEGORIES</p>
          <label>訂單編號：{{ feedback.orderID }}</label>
        </div>
        <div class="horizontal-divider"></div> <!-- 橫向灰色線 -->

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
                    <button @click="submitFeedback" class="myButton">提交更新</button>
                  </div>
                </div>

            </div>
    </div>
  </main>
</template>

<script>
import MemberOption from "@/components/MemberOption.vue";
import { useUserStore } from "@/stores/userStore"; //user store
import axios from "axios";

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
<style scoped>
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

</style>
