<template>
  <main class="main-container">

    <div class="content-container">
      <div class="profile-card">
        <div class="profile-header">
          <h1 class="brand-title">門市資訊</h1>
        </div>
        <div class="horizontal-divider"></div> <!-- 橫向灰色線 -->

        <div class="container-fluid">
          <div class="row">
            <!-- 左側欄位 -->
            <div class="col-md-6" style="margin-top: 20px;">
              <div class="column position-relative overflow-hidden p-3 p-md-4 m-md-3 text-center">
                <div class="col-md-12  mx-auto my-5" style="margin-top: 20px;">
                  <h2>國立成功大學</h2>
                  <div style="align-items: center;">
                    <h2>Apple Tree</h2>
                  </div>
                  <h2>校園體驗中心</h2>
                  <div>
                    Bussiness Time<br>
                    營業時間<br>
                    週一～週五 11:00~19:00<br>
                    週六 11:00~18:00<br>
                    週日公休<br>
                    寒暑假營業時間<br>
                    週一～週五 11:00~18:00<br>
                    週六 11:00~17:00<br>
                    週日公休
                  </div>
                </div>
              </div>
            </div>

            <!-- 右側欄位 -->
            <div class="col-md-6 d-flex  " style="margin-top: 20px;">
              <div class="column position-relative overflow-hidden p-3 p-md-4 m-md-3 ">
                <div class="map-container text-center">
                  <div id="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117527.52674291!2d120.0726608433594!3d22.996762500000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e76ed290820d3%3A0xe0ee028be207a19e!2z5ZyL56uL5oiQ5Yqf5aSn5a24!5e0!3m2!1szh-TW!2stw!4v1713255968110!5m2!1szh-TW!2stw" width="600" height="450" style="border:0;"></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import MemberOption from "@/components/MemberOption.vue";

export default {
  components: {MemberOption}

}
</script>

<style scoped>
.main-container {
  display: flex;
  min-height: 100vh;
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

.horizontal-divider {
  width: 100%;
  height: 1px;
  background-color: #ccc; /* 淡灰色背景色 */
  margin-bottom: 20px; /* 根據需要增加下邊距 */
}

/* 欄位美化樣式 */
.column {
  background-color: #f9f9f9;
  border-radius: 20px; /* 圓弧半徑 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

/* 標題美化樣式 */
h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

div {
  margin-bottom: 10px; /* 較小的底部邊距 */
}

iframe {
  width: 350px;
  border-radius: 10px;
  box-shadow: 10px 10px 10px rgba(1, 1, 1, 0.1);
}

</style>
