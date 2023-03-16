<template>
  <b-modal
    :id="budget.id"
    :ref="budget.id"
    title="BootstrapVue"
    hide-header
    footer-class="border-0 d-flex flex-column align-items-center justify-content-center"
  >
    <p class="my-4">Tem certeza de que deseja excluir este registro?</p>
    <template #modal-footer>
      <b-button variant="danger" @click="remove(budget)">Sim</b-button>
      <b-button @click="$bvModal.hide(budget.id)">Não</b-button>
    </template>
  </b-modal>
</template>
<script>
export default {
  name: 'Delete',
  props: ['budget'],
  mounted() {
    const idRef = 'modal-' + this.budget.id;
    return { idRef };
  },
  methods: {
    async remove(budget) {
      // this.ordens.splice(index, 1);
      /* console.log('index :: ', index);
      console.log('ordem :: ', ordem); */
      try {
        /*  */
        await this.$axios /*  */
          .delete('budgets/' + budget.id)
          .then((_res) => {
            if (_res.data.result === 'success') {
              this.toast('success', 'Sucesso', 'Item excluído!');
              this.$root.$emit('bv::hide::modal', 'excluir');
              this.$nuxt.refresh();
            } else {
              this.toast(
                'danger',
                'Erro',
                'Problemas ao excluir. Entre em contato com o suporte',
              );
            }
          })
          .catch((_err) => {});
      } catch (error) {
      }
    },
  },
};
</script>
