<template>
  <main class="main-container">
    <MemberOption class="sidebar"></MemberOption>
    <div class="content-container">
      <div class="profile-card">
        <div class="profile-header">
          <h1 class="brand-title">APPLE TREE</h1>
          <h1 class="display-4 fw-normal">我的追蹤</h1>
        </div>
        <div class="horizontal-divider"></div> <!-- 橫向灰色線 -->

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
  </main>
</template>

<script>
import MemberOption from "@/components/MemberOption.vue";
import axios from "axios";

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

<style scoped>
.main-container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #333;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
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
  max-width: 1200px; /* 設定最大寬度 */
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

.brand-slogan {
  font-size: 1em;
  color: #666;
}

.horizontal-divider {
  width: 100%;
  height: 1px;
  background-color: #ccc; /* 淡灰色背景色 */
  margin-bottom: 20px; /* 根據需要增加下邊距 */
}

/* custom.css */

.custom-sidebar {
  background-color: #333;
  color: white;
}

.custom-sidebar .list-group-item {
  background-color: #333;
  color: white;
  border: none;
}

.custom-sidebar .list-group-item:hover {
  background-color: #555;
}

.track-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.track-item {
  position: relative;
  width: 240px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.track-image {
  width: 100%;
  height: 160px;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.track-image .product-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.track-info {
  padding: 8px 12px;
}

.track-name {
  font-size: 1rem;
  color: #333;
  margin: 8px 0;
}

.track-price {
  font-size: 1.2rem;
  color: #666;
  font-weight: bold;
}

@media (max-width: 768px) {
  .track-item {
    width: 100%;
  }
}

.untrack-button {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #ffa500;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.untrack-button .fa {
  color: white;
}



</style>
