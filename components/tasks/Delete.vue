<template>
  <b-modal
    id="excluir"
    ref="excluir"
    title="BootstrapVue"
    hide-header
    footer-class="border-0 d-flex flex-column align-items-center justify-content-center"
  >
    <p class="my-4">Tem certeza de que deseja excluir este registro?</p>
    <template #modal-footer>
      <b-button variant="danger" @click="remove(ordem.id, ordem)">Sim</b-button>
      <b-button @click="$bvModal.hide('excluir')">Não</b-button>
    </template>
  </b-modal>
</template>
<script>
export default {
  name: 'Delete',
  methods: {
    async remove(index, ordem) {
      // this.ordens.splice(index, 1);
      console.log('index :: ', index);
      console.log('ordem :: ', ordem);

      try {
        await this.$axios
          .delete('tasks/' + this.$parent.index)
          .then((_res) => {
            if (_res.data.result === 'success') {
              this.hideModal2(index);
              this.toast('success', 'Sucesso', 'Item excluído!');
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
