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
              <p class="lead fw-normal">我的追蹤</p>
            </div>

            <div class="track-container">
              <button
                v-for="track in tracks"
                :key="track.id"
                class="track-item"
              >
                <button class="untrack-button" @click="untrackProduct(track)">
                  <i class="fa fa-times" aria-hidden="true"></i>
                  <!-- 假设使用 FontAwesome 图标 -->
                </button>

                <div class="track-image">
                  <img
                    :src="'data:image/jpeg;base64,' + track.photoFile"
                    alt="Product Image"
                    class="product-img"
                  />
                </div>
                <div class="track-info">
                  <h5 class="track-name">{{ track.productName }}</h5>
                  <p class="track-price">${{ track.productPrice }}</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="/1.webp" class="d-block w-100" />
          </div>
          <div class="carousel-item">
            <img src="/2.webp" class="d-block w-100" />
          </div>
          <div class="carousel-item">
            <img src="/3.webp" class="d-block w-100" />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </main>
  </main>
</template>

<script>
import MemberOption from "@/components/MemberOption.vue";
import axios from "axios";

// 引入外部 CSS 文件
import "@/assets/track.css"; // 样式文件路径根据实际情况修改

export default {
  data() {
    return {
      tracks: [],
      trackDTO: {
        userID: null, // 初始化為空，等待登錄後填充
        specID: null, // 初始化為空，等待需要時填充
      },
    };
  },
  methods: {
    fetchData() {
      const userId = 2;
      axios.get(`${this.API_URL}/getshow/track?userId=${userId}`).then((rs) => {
        console.log(rs);
        this.tracks = rs.data;
      });
    },
    // ...其他方法保持不变...

    untrackProduct(track) {
      // 这里添加取消收藏的逻辑
      console.log("取消收藏的产品ID:", track.trackID);
      // 例如，发起一个请求到后端取消收藏
      this.trackDTO.userID = track.userID;
      this.trackDTO.specID = track.specID;

      axios
        .delete(`${this.API_URL}/delete/track`, {
          data: this.trackDTO,
        })
        .then((response) => {
          // 处理响应
          console.log(response);
          // 更新tracks数组，移除取消收藏的产品
          this.tracks = this.tracks.filter(
            (item) => item.trackID !== track.trackID
          );
        })
        .catch((error) => {
          // 处理错误
          console.error(error);
        });
    },

    // 登錄成功後調用此方法，更新 trackDTO 中的用戶信息
    handleLoginSuccess(userId) {
      this.trackDTO.userId = userId;
      // 如果還有其他需要初始化的屬性，可以在這裡進行設置
    },
  },
  components: {
    MemberOption,
  },
  mounted() {
    this.fetchData(); // 在實例掛載後自動調用 fetchData 方法
  },
};
</script>

<style></style>
