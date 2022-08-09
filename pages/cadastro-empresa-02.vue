<template>
  <b-container>
    <main class="min-vh-100">
      <h1>Cadastrar empresa</h1>
      <h2>Minha marca</h2>

      <div>
        <img src="~/assets/img/icones/upload.svg" alt="" />
        <p>Clique para enviar sua logo</p>
        <span>PNG, JPG (tamanho máximo X)</span>
      </div>

      <button id="salvar">Salvar</button>

      <button class="mb-3 mt-3">Avançar</button>
    </main>
  </b-container>
</template>

<script></script>

<style lang="scss" scoped>
main {
  h1 {
    padding-top: 4rem;
    padding-bottom: 1rem;
  }
  h2 {
    padding-bottom: 3.75rem;
    color: var(--gray-40);
  }

  div {
    display: grid;
    justify-items: center;
    padding: 3.125rem;
    background-color: var(--gray-10);
    border-radius: 1.5625rem;
    margin-bottom: 2rem;

    img {
      padding-bottom: 2.5rem;
    }

    p {
      font-weight: 500;
      font-size: 0.875rem;
      line-height: 150%;
      text-decoration-line: underline;
      color: var(--gray-40);
      padding-bottom: 0.3125rem;
    }

    span {
      font-weight: 400;
      font-size: 0.75rem;
      line-height: 150%;
      color: var(--gray-40);
    }
  }
  #salvar {
    color: var(--primary-80);
    background-color: var(--gray-10);
    border: 0.0625rem solid #a9b1ce;
    box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.06);
    border-radius: 0.5rem;
    margin-bottom: 7.5rem;
  }
}
</style>
