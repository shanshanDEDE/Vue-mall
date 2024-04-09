<template>
  <main>
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css"
        rel="stylesheet"
    />
    <div
      class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light"
    >
      <div class="col-md-5 p-lg-5 mx-auto my-5">
        <h1 class="display-4 fw-normal">3C Mall</h1>
        <p class="lead fw-normal">
          歡迎來到3C Mall，我們致力於為您提供最優質的 Apple 產品與服務，讓您輕鬆享受購物樂趣！
        </p>
        <a class="btn btn-outline-secondary" href="#">Check now</a>
      </div>
    </div>

    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" style="max-width: 100%;">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="/home1.png" class="d-block w-100" alt="..." >
        </div>
        <div class="carousel-item">
          <img src="/home2.png" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="/3.webp" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <button class="fixed-button" @click="toggleButtons">
      <i :class="iconClass"></i>
      <!-- 使用 Font Awesome 中的 chat icon 或叉叉 icon -->
    </button>

    <!-- 彈出的按鈕列表 -->
    <transition name="slide">
      <div v-if="isButtonsVisible" class="buttons-container">
        <button class="sub-button">
          <a href="https://m.me/282020441655310" target="_blank">
            <i class="fab fa-facebook-messenger"></i>
          </a>
        </button>
        <button class="sub-button">
          <a
              href="https://page.line.me/003cdcek?openQrModal=true"
              target="_blank"
          ><i class="bi bi-line"></i
          ></a>
        </button>
        <button class="sub-button"><i class="fab fa-whatsapp"></i></button>
      </div>
    </transition>
  </main>
</template>

<script>
export default {
  data() {
    return {
      isChatIcon: true, // 標記是否顯示 chat icon
      isRotating: false, // 標記是否正在旋轉中
      isButtonsVisible: false, // 標記彈出的按鈕列表是否可見
    };
  },
  computed: {
    iconClass() {
      return this.isChatIcon ? "fas fa-comment" : "fas fa-times"; // 使用 Font Awesome 中的 chat icon 或叉叉 icon
    },
  },
  methods: {
    async toggleButtons() {
      if (this.isRotating) return; // 如果已經在旋轉中，則不執行

      this.isRotating = true; // 開始旋轉

      await this.rotateIcon(); // 旋轉 icon

      // 切換 icon
      this.isChatIcon = !this.isChatIcon;

      this.isButtonsVisible = !this.isButtonsVisible; // 切換彈出的按鈕列表的可見狀態

      //await this.rotateIcon(); // 再次旋轉 icon

      this.isRotating = false; // 結束旋轉
    },
    rotateIcon() {
      return new Promise((resolve) => {
        const button = document.querySelector(".fixed-button");
        button.classList.add("rotate");

        // 監聽旋轉動畫結束事件
        button.addEventListener("animationend", () => {
          button.classList.remove("rotate");
          resolve();
        });
      });
    },
  },
};
</script>

<style>
.fixed-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px; /* 設置寬度和高度相等，使其呈現圓形 */
  height: 50px;
  border-radius: 50%; /* 圓形邊框 */
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  /* 將內容居中 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

/* 調整 icon 大小 */
.fixed-button i {
  font-size: 25px;
}
.sub-button {
  bottom: 20px;
  right: 20px;
  width: 50px; /* 設置寬度和高度相等，使其呈現圓形 */
  height: 50px;
  border-radius: 50%; /* 圓形邊框 */
  background-color: #2784e7;
  color: #fff;
  border: none;
  cursor: pointer;
  /* 將內容居中 */
  display: flex;
  align-items: center;
  justify-content: center;
}
.sub-button i {
  font-size: 25px; /* 調整圖標大小 */
}

/* 旋轉動畫 */
.rotate {
  animation: rotateIcon 0.3s linear;
}

@keyframes rotateIcon {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}

/* 按鈕列表容器 */
.buttons-container {
  position: fixed;
  bottom: 80px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.slide-enter, .slide-leave-to /* .slide-leave-active below version 2.1.8 */ {
  transform: translateY(0);
  opacity: 1;
}

.slide-enter-to, .slide-leave /* .slide-enter-active below version 2.1.8 */ {
  transform: translateY(-100%);
  opacity: 0;
}

/* 彈出的按鈕 */
.sub-button {
  margin-top: 10px;
}

a {
  color: inherit; /* 使用父元素的文字顏色 */
  text-decoration: none; /* 取消下劃線 */
}
</style>
