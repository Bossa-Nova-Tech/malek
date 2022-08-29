<template>
  <div class="grid">
    <b-card class="andamento border-0 mt-2 mb-1">
      <h2 class="mb-4">Em andamento</h2>
      <Flicking :options="{ align: 'prev', bound: true }">
        <div class="d-flex overflow-auto">
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
    <b-card class="ordens box-shadow mt-2 mb-1 border-0">
      <h2 class="mb-3">Ordens de serviço</h2>
      <Graphic />
    </b-card>
    <b-card class="desempenho box-shadow border-0">
      <h2 class="mb-3">Desempenho por colaborador</h2>
      <b-form-select v-model="formData.name" :options="optionsNames">
      </b-form-select>
    </b-card>
    <b-card class="rendimento box-shadow border-0">
      <h2 class="mb-3">Rendimento</h2>
    </b-card>
  </div>
</template>
<script>
import { Flicking } from '@egjs/vue-flicking';
import Graphic from '~/components/Graphic.vue';
export default {
  components: { Flicking, Graphic },
  props: {
    tasksData: {
      type: Array,
      default: null,
    },
  },
  async asyncData({ $axios }) {
    const tasks = await $axios.get('tasks');
    const tasksData = tasks.data;
    console.log('tasks :: ', tasks.data);
    return { tasksData };
  },
  data() {
    return {
      id: null,
      saved: false,
      formSend: false,
      formEditing: null,
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
      photo_perfil: [require('~/assets/img/icones/icone-perfil.svg')],
    };
  },
};
</script>
<style lang="scss" scoped>
.grid {
  display: grid;
}
.card {
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
}
@media screen and (min-width: 992px) {
  .grid {
    grid-template-columns: 322px 322px;
  }
  .grid .card:nth-of-type(1) {
    order: 2;
  }

  .grid .card:nth-of-type(2) {
    order: 1;
  }

  .grid .card:nth-of-type(3) {
    order: 3;
  }

  .grid .card:nth-of-type(4) {
    order: 4;
  }
  .desempenho,
  .ordens,
  .andamento,
  .rendimento {
    display: grid;
    height: 14.75rem;
    box-shadow: 0px 4px 4px rgba(0, 71, 187, 0.06);
    border-radius: 8px;
  }
  .ordens,
  .desempenho {
    margin-right: 4px;
  }
  .flicking-camera {
    align-content: center;
  }
}
</style>
