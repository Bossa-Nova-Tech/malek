<template>
  <div class="d-flex flex-column altura">
    <TheHeader> Ordem de serviço </TheHeader>
    <main class="mb-5">
      <div class="tabs mx-auto">
        <span @click="setActive('tab-1')"> Hoje </span>
        <span @click="setActive('tab-2')"> Relatório </span>
      </div>

      <section v-show="isActive('tab-1')">
        <b-container class="card-servico mb-4">
          <div class="d-flex align-items-center justify-content-between pb-2">
            <h2 class="manutencao primary-80">
              {{ formData.type_of_service }}
            </h2>
            <p class="local gray-40">{{ formData.place }}</p>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <img src="~/assets/img/icones/foto-perfil.svg" alt="" />
              <span class="pl-3">{{ formData.name }}</span>
            </div>
            <div>
              <span class="porcentagem primary-80">
                {{ formData.performance }}</span
              >
              <span class="tempo gray-40"
                >{{ formData.time_of_execution }}
              </span>
            </div>
          </div>
        </b-container>
      </section>

      <section v-show="isActive('tab-2')">
        <b-container class="card-servico mb-4">
          <h1>Parte Vanessa</h1>
        </b-container>
      </section>
    </main>

    <TheFooter> Criar Ordem de Serviço </TheFooter>
  </div>
</template>

<script>
import TheHeader from '~/components/layout/TheHeader.vue';
import TheFooter from '~/components/layout/TheFooter.vue';
export default {
  components: { TheHeader, TheFooter },

  data: () => ({
    activeTab: 'tab-1',
  }),
  methods: {
    setActive(tab) {
      this.activeTab = tab;
    },
    isActive(tab) {
      return this.activeTab === tab;
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  .tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 20.8125rem;
    justify-items: center;
  }
  section {
    height: 62vh;
    overflow: auto;
  }
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
</style>
