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
                <h1 class="display-4 fw-normal">Nono商城</h1>
                <div class="lead fw-normal" v-if="memberdata">
                  <label>姓名：</label>
                  <input type="text" v-model="memberdata.userName" :placeholder="!memberdata.userName ? '必填' : ''" required />
                </div>
                <div class="lead fw-normal" v-if="memberdata">
                  <label>電子郵件：</label>
                  <input type="text" v-model="memberdata.email" :disabled="true" />
                </div>
                <div class="lead fw-normal" v-if="memberdata">
                  <label>註冊日期：</label>
                  <input type="text" v-model="formattedRegisterDate" :disabled="true" />
                </div>
  
                <div class="lead fw-normal" v-if="memberdata">
                <div class="input-wrapper">
                    <label>使用者地址：</label>
                    <input type="text" v-model="inputmemberdata.userAddress" />
                    <!-- 右側提示標籤 -->
                    <label v-if="shouldShowMissingLabel(memberdata.userAddress,inputmemberdata.userAddress)" class="missing-data-label">尚未有過資料 建議填寫!</label>
                </div>
                </div>

                <div class="lead fw-normal" v-if="memberdata">
                <div class="input-wrapper">
                    <label>遞送地址：</label>
                    <input type="text" v-model="inputmemberdata.deliverAddress" />
                    <!-- 右側提示標籤 -->
                    <label v-if="shouldShowMissingLabel(memberdata.deliverAddress,inputmemberdata.deliverAddress)" class="missing-data-label">尚未有過資料 建議填寫!</label>
                </div>
                </div>
                <div class="lead fw-normal" v-if="memberdata">
                <div class="input-wrapper">
                    <label>電話：</label>
                    <input type="text" v-model="inputmemberdata.phone" />
                    <!-- 右側提示標籤 -->
                    <label v-if="shouldShowMissingLabel(memberdata.phone,inputmemberdata.phone)" class="missing-data-label">尚未有過資料 建議填寫!</label>
                </div>
                </div>
  
                <button @click="submitUpdate">提交更新</button> <label v-if=this.showsubmitfalseflag class="missing-data-label"> 更新失敗 姓名：尚未填寫</label>
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
  
  export default {
    data() {
        return {
            memberdata: null,
            inputmemberdata: null,
            showsubmitfalseflag:false
        };
    },
    components: {
      MemberOption,
    },
    methods: {
        getMemberData(userId) {
            axios
                .get(`${this.API_URL}/member/showmemberredata?userId=${userId}`)
                .then((response) => {
                    console.log(response);
                    this.memberdata = response.data;
                    // 將 inputmemberdata 初始化為資料庫的值
                    this.inputmemberdata = {
                        userAddress: response.data.userAddress,
                        deliverAddress: response.data.deliverAddress,
                        phone: response.data.phone
                    };
                })
                .catch((error) => {
                    console.log(error);
            });
        },
        submitUpdate() {
          if(!this.memberdata.userName){
            this.showsubmitfalseflag=true;
            return
          }
            // 在此提交表單更新
            console.log("提交更新資訊：", this.memberdata);

            // 將 inputmemberdata 的值更新到 memberdata 中
            //判斷除了memberdata為有值並且inputmemberdata不存在時,才去做更新
            if(!(this.memberdata.userAddress && !this.inputmemberdata.userAddress)){
              this.memberdata.userAddress = this.inputmemberdata.userAddress;
            }
            if(!(this.memberdata.deliverAddress && !this.inputmemberdata.deliverAddress)){
              this.memberdata.deliverAddress = this.inputmemberdata.deliverAddress;
            }
            if(!(this.memberdata.phone && !this.inputmemberdata.phone)){
              this.memberdata.phone = this.inputmemberdata.phone;
            }
            axios
                .put(`${this.API_URL}/update/memberdataupdate`, this.memberdata)
                .then((response) => {
                    console.log(response);
                    this.showsubmitfalseflag=false;
                    alert("資料更新成功")
                })
                .catch((error) => {
                    console.log(error);
            });
        },
        shouldShowMissingLabel(field,inputfile) {
            return !field && !inputfile;
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
  <style>
  </style>
  