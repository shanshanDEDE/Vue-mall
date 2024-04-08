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
              <p
                class="lead fw-normal"
                v-if="memberdata && memberdata.userName"
              >
                userId:{{ memberdata.userID }}
                <br/>
                使用者名稱:{{ memberdata.userName }}
                <br/>
                電子信箱:{{ memberdata.email }}
                <br/>
                註冊日期:{{ formattedRegisterDate }}
                <br/>
                使用者地址:{{ memberdata.userAddress }}
                <br/>
                遞送地址:{{ memberdata.deliverAddress }}
                <br/>
                電話:{{ memberdata.phone }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
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

<style></style>
