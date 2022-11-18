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
        v-model="visits.date_visit"
        name="data-visita"
        :date-format-options="{
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }"
        locale="pt-br"
        placeholder="00/00/2022"
      />
      <b-form-invalid-feedback> Selecione uma opção. </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group label-for="colaborador" label="Colaborador">
      <b-form-select
        v-model="visits.user_name"
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
  props: {
    ordem_item: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      visits: {
        date_visit: null,
        user_name: this.ordem_item,
        user_id: 1,
      },
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
    async registerVisit(_response) {
      try {
        await this.$axios
          .post('tasks/visit/' + this.ordem_item.id, this.$data.visits)
          .then((_res) => {
            this.$refs.criar.hide();
            this.toast('success', 'Sucesso', 'Item adicionado com sucesso!');
            this.formData = {
              status: null,
              need_signature: false,
              estimated_time: null,
              end_date: null,
              note: null,
              name_customer: null,
              template: null,
              services: null,
            };
            /* this.$router.go(0); */
          });
        this.$nuxt.refresh().catch((_err) => {});
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
