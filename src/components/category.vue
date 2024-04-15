<script>
export default {
name: "category"
}
</script>

<template>
  <section class="py-5 bg-light">
    <div class="container">
      <div class="row px-4 px-lg-5 py-lg-4a align-items-center">
        <div class="col-lg-6">
          <h1 class="mb-0 h2 text-uppercase ">shop</h1>
        </div>
        <div class="col-lg-6 text-lg-end">
          <nav aria-label="breadcrumb">
            <ol class="mb-0 breadcrumb justify-content-lg-end  px-0 bg-light">
              <li class="breadcrumb-item"><router-link to="/" class="text-dark">Home</router-link></li>
              <li class="breadcrumb-item active" aria-current="page"><router-link to="/product" class="text-dark">Shop</router-link></li>
              <li class="breadcrumb-item active" aria-current="page"><router-link to="/product/iphoneIndex" class="text-dark">iPhone</router-link></li>
              <li class="breadcrumb-item active" aria-current="page"><router-link to="/product/macbookIndex" class="text-dark">macbook</router-link></li>
              <li class="breadcrumb-item active" aria-current="page"><router-link to="/product/ipadIndex" class="text-dark">ipad</router-link></li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>