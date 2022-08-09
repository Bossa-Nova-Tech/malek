<template>
  <main>
    <b-container class="box">
      <img src="~/assets/img/icones/email-icon.svg" alt="" />
      <h3>Verifique seu email</h3>
      <p class="text-center">Foi encaminhado um email para email@gmail.com</p>

      <NuxtLink to="login">Clique aqui para realizar o login</NuxtLink>
    </b-container>
  </main>
</template>

<script></script>

<style lang="scss" scoped>
main {
  display: grid;
  align-content: center;
  height: 100vh;
  background-color: var(--primary-80);

  img {
    padding-bottom: 2rem;
  }

  h3 {
    font-weight: 700;
    font-size: 1rem;
    color: var(--gray-80);
  }

  p {
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 1.125rem;
    color: var(--gray-40);
    padding-bottom: 2rem;
  }

  a {
    font-weight: 500;
    font-size: 0.875rem;
    text-decoration-line: underline;
    color: var(--gray-40);
  }

  .box {
    display: grid;
    justify-items: center;
    width: 90%;
    background: var(--gray-10);
    border-radius: 0.625rem;
    padding: 2.0625rem 2.3125rem;
  }
}
</style>
