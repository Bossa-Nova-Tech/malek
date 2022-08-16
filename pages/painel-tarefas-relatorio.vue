<template>
  <div class="d-flex flex-column">
    <TheHeader> Ordem de Serviço </TheHeader>
    <main class="d-flex caixa mx-auto mb-5">
      <b-tabs pills class="mx-auto caixa" align="center"
        ><b-tab title="Hoje" active>
          <div class="content">conteúdo Borges</div>
          <div
            class="footer caixa d-flex justify-content-center align-items-center"
          >
            <b-button
              class="d-flex justify-content-center align-items-center create m-0 border-0"
              @click="showModal = true"
              >Criar Ordem de Serviço</b-button
            >
            <!-- tela modal-criar-ordemservico -->
            <b-modal
              ref="modal"
              v-model="showModal"
              header-class="border-0 d-flex flex-column"
              footer-class="border-0"
            >
              <template #modal-header>
                <b-img
                  src="~/assets/img/icones/seta-voltar-azul.svg"
                  class="mt-5 ml-3 mb-4"
                ></b-img>
                <h1 class="mt-2 ml-3">Criar Ordem de Serviço</h1>
              </template>
              <template #default>
                <b-form-group label="Tamplate" label-for="formData.template">
                  <b-form-select
                    v-model="formData.template"
                    :options="optionsTemplate"
                  >
                  </b-form-select>
                </b-form-group>
                <b-form-group label="Categoria" label-for="formData.services">
                  <b-form-select
                    v-model="formData.services"
                    :options="optionsServices"
                  >
                  </b-form-select>
                </b-form-group>
                <b-form-group
                  label="Cliente"
                  label-for="formData.name_customer"
                >
                  <b-form-select
                    v-model="formData.name_customer"
                    :options="optionsNameCustomer"
                  >
                  </b-form-select>
                </b-form-group>
                <b-form-group label="Colaborador" label-for="formData.name">
                  <b-form-select
                    v-model="formData.name"
                    :options="optionsNames"
                  >
                  </b-form-select>
                </b-form-group>
                <BorderButton>Enviar Fotos</BorderButton>
                <b-form-group
                  label="Duração média da tarefa"
                  label-for="formData.estimated_time"
                >
                  <b-form-select
                    v-model="formData.estimated_time"
                    :options="optionsEstimatedTime"
                  >
                  </b-form-select>
                </b-form-group>
                <b-form-group
                  label="Data prevista de conclusão"
                  label-for="formData.name"
                >
                  <b-form-datepicker
                    v-model="formData.end_date"
                    :options="optionsNames"
                  >
                  </b-form-datepicker>
                </b-form-group>
                <b-form-group
                  label="Observação"
                  label-for="formData.observation"
                >
                  <b-form-input
                    v-model="formData.observation"
                    placeholder="Esta tarefa consiste em..."
                  >
                  </b-form-input>
                </b-form-group>
              </template>

              <template #modal-footer>
                <div class="w-100">
                  <b-button
                    variant="primary"
                    size="sm"
                    class="float-right"
                    @click="showModal = false"
                  >
                    Salvar
                  </b-button>
                </div>
              </template>
            </b-modal>
            <!-- final tela modal-criar-ordemservico -->
          </div>
        </b-tab>
        <b-tab>
          <template #title> Relatório </template>
          <b-card class="box-shadow border-0 mt-2 mb-1">
            <h2 class="mb-4">Em andamento</h2>
            <Flicking :options="{ align: 'prev', bound: true }">
              <div class="mr-4">
                <p>{{ formData.name }}</p>
                <p class="lugar">{{ formData.name_customer }}</p>
                <span class="font-weight-bolder">{{
                  formData.performance
                }}</span>
                <span class="horas">{{ formData.time_of_execution }}</span>
              </div>
              <div class="mr-4">
                <p>{{ formData.name }}</p>
                <p class="lugar">{{ formData.name_customer }}</p>
                <span class="font-weight-bolder">{{
                  formData.performance
                }}</span>
                <span class="horas">{{ formData.time_of_execution }}</span>
              </div>
              <div class="mr-4">
                <p>{{ formData.name }}</p>
                <p class="lugar">{{ formData.name_customer }}</p>
                <span class="font-weight-bolder">{{
                  formData.performance
                }}</span>
                <span class="horas gray-40">{{
                  formData.time_of_execution
                }}</span>
              </div>
            </Flicking>
          </b-card>
          <b-card class="box-shadow mb-1 border-0">
            <h2 class="mb-3">Ordens de serviço</h2>
            <Graphic />
          </b-card>

          <b-card class="box-shadow border-0">
            <h2 class="mb-3">Desempenho por colaborador</h2>
            <b-form-select
              v-model="formData.employeePerformance"
              :options="optionsEmployeePerformance"
            >
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
import BorderButton from '~/components/BorderButton.vue';
export default {
  components: { Flicking, TheHeader, Graphic, BorderButton },
  data: () => {
    return {
      showModal: false,
      formData: {
        estimated_time: null,
        end_date: null,
        observation: null,
        name_customer: 'HAVAN Unidade 01',
        template: null,
        services: null,
        name: 'name_01',
        performance: '75%',
        time_of_execution: '02h30',
        employeePerformance: null,
      },
      optionsEmployeePerformance: [
        {
          value: null,
          text: 'Selecione',
        },
        {
          value: 'a',
          text: 'Joana',
        },
        {
          value: 'b',
          text: 'Fred',
        },
      ],
      optionsTemplate: [
        {
          value: null,
          text: 'Selecione',
        },
        {
          value: 'manutention',
          text: 'Manutenção',
        },
        {
          value: 'instalation',
          text: 'Instalação',
        },
      ],
      optionsServices: [
        {
          value: null,
          text: 'Selecione',
        },
        {
          value: 'manutention',
          text: 'Manutenção',
        },
        {
          value: 'instalation',
          text: 'Instalação',
        },
      ],
      optionsNameCustomer: [
        {
          value: null,
          text: 'Selecione',
        },
        {
          value: 'havan_02',
          text: 'HAVAN Unidade 02',
        },
        {
          value: 'instalation',
          text: 'Instalação',
        },
      ],
      optionsNames: [
        {
          value: null,
          text: 'Selecione',
        },
        {
          value: 'name_01',
          text: 'José da Silveira',
        },
        {
          value: 'name_02',
          text: 'Pedro Santos',
        },
      ],
      optionsEstimatedTime: [
        {
          value: null,
          text: 'Selecione',
        },
        {
          value: 'time_01',
          text: '02horas e 30min',
        },
        {
          value: 'time_02',
          text: '03horas e 30min',
        },
      ],
    };
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
  .content {
    min-height: calc(100vh - 8.222rem - 10.5rem);
  }
  .footer {
    box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.05);
    height: 8.222rem;
    background: var(--gray-10);
    padding: 1.5rem;
  }
}
</style>
