<template>
  <main class="main-container">
    <MemberOption class="sidebar"></MemberOption>
    <div class="content-container">
      <div class="profile-card">
        <div class="profile-header">
          <h1 class="display-4 fw-normal">My Wish</h1>
        </div>
        <div class="horizontal-divider"></div>
        <div class="track-container">
          <div
              v-for="track in tracks"
              :key="track.trackID"
              class="track-item"
          >
            <button class="untrack-button" @click.stop="untrackProduct(track)">
              <i class="fa fa-times" aria-hidden="true"></i>
            </button>

            <router-link
                :to="{
                  path: '/product/detail',
                  query: {
                    reProductId: track.productId,
                    reProductName: track.productName,
                    rePrice: track.productPrice,
                    rePhotoId: track.photoFile,
                    reProductDescription: track.productDescription,
                    reSpecIds: track.specIds
                  }
                }"
                tag="div"
            >
              <div class="track-image">
                <img :src="'data:image/jpeg;base64,' + track.photoFile" alt="Product Image" class="product-img"/>
              </div>
              <div class="track-info">
                <h5 class="track-name">{{ track.productName }}</h5>
                <p class="track-price">${{ track.productPrice }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import MemberOption from "@/components/MemberOption.vue";
import axios from "axios";
import {useUserStore} from "@/stores/userStore.js";

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

    untrackProduct(track) {
      this.trackDTO.userID = track.userID;
      this.trackDTO.specID = track.specID;

      axios
          .delete(`${this.API_URL}/delete/track`, {
            data: this.trackDTO,
          })
          .then((response) => {
            console.log(response);
            this.tracks = this.tracks.filter(
                (item) => item.trackID !== track.trackID
            );
          })
          .catch((error) => {
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
  max-width: 1200px;
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
  background-color: #ccc;
  margin-bottom: 20px;
}

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
