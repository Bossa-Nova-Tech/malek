<template>
  <b-modal
    :id="'delete-service'"
    :ref="'delete-service'"
    hide-header
    footer-class="border-0 d-flex flex-column align-items-center justify-content-center"
  >
    <p class="my-4">
      Tem certeza de que deseja
      <span class="font-weight-bolder">excluir</span> este registro?
    </p>
    <template #modal-footer>
      <b-button variant="danger" @click.once="remove()">Sim</b-button>
      <b-button @click.once="$bvModal.hide('delete-service')">Não</b-button>
    </template>
  </b-modal>
</template>
<script>
export default {
  name: 'Delete',
  props: {
    services: {
      type: Array | Object,
      default: null,
    },
    servicoSelecionado: {
      type: Object,
      default: {},
    },
  },

  emits: ['deleteService'],

  methods: {
    async remove() {
      await this.$axios
        .delete(`services/${this.servicoSelecionado.id}`)
        .then(() => {
          this.$emit('deleteService', '');
          this.toast('success', 'Sucesso', 'Serviço deletado com sucesso!');
        })
        .catch((err) => {
          this.toast('error', 'Erro', 'Erro ao deletar o serviço!');
          console.error(err);
        })
        .finally(() => {
          this.$bvModal.hide('delete-service');
          this.formSend = false;
        });
    },
  },
};
</script>
