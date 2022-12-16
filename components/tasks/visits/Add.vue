<template>
  <b-modal
    id="visitas"
    ref="visitas"
    centered
    hide-footer
    hide-header
    class="modal-backdrop"
  >
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
    <b-form-group
      class="mb-4"
      label-for="horario-visita"
      label="Horário da Visita"
    >
      <b-form-timepicker
        v-model="visits.hour_visit"
        name="horario-visita"
        v-bind="labels"
        locale="pt-br"
        placeholder="00:00"
      />
      <b-form-invalid-feedback> Selecione um horário. </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group label-for="Técnico" label="Técnico">
      <b-form-select v-model="visits.user_id" name="user">
        <b-form-select-option :value="null" desabled
          >Selecione</b-form-select-option
        >
        <b-form-select-option
          v-for="user in colaborators"
          :key="user.id"
          :value="user.id"
        >
          {{ user.name }} {{ user.id }}
        </b-form-select-option>
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
    usersName: {
      type: Boolean,
      default: false,
    },
    visitsData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      visits: {
        date_visit: null,
        hour_visit: null,
        user_id: null,
      },

      colaborators: [],
      labels: {
        labelSelected: 'Horário selecionado',
        labelNoTimeSelected: 'Nenhum horário selecionado',
        labelCloseButton: 'Fechar',
      },
    };
  },
  watch: {
    async usersName() {
      const user = await this.$axios.get('users');
      const userData = user.data;
      console.log(userData);
      this.colaborators = userData;
      console.log('aaaaaa' + this.colaborators);
    },
  },
  methods: {
    async registerVisit(_response) {
      try {
        await this.$axios
          .post('tasks/visit/' + this.ordem_item.id, this.$data.visits)
          .then((_res) => {
            this.$root.$emit('bv::hide::modal', 'visitas');
            this.toast('success', 'Sucesso', 'Visita adicionada com sucesso!');
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
