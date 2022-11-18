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
      <b-form-select v-model="visits.user_name" name="user">
        <b-form-select-option :value="null" desabled
          >Selecione</b-form-select-option
        >
        <b-form-select-option
          v-for="user in colaborators"
          :key="user.id"
          :value="user.name"
        >
          {{ user.name }}
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
  },
  data() {
    return {
      visits: {
        date_visit: null,
        user_name: null,
        user_id: 1,
      },
      colaborators: [],
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
            this.$refs.visitas.hide();
            this.toast('success', 'Sucesso', 'Item adicionado com sucesso!');
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
