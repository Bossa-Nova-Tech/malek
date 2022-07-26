<template>
  <div>
    <h1>Home</h1>

    <ul>
      <li v-for="(router, index) in nestedRoutes" :key="index">
        <nuxt-link :to="router.path" :title="router.name">
          {{ router.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  layout: 'navigation',

  data() {
    return {
      nestedRoutes: [],
    };
  },

  head() {
    return {
      title: `${process.env.title}`,

      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '',
        },
      ],
    };
  },

  created() {
    this.$router.options.routes.forEach((routeOption) => {
      if (routeOption.path.startsWith(this.$route.path)) {
        this.nestedRoutes.push({
          name: routeOption.name,
          path: routeOption.path,
        });
      }
    });
  },
};
</script>
