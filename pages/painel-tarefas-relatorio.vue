<template>
  <div class="d-flex flex-column">
    <TheHeader> Ordem de Serviço </TheHeader>
    <main class="d-flex caixa mx-auto mb-5">
      <b-tabs pills class="mx-auto caixa" align="center"
        ><b-tab title="Hoje" active></b-tab>
        <b-tab>
          <template #title> Relatório </template>
          <b-card class="border-0 mt-2 mb-1">
            <h2 class="mb-4">Em andamento</h2>
            <Flicking :options="{ align: 'prev', bound: true }">
              <div class="mr-4">
                <p>{{ formData.name }}</p>
                <p class="lugar">{{ formData.place }}</p>
                <span class="font-weight-bolder">{{
                  formData.performance
                }}</span>
                <span class="horas">{{ formData.time_of_execution }}</span>
              </div>
              <div class="mr-4">
                <p>{{ formData.name }}</p>
                <p class="lugar">{{ formData.place }}</p>
                <span class="font-weight-bolder">{{
                  formData.performance
                }}</span>
                <span class="horas">{{ formData.time_of_execution }}</span>
              </div>
              <div class="mr-4">
                <p>{{ formData.name }}</p>
                <p class="lugar">{{ formData.place }}</p>
                <span class="font-weight-bolder">{{
                  formData.performance
                }}</span>
                <span class="horas">{{ formData.time_of_execution }}</span>
              </div>
            </Flicking>
          </b-card>
          <b-card class="mb-1 border-0">
            <h2 class="mb-3">Ordens de serviço</h2>
          </b-card>

          <b-card class="border-0">
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
export default {
  components: { Flicking, TheHeader },
  data: () => {
    return {
      formData: {
        name: 'José S. Silveira',
        place: 'HAVAN Unidade 01',
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
    color: var (--gray-40);
    font-size: 0.625rem;
  }
  span & .font-weight-bolder {
    font-size: 1.25rem;
    color: var(--primary-80);
  }
  .nav-pills .nav-link.active,
  .nav-pills .show > .nav-link {
    width: 10rem;
  }
}
</style>
