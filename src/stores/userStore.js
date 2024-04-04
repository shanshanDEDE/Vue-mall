import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state() {
    return {
      userId: "",
      userName: "",
      userEmail: "",
      userAuthentication: "",
      isLoggedIn: false,
      // 初始化時從本地儲存讀取登入狀態
      // isLoggedIn: localStorage.getItem("isLoggedIn") === "false",
    };
  },
  actions: {
    loginSuccess(user) {
      this.userId = user.userId;
      this.userName = user.userName;
      this.userEmail = user.userEmail;
      this.userAuthentication = user.userAuthentication;
      this.isLoggedIn = true;
      // localStorage.setItem("isLoggedIn", "true"); // 儲存登入狀態到本地儲存
    },

    logout() {
      this.userId = "";
      this.userName = "";
      this.userEmail = "";
      this.userAuthentication = "";
      this.isLoggedIn = false;
      // localStorage.removeItem("isLoggedIn"); // 從本地儲存移除登入狀態
    },
  },
  getters: {},
});
