<template>
  <main class="main-container">
    <MemberOption class="sidebar"></MemberOption>
    <div class="content-container">
      <div class="profile-card">
        <div class="profile-header">
          <h1 class="brand-title">APPLE TREE</h1>
          <h6 class="display-4 fw-normal">我的資料</h6>
        </div>
        <div class="horizontal-divider"></div> <!-- 橫向灰色線 -->

        <div class="profile-body">
          <div v-if="memberdata" class="member-info-container">
            <div class="member-info-wrapper">
              <div class="member-info-group">
                <label class="member-info-title">使用者名稱</label>
                <div class="member-info-content">{{ memberdata.userName }}</div>

                <label class="member-info-title">電子信箱</label>
                <div class="member-info-content">{{ memberdata.email }}</div>

                <label class="member-info-title">註冊日期</label>
                <div class="member-info-content">{{ formattedRegisterDate }}</div>
              </div>

              <div class="member-info-divider"></div>

              <div class="member-info-group">
                <label class="member-info-title">使用者地址</label>
                <div class="member-info-content">{{ memberdata.userAddress }}</div>

                <label class="member-info-title">遞送地址</label>
                <div class="member-info-content">{{ memberdata.deliverAddress }}</div>

                <label class="member-info-title">電話</label>
                <div class="member-info-content">{{ memberdata.phone }}</div>
              </div>
            </div>
          </div>
          <div v-else>
            <p>載入會員資料中...</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<script>
import MemberOption from "@/components/MemberOption.vue";
import { useUserStore } from "@/stores/userStore"; // 假设 userStore 存在于 src/stores 目录下
import axios from "axios";
export default {

  data() {
    return {
      memberdata: null,
    };
  },
  components: {
    MemberOption,
  },
  methods: {
    getMemberData(userId) {
      // const userId = 2;
      axios
          .get(`${this.API_URL}/member/showmemberredata?userId=${userId}`)
          .then((response) => {
            console.log(response);
            this.memberdata = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
  mounted() {
    const userStore = useUserStore();
    if (userStore.isLoggedIn) {
      this.getMemberData(userStore.userId);
    } else {
      console.log("會員未登入");
    }
  },
  computed: {
    formattedRegisterDate() {
      if (!this.memberdata || !this.memberdata.registerDate) {
        return ''; // 如果沒有註冊日期，則返回空字符串
      }
      // 將註冊日期轉換為 Date 物件
      const registerDate = new Date(this.memberdata.registerDate);
      // 使用 Date 物件的方法取得年、月、日、時、分
      const year = registerDate.getFullYear();
      const month = ('0' + (registerDate.getMonth() + 1)).slice(-2); // 確保月份是兩位數
      const day = ('0' + registerDate.getDate()).slice(-2); // 確保日期是兩位數
      const hours = ('0' + registerDate.getHours()).slice(-2); // 確保小時是兩位數
      const minutes = ('0' + registerDate.getMinutes()).slice(-2); // 確保分鐘是兩位數
      // 格式化日期時間字串，例如：2024-03-01 00:00
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
  },
};
</script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.profile-content {
  flex-grow: 1;
  padding: 20px;
  background-color: #fff;
  margin-left: 20px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-header {
  text-align: center;
  margin-bottom: 20px;
}

.profile-header h1 {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 10px;
}

.profile-header p {
  color: #666;
  line-height: 1.6;
}

.member-info > div {
  margin-bottom: 10px;
  font-size: 1em;
  color: #333;
}

.member-info > div span {
  font-weight: bold;
}

.sidebar {
  flex: 0 0 250px; /* 給側邊導航一個固定的寬度 */
  background-color: #333; /* 灰色背景 */
  color: #fff; /* 白色文字 */
  min-height: 100vh; /* Full height */
}

.content {
  flex-grow: 1; /* 佔據剩餘的空間 */
  padding: 20px;
  background-color: #f8f9fa; /* 輕灰色背景 */
}

.member-info-container {
  display: flex;
  margin: 0 auto;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  gap: 20px;

}

.member-info-column {
  display: flex;
  flex-direction: column;
  width: calc(50% - 10px); /* 減去分隔線的空間 */
  text-align: left;
}

.member-info-divider {
  height: 100%;
  width: 1px;
  background-color: #ccc; /* 淡灰色分隔線 */
}

.member-info > div {
  margin-bottom: 10px;
  font-size: 1em;
  color: #333;
}

.horizontal-divider {
  width: 100%;
  height: 1px;
  background-color: #ccc; /* 淡灰色背景色 */
  margin-bottom: 20px; /* 根據需要增加下邊距 */
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
.member-info-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.member-info-group {
  display: flex;
  flex-direction: column;
}

.member-info-title {
  font-size: 14px;
  color: #555;
  font-weight: 600;
  margin-bottom: 4px;
}

.member-info-content {
  border: 1px solid black;
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
  background: #FCFCFC;
  border-radius: 4px;
  padding: 6px 10px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  width: 100%;
}

.member-info-divider {
  min-height: 100%;
  width: 1px;
  background-color: #ccc;
  margin: 0 20px;
}
.brand-slogan{
  font-weight: 700;
}

.content-container {
  display: flex;
  justify-content: center; /* 水平置中 */
  align-items: center; /* 垂直置中 */
  flex-grow: 1;
  padding: 20px;
  background-color: #f8f9fa;
}

.member-info-container {
  display: flex;
  flex-direction: column; /* 堆疊方向改為垂直 */
  align-items: center; /* 垂直置中 */
  justify-content: center; /* 水平置中 */
  width: 100%; /* 使其填滿可用寬度 */
  max-width: 1000px; /* 最大寬度，可根據需要調整 */
  margin: 0 auto; /* 上下保持原樣，左右自動調整以達到置中 */
}

.member-info-wrapper {
  width: 100%; /* 使包裹內容填滿容器 */
  display: flex;
  flex-direction: row; /* 水平排列 */
  justify-content: space-evenly; /* 內容間距平均分配 */
  align-items: flex-start;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
}

.member-info-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 內容靠左對齊 */
}








.content-container {
  display: flex;
  justify-content: center; /* 水平置中 */
  align-items: center; /* 垂直置中 */
  flex-grow: 1;
  padding: 20px;
  background-color: #f8f9fa;
}

.member-info-container {
  display: flex;
  flex-direction: column; /* 堆疊方向改為垂直 */
  align-items: center; /* 垂直置中 */
  justify-content: center; /* 水平置中 */
  width: 100%; /* 使其填滿可用寬度 */
  max-width: 1000px; /* 最大寬度，可根據需要調整 */
  margin: 0 auto; /* 上下保持原樣，左右自動調整以達到置中 */
}

.member-info-wrapper {
  width: 100%; /* 使包裹內容填滿容器 */
  display: flex;
  flex-direction: row; /* 水平排列 */
  justify-content: space-evenly; /* 內容間距平均分配 */
  align-items: flex-start;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: 	#F0F0F0;
}

.member-info-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 內容靠左對齊 */
}
</style>


