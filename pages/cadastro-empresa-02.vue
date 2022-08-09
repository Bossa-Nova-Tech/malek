<template>
  <b-container>
    <main class="row justify-content-center align-items-center min-vh-100">
      <b-form class="col col-lg-4">
        <h1 class="mt-5 pb-3">Cadastrar empresa</h1>
        <h2 class="pb-5">Minha marca</h2>

        <div>
          <p>Clique para enviar sua logo</p>
          <span>PNG, JPG (tamanho máximo X)</span>
        </div>

        <button
          block
          variant="primary"
          class="mb-3 mt-3"
          :disabled="formSend"
          @click="login"
        >
          <b-spinner v-if="formSend" small type="grow" />
          Avançar
        </button>
      </b-form>
    </main>
  </b-container>
</template>

<script></script>

<style lang="scss" scoped>
img {
  margin-bottom: 70px;
}

label {
  font-weight: 500;
  font-size: 12px;
  color: var(--malek-gray3);
}

.text-sm {
  font-weight: 400;
  color: var(--malek-gray3);
}
</style>
