<template>
  <div class="container">
    <label for="example-input">Choose a time</label>
    <b-input-group class="mb-3">
      <b-form-input
        id="example-input"
        v-model="value"
        v-mask="['##:##']"
        type="text"
        placeholder="HH:mm"
      ></b-form-input>
      <b-input-group-append>
        <b-form-timepicker
          v-model="value"
          button-only
          right
          aria-controls="example-input"
        ></b-form-timepicker>
      </b-input-group-append>
    </b-input-group>
    <p>Value: '{{ value }}'</p>
    <p>Value: '{{ retornar }}'</p>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask';
export default {
  directives: { mask },

  data() {
    return {
      value: '',
    };
  },
  computed: {
    retornar() {
      return this.value.substring(0, 5);
    },
  },
};
</script>
