<template>
  <div class="d-flex flex-column altura">
    <TheHeader>
      Ordem de serviço
      <!-- passar titulo aqui -->
    </TheHeader>
    <main class="mb-5">
      <b-container class="d-flex px-4 mb-4">
        <b-form-input placeholder="Procurar" class="mr-3"></b-form-input>
        <img src="~/assets/img/icones/sliders.svg" alt="" />
      </b-container>

      <section>
        <b-container class="card-servico mb-4">
          <div class="d-flex align-items-center justify-content-between pb-2">
            <h2 class="manutencao primary-80">Manutenção</h2>
            <p class="local gray-40">HAVAN Unidade 01</p>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <img src="~/assets/img/icones/foto-perfil.svg" alt="" />
              <span class="pl-3">José S. Silveira</span>
            </div>
            <div>
              <span class="porcentagem primary-80">75%</span>
              <span class="tempo gray-40">02h30</span>
            </div>
          </div>
        </b-container>
      </section>
    </main>

    <TheFooter>
      avançar
      <!-- passar nome do botão aqui -->
    </TheFooter>
  </div>
</template>

<script>
import TheHeader from '~/components/layout/TheHeader.vue';
import TheFooter from '~/components/layout/TheFooter.vue';
export default { components: { TheHeader, TheFooter } };
</script>

<style lang="scss" scoped>
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
