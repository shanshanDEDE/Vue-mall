<template>
  <Appheader></Appheader>

  <router-view></router-view>

  <Appfooter></Appfooter>

  <div class="modal fade" id="blockedAccountModal" tabindex="-1" aria-labelledby="blockedAccountModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-light text-black">
          <h5 class="modal-title" id="blockedAccountModalLabel">警告</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          尚未登入
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close" @click="redirectToLogin">確認</button>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import Appfooter from "@/components/AppFooter.vue";
import Appheader from "@/components/AppHeader.vue";
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

export default {
  components: {
    Appfooter,
    Appheader,
  },
  setup() {
    const router = useRouter();
    const blockedAccountModal = ref(null);

    onMounted(() => {
      blockedAccountModal.value = new bootstrap.Modal(document.getElementById('blockedAccountModal'), {
        keyboard: false
      });
    });

    const redirectToLogin = () => {
      // 確保模態框隱藏後進行導航
      if (blockedAccountModal.value) {
        blockedAccountModal.value.hide();
        blockedAccountModal.value._element.addEventListener('hidden.bs.modal', () => {
          router.push('/login').catch(err => {
            console.error('Router navigation failed:', err);
          });
        }, { once: true }); // 確保事件監聽器只觸發一次
      }
    };

    return {
      redirectToLogin,
    };
  },
};
</script>
<style></style>
