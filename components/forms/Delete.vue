<template>
  <b-modal
    :id="`excluir-${id}`"
    ref="excluir"
    title="BootstrapVue"
    hide-header
    footer-class="border-0 d-flex flex-column align-items-center justify-content-center"
  >
    <p class="my-4">
      Tem certeza de que deseja
      <span class="font-weight-bolder">excluir</span> este registro?
    </p>
    <template #modal-footer>
      <b-button variant="danger" @click="remove">Sim</b-button>
      <b-button @click="$bvModal.hide(`excluir-${id}`)">Não</b-button>
    </template>
  </b-modal>
</template>
<script>
export default {
  name: 'Delete',
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  methods: {
    async remove() {
      const forms = await this.$parent.formsSelecionado;
      try {
        await this.$axios.delete('forms/' + forms.id).then((_res) => {
          console.log(forms.id + ' excluido');
          this.toast('success', 'Sucesso', 'Formulário excluído!');
          this.$refs.excluir.hide();
          this.$nuxt.refresh();
        });
      } catch (error) {
        this.toast(
          'danger',
          'Erro',
          'Problemas ao excluir. Entre em contato com o suporte'
        );
      }
    },
  },
};
</script>
