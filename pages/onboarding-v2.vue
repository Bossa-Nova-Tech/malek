<template>
  <main>
    <Splash :is-loading="isLoading" />
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

  head() {
    return {
      title: `Onboarding |  ${process.env.title}`,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  },
};
</script>
