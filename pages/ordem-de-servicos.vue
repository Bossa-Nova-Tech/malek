<template>
  <div class="d-flex flex-column">
    <TheHeader> Ordem de Serviço </TheHeader>
    <main class="d-flex caixa mx-auto mb-5">
      <b-tabs pills class="mx-auto caixa" align="center">
        <!-- início da tab HOJE -->
        <b-tab id="hoje" title="Hoje" active>
          <Delete />
          <Add />
          <div
            class="footer caixa d-flex justify-content-center align-items-center mt-2"
          >
            <b-button
              class="d-flex justify-content-center align-items-center create m-0 border-0"
              @click="$bvModal.show('criar')"
              >Criar Ordem de Serviço</b-button
            >
            <!-- tela modal-criar-ordemservico -->

            <!-- final tela modal-criar-ordemservico -->
          </div>
        </b-tab>
        <b-tab id="relatorio">
          <!-- início da tab Relatório -->
          <template #title> Relatório </template>
          <b-card class="box-shadow border-0 mt-2 mb-1">
            <h2 class="mb-4">Em andamento</h2>
            <Flicking :options="{ align: 'prev', bound: true }">
              <div class="d-flex">
                <div
                  v-for="(ordem, index) in tasksData"
                  :key="index"
                  class="mr-4"
                >
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
import Delete from '~/components/tasks/Delete.vue';
// import BorderButton from '~/components/BorderButton.vue';
export default {
  // components: { Flicking, TheHeader, Graphic, BorderButton },
  components: { Flicking, TheHeader, Graphic, Add, Delete },
  async asyncData({ $axios }) {
    const tasks = await $axios.get('tasks');
    const tasksData = tasks.data;
    console.log('tasks :: ', tasks.data);
    return { tasksData };
  },

  data: () => {
    return {
      saved: false,
      formEditing: null,
      ordens: [],
      formSend: false,
      editing: false,
      formData: {
        need_signature: false,
        photo: [],
        estimated_time: null,
        end_date: null,
        note: null,
        name_customer: 'HAVAN Unidade 02',
        template: null,
        services: null,
        // name: 'José da Silveira',
        /* performance: null, */
        time_of_execution: '02h30',
      },
      formDataEdited: {
        need_signature: false,
        photo: [],
        estimated_time: null,
        end_date: null,
        note: null,
        name_customer: null,
        template: null,
        services: null,
        time_of_execution: null,
      },
      photo_perfil: [require('~/assets/img/icones/icone-perfil.svg')],
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
      title: `Ordem de Serviços |  ${process.env.title}`,
    };
  },

  methods: {
    showModal2(index) {
      this.$root.$emit('bv::show::modal', 'modal-2', index);
    },
    hideModal2(index) {
      this.$root.$emit('bv::hide::modal', 'modal-2', index);
    },

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
</style>
