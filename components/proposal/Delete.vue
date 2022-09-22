<template>
  <b-modal
    :id="proposal.id"
    :ref="proposal.id"
    title="BootstrapVue"
    hide-header
    footer-class="border-0 d-flex flex-column align-items-center justify-content-center"
  >
    <p class="my-4">Tem certeza de que deseja excluir este registro?</p>
    <template #modal-footer>
      <b-button variant="danger" @click="remove(customer)">Sim</b-button>
      <b-button @click="$bvModal.hide(customer.id)">Não</b-button>
    </template>
  </b-modal>
</template>
<script>
export default {
  name: 'Delete',
  props: ['proposal'],
  mounted() {
    console.log('chamou o delete', this.proposal.id);
    const idRef = 'modal-' + this.proposal.id;
    console.log(idRef);
    return { idRef };
  },
  methods: {
    async remove(proposal) {
      // this.ordens.splice(index, 1);
      /* console.log('index :: ', index);
      console.log('ordem :: ', ordem); */
      try {
        await this.$axios
          .delete('business-proposal/' + proposal.id)
          .then((_res) => {
            if (_res.data.result === 'success') {
              console.log(proposal.id + ' excluido');
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
        console.log(error);
      }
    },
  },
};
</script>
