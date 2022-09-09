<template>
  <div class="pb-5">
    <PainelHeader :tela="telaName" />
    <main class="container">
      <PainelAside v-if="$screen.lg" />
      <section>
        <div class="d-flex align-items-center mb-5">
          <b-form-input type="text" placeholder="Pesquisar"></b-form-input>
          <img class="ml-3" src="~/assets/img/icones/sliders.svg" />
          <button v-if="$screen.lg" @click="$bvModal.show('criar-proposta')">
            Criar Proposta
          </button>
        </div>
        <Listing :proposal-data="proposalData" />
        <Add />
      </section>
    </main>
    <div
      v-if="!$screen.lg"
      class="footer caixa mx-auto d-flex align-items-center mt-2"
    >
      <b-button
        class="d-flex justify-content-center align-items-center create m-0 border-0"
        @click="$bvModal.show('criar-proposta')"
        >Criar Proposta</b-button
      >
    </div>
  </div>
</template>

<script>
import PainelHeader from '~/components/layout/PainelHeader.vue';
import PainelAside from '~/components/layout/PainelAside.vue';
import Add from '~/components/proposal/Add.vue';
import Listing from '~/components/proposal/Listing.vue';

export default {
  components: { PainelHeader, PainelAside, Add, Listing },
  layout: 'auth',

  async asyncData({ $axios }) {
    const proposals = await $axios.get('business-proposal');
    const proposalData = proposals.data;
    console.log('business-proposal :: ', proposals.data);
    return { proposalData };
  },

  data: () => {
    return {
      telaName: 'Proposta',
      proposalData: [],
      formSend: false,
      formData: {
        name_customer: null,
        customer_id: null,
        budget_name: null,
        phone: null,
        ddd: null,
        email: null,
        photo: null,
        details: null,
        import: null,
        services: [],
        cnpj: null,
        name: null,
        proposal_expire_at: null,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  display: grid;
  grid-template-columns: 1fr 3fr;

  section {
    padding-left: 3rem;
  }

  img {
    margin-right: 3rem;
  }

  button {
    width: 50%;
  }
}
.footer {
  box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.05);
  height: 8.222rem;
  background: var(--gray-10);
  padding: 1.5rem;
  position: fixed;
  bottom: 0;
}

@media (max-width: 991px) {
  main {
    grid-template-columns: 1fr;

    section {
      padding-left: 0rem;
    }

    img {
      margin-right: 0rem;
    }
  }
}
</style>
