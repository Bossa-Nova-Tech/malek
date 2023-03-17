<template>
  <b-modal id="montagem" ref="montagem" size="lg" hide-header hide-footer>
    <h1 class="text-center">Formulário: {{ form.data.name }}</h1>
    <b-form-group v-for="field in form.data.fields" :key="field.id">
      <label for="x">{{ field.name }}</label>
      <b-form-input
        v-if="field.type === 'Texto curto'"
        id="x"
        name="x"
      ></b-form-input>
      <b-form-checkbox-group v-if="field.type === 'Checkbox'" id="x" name="x">
        <b-form-checkbox v-for="option in field.options" :key="option.id">
          {{ option.name }}</b-form-checkbox
        >
      </b-form-checkbox-group>
      <b-form-select v-if="field.type === 'Selecionar'" id="x" name="x">
        <template #first>
          <b-form-select-option :value="null" disabled
            >Selecione</b-form-select-option
          >
        </template>
        <b-form-select-option
          v-for="option in field.options"
          :key="option.id"
          :value="option.id"
          >{{ option.name }}</b-form-select-option
        >
      </b-form-select>
      <b-form-radio-group
        v-if="field.type === 'Alternativas(radio)'"
        id="x"
        name="x"
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

<style></style>
