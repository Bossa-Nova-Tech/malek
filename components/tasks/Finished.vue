<template>
  <b-modal
    :id="ordem.id"
    :ref="ordem.id"
    title="BootstrapVue"
    hide-header
    footer-class="border-0 d-flex flex-column align-items-center justify-content-center"
  >
    <p class="my-4">Tem certeza de que deseja concluir este registro?</p>
    <template #modal-footer>
      <b-button variant="danger" @click="remove(ordem)">Sim</b-button>
      <b-button @click="$bvModal.hide(ordem.id)">Não</b-button>
    </template>
  </b-modal>
</template>
<script>
export default {
  name: 'Delete',
  props: ['ordem'],
  data() {
    return {
      tasksData: [],
    };
  },
  /* mounted() {
    console.log('chamou o delete', this.ordem.id);
    const idRef = 'modal-' + this.ordem.id;
    console.log(idRef);
    return { idRef };
  }, */
  methods: {
    remove(ordem) {
      this.tasksData.splice(ordem.id, 1);
    },
  },
};
</script>
