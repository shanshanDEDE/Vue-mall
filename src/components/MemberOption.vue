<template>
  <div class="col-md-3 custom-sidebar">
    <ul class="list-group mt-3">
      <!-- 產品意見反應 -->
      <li class="list-group-item">

          <span><label>會員資料</label></span>
          <!-- 添加箭头图标 -->

          <ul class="list-group mt-2">
            <li class="list-group-item">
              <router-link
                to="/MemberCenter/MemberData"
                class="nav-link px-2 text-white"
              >
                <label>我的會員資訊</label>
              </router-link>
            </li>
            <li class="list-group-item">
              <router-link
                to="/MemberCenter/MemberDataUpdate"
                class="nav-link px-2 text-white"
              >
                <label>會員資料修改</label>
              </router-link>
            </li>
            <li class="list-group-item">
              <router-link
                to="/MemberCenter/MemberResetPassword"
                class="nav-link px-2 text-white"
              >
                <label>會員密碼修改</label>
              </router-link>
            </li>
            <li class="list-group-item">
              <router-link
                to="/MemberCenter/CustomerRight"
                class="nav-link px-2 text-white"
              >
                <label>會員權益</label>
              </router-link>
            </li>

            <!-- 可以继续添加更多子选项 -->
          </ul>

      </li>

      <li class="list-group-item">
        <router-link to="/MemberCenter/MemberOrders" class="nav-link px-2 text-white">
          <label>訂單查詢</label>
        </router-link>
      </li>
      <li class="list-group-item">
        <router-link to="/MemberCenter/track" class="nav-link px-2 text-white">
          <label>我的追蹤</label>
        </router-link>
      </li>

      <!-- 產品意見反應 -->
      <li class="list-group-item">


          <label>客戶服務</label>

          <ul class="list-group mt-2">

            <li class="list-group-item">
              <router-link
                  to="/MemberCenter/CustomerFeedbackAdd"
                  class="nav-link px-2 text-white"
              >
                <label>填寫訂單意見</label>
              </router-link>
            </li>

            <li class="list-group-item">
              <router-link
                to="/MemberCenter/MemberFeedback"
                class="nav-link px-2 text-white"
              >
                <label>我的意見反應</label>
              </router-link>
            </li>

            <li class="list-group-item">
              <router-link
                  to="/MemberCenter/UserRight"
                  class="nav-link px-2 text-white"
              >
                <label>客戶權益聲明</label>
              </router-link>
            </li>

            <li class="list-group-item">
              <router-link
                  to="/MemberCenter/CommonProblems"
                  class="nav-link px-2 text-white"
              >
                <label>常見問題</label>
              </router-link>
            </li>
            <!-- 可以继续添加更多子选项 -->
          </ul>
      </li>

      <!-- 其他選項 -->
    </ul>
  </div>
</template>
<script>
// 引入外部 CSS 文件
import "@/assets/memberoption.css"; // 样式文件路径根据实际情况修改

export default {
  data() {
    return {
      serviceExpanded: false,
    };
  },
};
</script>
<style>
list-group {
  /* 給所有.list-group的元素添加邊框和內邊距 */
  border: 2px solid #ddd; /* 添加一个边框 */
  padding: 20px; /* 添加一些内边距 */
  border-radius: 5px; /* 如果你想要圆角边框 */
  margin-bottom: 20px; /* 在下一个元素之前添加一些空间 */
}

/* 指定的类仅在hover时展示边框 */
.mt-2:hover {
  border: 2px solid #ADADAD;
  padding: 0px;
  border-radius: 5px;
}

/* 为了避免在未hover时内容突然扩展，设置一个透明边框 */
.mt-2 {
  border: 2px solid transparent; /* 初始状态下的透明边框 */
  padding: 0px;
  border-radius: 5px;
  margin-bottom: 20px;
  transition: border 0.3s ease; /* 平滑过渡效果 */
}

label{
  color:black;
  font-weight: 700;
}
label:hover {
  cursor: pointer; /* Cursor pointer to indicate it's clickable */
}
.col-md-3{
  background-color: 		#FFFFFF !important;
}
.custom-sidebar{
  background-color: 		#FFFFFF !important;
}

.list-group-item{
  background-color: 		#FFFFFF !important;
}
.list-group-item:hover {
  background-color: #F0F0F0 !important;
}
</style>
