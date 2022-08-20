<template>
  <main class="caixa mx-auto">
    <Splash :isLoading="isLoading" />
    <Onboarding v-if="!isLoading" />
  </main>
</template>

<script>
import Splash from '~/components/Splash.vue';
import Onboarding from '~/components/Onboarding.vue';

export default {
  components: {
    Splash,
    Onboarding,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  },

  head() {
    return {
      title: `Onboarding |  ${process.env.title}`,
    };
  },
};
</script>
