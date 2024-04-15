<template>
  <div>登入成功！</div>
</template>
<script>
import axios from "axios";
import { useUserStore } from "@/stores/userStore";
export default {
  // 在組件的 created 或 mounted 中進行導航
  created() {
    axios.get(`${this.API_URL}/user/getSession`).then((rs) => {
      const userStore = useUserStore();
      userStore.loginSuccess(rs.data);
      sessionStorage.setItem("loggedInMember", JSON.stringify(rs.data));
      this.$router.push("/");
    });
  },
};
</script>
<style></style>
