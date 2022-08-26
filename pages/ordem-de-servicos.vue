<template>
  <div class="d-flex flex-column">
    <header v-if="$screen.md">
      <div class="top"></div>
      <div class="container">
        <div class="logo position-relative">
          <b-img src="~/assets/img/logo-desktop-painel.svg" alt="" />
        </div>
        <div class="hello d-flex flex-column mt-5">
          <h3>Olá {{ $auth.user.name }},</h3>
          <p>Acompanhe por aqui o desempenho geral da sua empresa</p>
        </div>
      </div>
    </header>
    <TheHeader v-else> Ordem de Serviço </TheHeader>
    <main v-if="$screen.md" class="container">
      <aside v-if="$screen.md">
        <NuxtLink to="/propostas" class="d-flex my-4 align-items-center">
          <img src="~/assets/img/icones/proposta.svg" alt="" />
          <p class="pl-4">Propostas</p>
        </NuxtLink>
        <NuxtLink
          to="/ordem-de-servicos"
          class="d-flex align-items-center my-4"
        >
          <img src="~/assets/img/icones/ordem.svg" alt="" />
          <p class="pl-4 py-0">Ordem de Serviço</p>
        </NuxtLink>
        <NuxtLink to="/clientes" class="d-flex align-items-center my-4">
          <img src="~/assets/img/icones/clientes.svg" alt="" />
          <p class="pl-4">Clientes</p>
        </NuxtLink>

        <NuxtLink to="/cobranca" class="d-flex align-items-center my-4">
          <img src="~/assets/img/icones/cobranca.svg" alt="" />
          <p class="pl-4">Cobrança</p>
        </NuxtLink>
        <NuxtLink to="/orcamento" class="d-flex align-items-center my-4">
          <img src="~/assets/img/icones/orcamento.svg" alt="" />
          <p class="pl-4">Orçamento</p>
        </NuxtLink>

        <NuxtLink to="/colaboradores" class="d-flex align-items-center my-4">
          <img src="~/assets/img/icones/colaboradores.svg" alt="" />
          <p class="pl-4">Colaboradores</p>
        </NuxtLink>
      </aside>
      <div class="ml-5 d-flex justify-content-between">
        <div class="d-flex w-100">
          <b-tabs pills class="mx-auto w-100">
            <b-tab id="hoje" title="Hoje" active>
              <h2 class="my-5 ml-3">Acontecendo Hoje</h2>
              <Listing :tasks-data="tasksData" />
            </b-tab>
            <b-tab id="relatorio" title="Relatório">b </b-tab>
          </b-tabs>
          <b-button
            class="d-flex justify-content-center align-items-center create m-0 border-0 w-50"
            @click="$bvModal.show('criar')"
            >Criar Ordem de Serviço</b-button
          >
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
        <b-tab id="relatorio">
          <!-- início da tab Relatório -->
          <template #title> Relatório </template>
          <b-card class="box-shadow border-0 mt-2 mb-1">
            <h2 class="mb-4">Em andamento</h2>
            <Flicking :options="{ align: 'prev', bound: true }">
              <div class="d-flex">
                <div v-for="ordem in tasksData" :key="ordem.id" class="mr-4">
                  <p>{{ ordem.name }}</p>
                  <p class="lugar">{{ ordem.name_customer }}</p>
                  <!-- <span class="font-weight-bolder">{{
                    ordem.performance
                  }}</span> -->
                  <span class="horas">{{ ordem.estimated_time }}</span>
                </div>
              </div>
            </Flicking>
          </b-card>
          <b-card class="box-shadow mb-1 border-0">
            <h2 class="mb-3">Ordens de serviço</h2>
            <Graphic />
          </b-card>

          <b-card class="box-shadow border-0">
            <h2 class="mb-3">Desempenho por colaborador</h2>
            <b-form-select v-model="formData.name" :options="optionsNames">
            </b-form-select>
          </b-card>
        </b-tab>
      </b-tabs>
    </main>
  </div>
</template>

<script>
import { Flicking } from '@egjs/vue-flicking';
import TheHeader from '~/components/layout/TheHeader.vue';
import Graphic from '~/components/Graphic.vue';
import Add from '~/components/tasks/Add.vue';
import Listing from '~/components/tasks/Listing.vue';
// import BorderButton from '~/components/BorderButton.vue';
export default {
  // components: { Flicking, TheHeader, Graphic, BorderButton },
  components: { Flicking, TheHeader, Graphic, Add, Listing },
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
      optionsNames: [
        {
          value: null,
          text: 'Selecione',
        },
        {
          value: 'José da Silveira',
          text: 'José da Silveira',
        },
        {
          value: 'Pedro Santos',
          text: 'Pedro Santos',
        },
      ],
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
  h2 {
    color: var(--primary-80);
  }
  p {
    font-size: 0.75rem;
    color: var(--gray-40);
  }
  p.lugar {
    font-weight: 600;
  }
  span.horas {
    font-size: 0.625rem;
  }
  span & .font-weight-bolder {
    font-size: 1.25rem;
    color: var(--primary-80);
  }
  .card-body {
    background: var(--gray-10);
  }
  .box-shadow {
    box-shadow: 0rem 0.25rem 0.25rem rgba(0, 71, 187, 0.06);
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
@media screen and (min-width: 768px) {
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
  aside > a {
    color: var(--gray-60);
    font-weight: 600;
  }
  aside {
    margin-bottom: 18.5rem;
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
