<template>
  <b-modal id="visitas" centered hide-footer hide-header class="modal-backdrop">
    <div class="d-flex justify-content-end mb-3 p-2">
      <b-img
        src="~/assets/img/icones/icone-fechar.svg"
        role="button"
        @click="$bvModal.hide('visitas')"
      />
    </div>
    <b-form-group class="mb-4" label-for="data-visita" label="Data da Visita">
      <b-form-datepicker
        v-model="date_of_visit"
        name="data-visita"
        :date-format-options="{
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }"
        locale="br"
        placeholder="00/00/2022"
      />
      <b-form-invalid-feedback> Selecione uma opção. </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group label-for="colaborador" label="Colaborador">
      <b-form-select
        v-model="colaborator"
        name="colaborador"
        :options="colaborators"
      >
      </b-form-select>
    </b-form-group>
    <b-button variant="primary" @click.once="registerVisit"
      >Registrar Visita</b-button
    >
  </b-modal>
</template>
<script>
export default {
  name: 'Add',
  data() {
    return {
      date_of_visit: null,
      colaborator_data: [],
      colaborator: null,
      colaborators: [
        {
          value: null,
          text: 'Selecione',
        },
        {
          value: 'vanessa',
          text: 'Vanessa Gonçalves',
        },
        {
          value: 'pedro',
          text: 'Pedro Santos',
        },
      ],
    };
  },
  methods: {
    registerVisit() {
      if (this.colaborator) {
        this.colaborator_data.push(this.colaborator);
      }
      alert('Visita Registrada!');
      this.$bvModal.hide('visitas');
    },
  },
};
</script>
