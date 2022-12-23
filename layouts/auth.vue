<template>
  <div>
    <!--     <PainelHeader :tela="telaName" />
 -->
    <nuxt />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {};
  },

  mounted() {
    console.log('user :: ', this.$auth.user);
    if (!this.$auth.loggedIn) {
      return this.$router.push('/login');
    }
  },
};
</script>
