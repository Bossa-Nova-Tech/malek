<template>
  <div class="min-vh-100">
    <!-- <TheHeader /> -->

    <main>
      <nuxt />
    </main>

    <!-- <TheFooter /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    console.log('estou sendo chamado do layout');
  },
};
</script>
