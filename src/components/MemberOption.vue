<template>
  <div class="col-md-3 custom-sidebar">
    <ul class="list-group mt-3">
      <!-- 產品意見反應 -->
      <li class="list-group-item">
        <a
          class="nav-link px-2 text-white d-flex justify-content-between align-items-center"
          data-bs-toggle="collapse"
          href="#serviceCollapse"
          role="button"
          aria-expanded="false"
          aria-controls="serviceCollapse"
        >
          <span>會員資料</span>
          <!-- 添加箭头图标 -->
          <i
            class="bi bi-chevron-down rotate-icon"
            :class="{ rotate: serviceExpanded }"
          ></i>
        </a>
        <div class="collapse" id="serviceCollapse">
          <ul class="list-group mt-2">
            <li class="list-group-item">
              <router-link
                to="/member_center/member_data"
                class="nav-link px-2 text-white"
              >
                我的會員資訊
              </router-link>
            </li>
            <li class="list-group-item">
              <router-link
                to="/member_center/member_data_update"
                class="nav-link px-2 text-white"
              >
                會員資料修改
              </router-link>
            </li>
            <li class="list-group-item">
              <router-link
                to="/member_center/member_reset_password"
                class="nav-link px-2 text-white"
              >
                會員密碼修改
              </router-link>
            </li>
            <li class="list-group-item">
              <router-link
                to="/member_center/customer_feedback"
                class="nav-link px-2 text-white"
              >
                會員權益
              </router-link>
            </li>

            <!-- 可以继续添加更多子选项 -->
          </ul>
        </div>
      </li>

      <li class="list-group-item">訂單資訊</li>
      <li class="list-group-item">退換貨</li>

      <li class="list-group-item">
        <router-link to="/member_center/track" class="nav-link px-2 text-white">
          我的追蹤
        </router-link>
      </li>

      <!-- 產品意見反應 -->
      <li class="list-group-item">
        <a
          class="nav-link px-2 text-white d-flex justify-content-between align-items-center"
          data-bs-toggle="collapse"
          href="#serviceCollapse"
          role="button"
          aria-expanded="false"
          aria-controls="serviceCollapse"
        >
          <span>客戶服務</span>
          <!-- 添加箭头图标 -->
          <i
            class="bi bi-chevron-down rotate-icon"
            :class="{ rotate: serviceExpanded }"
          ></i>
        </a>
        <div class="collapse" id="serviceCollapse">
          <ul class="list-group mt-2">
            <li class="list-group-item">
              <router-link
                to="/member_center/customer_feedback"
                class="nav-link px-2 text-white"
              >
                常見問題
              </router-link>
            </li>
            <li class="list-group-item">
              <router-link
                to="/member_center/customer_feedback"
                class="nav-link px-2 text-white"
              >
                課戶權益聲明
              </router-link>
            </li>
            <li class="list-group-item">
              <router-link
                to="/member_center/customer_feedback"
                class="nav-link px-2 text-white"
              >
                我的意見反應
              </router-link>
            </li>

            <!-- 可以继续添加更多子选项 -->
          </ul>
        </div>
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
<style></style>
