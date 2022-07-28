<template>
  <div class="d-flex flex-column justify-content-between w-100">
    <div>
      <header class="d-flex align-items-center">
        <NuxtLink to="/">
          <img src="~/assets/img/icones/seta-voltar.svg" alt="" />
        </NuxtLink>
        <h1>Ordem de Serviço</h1>
      </header>

      <main class="mb-5">
        <b-container class="d-flex px-4 mb-4">
          <b-form-input placeholder="Procurar" class="mr-3"></b-form-input>
          <img src="~/assets/img/icones/sliders.svg" alt="" />
        </b-container>

        <section>
          <b-container class="card-servico mb-4">
            <div class="d-flex align-items-center justify-content-between pb-2">
              <span class="manutencao malek-x">Manutenção</span>
              <span class="local malek-gray">HAVAN Unidade 01</span>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <img src="~/assets/img/icones/foto-perfil.svg" alt="" />
                <span class="pl-3">José S. Silveira</span>
              </div>
              <div>
                <span class="porcentagem malek-x">75%</span>
                <span class="tempo malek-gray">02h30</span>
              </div>
            </div>
          </b-container>

          <b-container class="card-servico">
            <div class="d-flex align-items-center justify-content-between pb-2">
              <span class="manutencao malek-x">Manutenção</span>
              <span class="local malek-gray">HAVAN Unidade 01</span>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <img src="~/assets/img/icones/foto-perfil.svg" alt="" />
                <span class="pl-3">José S. Silveira</span>
              </div>
              <div>
                <span class="porcentagem malek-x">75%</span>
                <span class="tempo malek-gray">02h30</span>
              </div>
            </div>
          </b-container>
        </section>
      </main>
    </div>
    <footer>
      <div class="container d-flex bg-white">
        <button class="mx-auto">Criar Ordem de Serviço</button>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
header {
  color: #ffffff;
  background: radial-gradient(
    108.61% 221.61% at 104.58% 0%,
    #76b4ff 0%,
    #0f4181 100%
  );
  margin-bottom: 1.25rem;

  h1 {
    padding: 3.313rem 0rem 2.188rem 2.813rem;
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 150%;
    margin-bottom: 0px;
  }

  img {
    padding: 1.063rem 0rem 0rem 1.875rem;
  }
}

footer {
  background-color: #ffffff;
  box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.05);
  div {
    padding: 25px 0px 33px 0px;
    max-width: 20.625rem;
  }
  button {
    width: 100%;
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;
    color: #ffffff;
    background: #000066;
    border-radius: 8px;
    padding: 10px 0px 10px 0px;
  }
}
.card-servico {
  padding: 20px 25px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 71, 187, 0.06);
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
  font-size: 10px;
}
</style>
