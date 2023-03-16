<template>
  <b-modal id="montagem" ref="montagem" size="lg" hide-header hide-footer>
    <h1 class="text-center">Formulário: {{ this.form.data.name }}</h1>
    <b-form-group v-for="field in form.data.fields" :key="field.id">
      <label for="x">{{ field.name }}</label>
      <b-form-input
        name="x"
        id="x"
        v-if="field.type === 'Texto curto'"
      ></b-form-input>
      <b-form-checkbox-group name="x" id="x" v-if="field.type === 'Checkbox'">
        <b-form-checkbox v-for="option in field.options" :key="option.id">
          {{ option.name }}</b-form-checkbox
        >
      </b-form-checkbox-group>
      <b-form-select name="x" id="x" v-if="field.type === 'Selecionar'">
        <b-form-select-option
          v-for="option in field.options"
          :key="option.id"
          :value="option.id"
          >{{ option.name }}</b-form-select-option
        >
      </b-form-select>
      <b-form-radio-group
        name="x"
        id="x"
        v-if="field.type === 'Alternativas(radio)'"
      >
        <b-form-radio v-for="option in field.options" :key="option.id">
          {{ option.name }}
        </b-form-radio>
      </b-form-radio-group>
      <b-form-textarea v-if="field.type === 'Texto longo'" />
      <b-form-datepicker v-if="field.type === 'Data'" />
      <b-form-timepicker
        v-if="field.type === 'Horas'"
        locale="pt-br"
        placeholder="00:00"
      />
    </b-form-group>
  </b-modal>
</template>

<script>
export default {
  name: 'MontagemForms',
  props: {
    form: {
      type: Array | Object,
    },
  },
  data() {
    return {
      options: [],
    };
  },
  /*  mounted() {
    this.mountForm();
  },
  methods: {
    mountForm() {
      for (let i; this.form.data.fields.length; i++) {
        this.i = i;
      }
    },
  }, */
};
</script>

<style>
</style>