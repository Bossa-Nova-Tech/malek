<template>
  <div>
    <MontagemForms :form="formsData" />
    <button @click="$bvModal.show('montagem')">Click para montar o form</button>
  </div>
</template>
<script>
import MontagemForms from '~/components/forms/MontagemForms.vue';
export default {
  components: {
    MontagemForms,
  },
  // Dados estáticos, quando tivermos os forms em serviços e em OS termos que passar esse .get para o componente <MontagemForms/> e o componente para a tela de OS e Visitas.
  async asyncData({ $axios }) {
    const forms = await $axios.get('forms/59');
    const formsData = forms.data;
    return { formsData };
  },
};
</script>

<style></style>
