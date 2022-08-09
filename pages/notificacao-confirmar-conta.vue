<template>
  <div class="fundo">
    <main class="row justify-content-center align-items-center min-vh-100">
      <b-container class="box">
        <img src="~/assets/img/icones/email-icon.svg" alt="" />
        <h5>Verifique seu email</h5>
        <p class="text-center">Foi encaminhado um email para email@gmail.com</p>

        <NuxtLink to="login">Clique aqui para realizar o login</NuxtLink>
      </b-container>
    </main>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.fundo {
  background-color: var(--primary-80);
}

.box {
  display: grid;
  justify-items: center;
  height: 320px;
  width: 70%;
  background: var(--gray-10);
  border-radius: 10px;
  padding: 33px 37px;
}
</style>
