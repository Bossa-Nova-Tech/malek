<template>
  <div class="caixa mx-auto">
    <header>
      <b-img src="~/assets/img/icones/logo-pdf.png" class="p-4" />
    </header>
    <main>
      <div class="img-slogan d-flex align-items-center justify-content-center">
        <h5 class="py-4">
          Especializada em <span>desenvolvimento</span>,
          <span>construção</span> e <span>instalação</span> de projetos de
          <span>refrigeração</span> comerciais e industriais.
        </h5>
      </div>
      <section>
        <h1>Proposta Comercial</h1>
        <div>
          <h2>UNIFEBE - Fundação Educacional de Brusque</h2>
          <p>CNPJ: 83.128.769/0001-17</p>
          <p>Rua Dorval Luz, 123, Bairro Santa Terezinha, Brusque - SC</p>
          <p>Fone: (47) 32117000 - CEP: 88352-400</p>
          <div class="mt-4 mb-2 d-flex justify-content-between">
            <h3>Serviços</h3>
            <h3>Valores</h3>
          </div>
          <div class="services d-flex justify-content-between pb-3">
            <div>
              <p>Limpeza de equipamento</p>
              <p>Manutenção de equipamentos</p>
            </div>
            <div>
              <p>R$ 360</p>
              <p>R$ 360</p>
            </div>
          </div>
          <h3 class="total d-flex justify-content-end">
            Total:&nbsp; <span> &nbsp;R$ 860</span>
          </h3>
        </div>
        <div class="d-flex justify-content-between">
          <h3>Criada em: <span>08/07/2022</span></h3>
          <h3>Expira em: <span>08/08/2022</span></h3>
        </div>
      </section>
    </main>
    <footer class="caixa mx-auto p">
      <section class="info d-flex align-items-center">
        <div class="logo-rodape mr-3">
          <b-img fluid src="~/assets/img/ilustracao/logo.png"></b-img>
        </div>
        <div>
          <p>(47) 9 99552020 - www.acme.com.br - contato@acme.com.br</p>
          <p>
            Centro Industrial Renaux (CIR), Avenida Primeiro de Maio, 1283
            Brusque - SC
          </p>
        </div>
      </section>
      <button @click="download">Baixar</button>
    </footer>
  </div>
</template>
<script>
export default {
  methods: {
    download() {
      this.$router.push('/propostas');
    },
  },
};
</script>
<style lang="scss" scoped>
main {
  padding-bottom: 1rem;
  padding-bottom: 10rem;
  .img-slogan {
    background: url('~/assets/img/ilustracao/img-pdf.png') no-repeat;
    background-size: cover;
    width: 100%;
    font-size: 9.375rem;
    color: var(--gray-10);
    padding-inline: 1.5rem;
  }
  h5 {
    font-weight: 400 !important;
  }
  section {
    padding-inline: 1.25rem;
  }
  h1 {
    margin-top: 1.5rem;
    margin-bottom: 1.525rem;
  }
  h3 {
    color: var(--gray-40);
    font-weight: 300;
    font-size: 0.7rem;
  }
  h2 {
    color: var(--gray-40);
  }
  p {
    font-size: 0.8rem;
    color: var(--gray-40);
  }
  span {
    font-weight: 600;
  }
  .total {
    font-weight: 500;
  }
  .services {
    font-weight: 500;
    font-size: 0.8rem;
    color: var(--gray-40);
    border-bottom: 1px solid;
    margin-bottom: 0.5rem;
  }
}
footer {
  position: fixed;
  bottom: 0;
  padding-inline: 1rem;
  padding-bottom: 1rem;
  .logo-rodape {
    max-width: 1.225rem;
  }
  section.info {
    padding-inline: 1.25rem;
    margin-bottom: 2.625rem;
  }
}
</style>
