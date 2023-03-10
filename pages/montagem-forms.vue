<template>
  <div>
    <pre>{{ formsData }}</pre>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const forms = await $axios.get('forms');
    const formsData = forms.data;
    return { formsData };
  },
  data() {},
};
</script>

<style></style>
