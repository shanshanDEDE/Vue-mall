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
    </main>
  </main>
</template>

<script>
import MemberOption from "@/components/MemberOption.vue";
import axios from "axios";

// 引入外部 CSS 文件
import "@/assets/track.css";
import {useUserStore} from "@/stores/userStore.js"; // 样式文件路径根据实际情况修改

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
    fetchData(userId) {
      // const userId = 2;
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
  },
  components: {
    MemberOption,
  },
  mounted() {
    const userStore = useUserStore();
    if (userStore.isLoggedIn) {
      this.fetchData(userStore.userId);
    } else {
      console.log("會員未登入");
    }
  },
};
</script>

<style></style>
