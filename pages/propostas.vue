<template>
  <div class="pb-5">
    <PainelHeader :tela="telaName" />
    <main class="container">
      <PainelAside class="mobile" />
      <section>
        <div class="d-flex align-items-center mb-5">
          <b-form-input type="text" placeholder="Pesquisar"></b-form-input>
          <img class="ml-3" src="~/assets/img/icones/sliders.svg" />
          <button class="mobile" @click="$bvModal.show('criar-proposta')">
            Criar Proposta
          </button>
        </div>
        <Listing :proposal-data="proposalData" />
        <Add />
      </section>
    </main>
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

@media (max-width: 1000px) {
  main {
    grid-template-columns: 1fr;

    section {
      padding-left: 0rem;
    }

    img {
      margin-right: 0rem;
    }

    .mobile {
      display: none;
    }
  }
}
</style>
