<template>
  <b-container>
    <h1>main</h1>
  </b-container>
</template>

<script>
export default {
  name: 'Home',

  head() {
    return {
      bodyAttrs: {
        class: 'home',
      },

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
};
</script>
