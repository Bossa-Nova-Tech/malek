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
      <b-button variant="danger" @click="remove(ordem)">Sim</b-button>
      <b-button @click="$bvModal.hide('excluir')">Não</b-button>
    </template>
  </b-modal>
</template>
<script>
export default {
  name: 'Delete',
  props: ['ordem'],
  /*   async asyncData({ $axios }) {
    const tasks = await $axios.get('tasks');
    const tasksData = tasks.data;
    console.log('tasks :: ', tasks.data);
    return { tasksData };
  }, */
  methods: {
    async remove(ordem) {
      // this.ordens.splice(index, 1);
      /* console.log('index :: ', index);
      console.log('ordem :: ', ordem); */
      try {
        await this.$axios
          .delete('tasks/' + ordem.id)
          .then((_res) => {
            if (_res.data.result === 'success') {
              console.log(ordem.id + ' excluido');
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
