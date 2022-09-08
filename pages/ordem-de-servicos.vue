<template>
  <div class="d-flex flex-column">
    <PainelHeader />
    <main v-if="$screen.lg" class="container">
      <AsideMenu />
      <div class="ml-5 d-flex justify-content-between">
        <div class="d-flex w-100">
          <b-tabs id="tab-listing" pills class="mx-auto w-100">
            <b-tab id="hoje" title="Hoje" active>
              <h2 class="mt-5 mb-3 ml-3">Acontecendo Hoje</h2>
              <Listing :tasks-data="tasksData" />
            </b-tab>
            <!-- ============== ABA RELATÓRIO================= -->
            <!-- <b-tab id="relatorio" title="Relatório" class="overflow-hiden">
              <Report :tasks-data="tasksData" />
            </b-tab> -->
            <b-tab id="em-atraso" title="Em atraso">
              <Listing :tasks-data="tasksData" />
              <Add />
              <div class="footer caixa mx-auto d-flex align-items-center mt-2">
                <b-button
                  class="d-flex justify-content-center align-items-center create m-0 border-0"
                  @click="$bvModal.show('criar')"
                  >Criar Ordem de Serviço</b-button
                >
              </div>
            </b-tab>
            <b-tab id="futuras" title="Futuras">
              <Listing :tasks-data="tasksData" />
              <Add />
              <div class="footer caixa mx-auto d-flex align-items-center mt-2">
                <b-button
                  class="d-flex justify-content-center align-items-center create m-0 border-0"
                  @click="$bvModal.show('criar')"
                  >Criar Ordem de Serviço</b-button
                >
              </div>
            </b-tab>
            <Add />
            <b-tab
              id="botao"
              title="Criar Ordem de Serviço"
              @click="$bvModal.show('criar')"
            >
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </main>

    <main v-else class="d-flex caixa mx-auto mb-5">
      <b-tabs pills class="mx-auto caixa" align="center">
        <!-- início da tab HOJE -->
        <b-tab id="hoje" title="Hoje" active>
          <Listing :tasks-data="tasksData" />
          <Add />
          <div class="footer caixa mx-auto d-flex align-items-center mt-2">
            <b-button
              class="d-flex justify-content-center align-items-center create m-0 border-0"
              @click="$bvModal.show('criar')"
              >Criar Ordem de Serviço</b-button
            >
          </div>
        </b-tab>
        <b-tab id="em-atraso" title="Em atraso">
          <Listing :tasks-data="tasksData" />
          <Add />
          <div class="footer caixa mx-auto d-flex align-items-center mt-2">
            <b-button
              class="d-flex justify-content-center align-items-center create m-0 border-0"
              @click="$bvModal.show('criar')"
              >Criar Ordem de Serviço</b-button
            >
          </div>
        </b-tab>
        <b-tab id="futuras" title="Futuras">
          <Listing :tasks-data="tasksData" />
          <Add />
          <div class="footer caixa mx-auto d-flex align-items-center mt-2">
            <b-button
              class="d-flex justify-content-center align-items-center create m-0 border-0"
              @click="$bvModal.show('criar')"
              >Criar Ordem de Serviço</b-button
            >
          </div>
        </b-tab>

        <!-- início da tab Relatório -->
        <!-- <b-tab id="relatorio">
          <template #title> Relatório </template>
          <Report :tasks-data="tasksData" />
        </b-tab> -->
      </b-tabs>
    </main>
  </div>
</template>

<script>
/* import Report from '../components/tasks/Report.vue'; */
import TheHeader from '~/components/layout/TheHeader.vue';
import Add from '~/components/tasks/Add.vue';
import Listing from '~/components/tasks/Listing.vue';
import PainelHeader from '~/components/layout/PainelHeader.vue';

export default {
  // components: { Flicking, TheHeader, Graphic, BorderButton },
  components: { TheHeader, Add, Listing, AsideMenu },
  async asyncData({ $axios }) {
    const tasks = await $axios.get('tasks');
    const tasksData = tasks.data;
    console.log('tasks :: ', tasks.data);
    return { tasksData };
  },

  data: () => {
    return {
      tasksData: [],
      formData: {
        need_signature: false,
        photo: [],
        estimated_time: null,
        end_date: null,
        note: null,
        name_customer: 'HAVAN Unidade 02',
        template: null,
        services: null,
        time_of_execution: '02h30',
      },
    };
  },

  head() {
    return {
      title: `Ordem de Serviços | ${process.env.title}`,
    };
  },

  methods: {
    setToEditing(index) {
      this.formEditing = index;
      setTimeout(() => {
        document.getElementById(`form-edit-${index}`).focus();
      }, 1);
      if (this.formDataEdited === null) {
        this.formDataEdited = this.formData;
      }
    },
    save(index) {
      this.saved = true;
      if (this.saved === true) {
        this.formData = this.formDataEdited;
      }
      console.log(this.formData);
      this.formEditing = !index;
      this.$root.$emit('bv::hide::modal', 'modal-1', index);
      this.formData = {
        services: null,
        name_customer: null,
        template: null,
        end_date: null,
        time_of_execution: null,
        estimated_time: null,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  p {
    font-size: 0.75rem;
    color: var(--gray-40);
  }

  .create {
    background: var(--primary-50);
    height: 2.82rem;
  }

  .footer {
    box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.05);
    height: 8.222rem;
    background: var(--gray-10);
    padding: 1.5rem;
    position: fixed;
    bottom: 0;
  }

  .card-servico {
    padding: 1.25rem 1.5625rem;
    background-color: #ffffff;
    box-shadow: 0rem 0.25rem 0.25rem rgba(0, 71, 187, 0.06);
  }
  .manutencao {
    font-weight: 600;
    font-size: 1rem;
  }

  .local {
    font-weight: 600;
    font-size: 0.75rem;
  }
  .porcentagem {
    font-weight: 700;
    font-size: 1.25rem;
  }
  .tempo {
    font-weight: 500;
    font-size: 0.625rem;
  }
}
@media screen and (min-width: 992px) {
  .container {
    width: min(59.125rem, 100%);
    margin-inline: auto;
    padding-inline: 1.5rem;
  }
  header {
    .top {
      background: linear-gradient(82.86deg, #003283 -10.8%, #6d92d8 113.3%);
      min-height: 7.125rem;
      background: url('~/assets/img/top-painel-adm.svg');
      background-size: cover;
      background-repeat: no-repeat;
    }
    .logo {
      margin-top: -2.5625rem;
    }
    .hello {
      padding-left: 9.375rem;
      margin-bottom: 5rem;
    }
  }
  main {
    display: grid;
    grid-template-columns: 1fr 3fr;
    .create {
      height: 2.5rem;
    }
    h2 {
      font-size: 1.5rem;
    }
  }
}
</style>
