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
              <h1 class="display-4 fw-normal">會員中心</h1>
              <p class="lead fw-normal">
                歡迎來到會員中心。
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
export default {
  components: {
    MemberOption,
  },
};
</script>

<style></style>
