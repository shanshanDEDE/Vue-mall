<template>
  <Appheader></Appheader>

  <router-view></router-view>

  <Appfooter></Appfooter>
</template>
<script>
import Appfooter from "@/components/AppFooter.vue";
import Appheader from "@/components/AppHeader.vue";

export default {
  components: {
    Appfooter,
    Appheader,
  },
};
</script>
<style></style>
