<template>
  <b-container>
    <main class="caixa min-vh-100 mx-auto">
      <h1>Cadastrar empresa</h1>
      <h2>Minha marca</h2>

      <b-form-file
        id="file"
        v-model="formData.photo"
        accept=".jpeg,.jpg,.png,image/jpeg,image/png"
        plain
        multiple
      ></b-form-file>
      <label for="file" class="label bloco text-center">
        <img src="~/assets/img/icones/upload.svg" alt="" />
        <p>Clique para enviar sua logo</p>
        <span>PNG, JPG (tamanho máximo X)</span>
      </label>

      <button v-b-modal.modal-center class="mb-3 mt-3">Concluir</button>

      <div>
        <b-modal
          id="modal-center"
          centered
          hide-header
          hide-footer
          title="BootstrapVue"
        >
          <div class="d-flex flex-column align-items-center">
            <img src="~/assets/img/icones/email-icon.svg" alt="" class="py-4" />
            <h3 class="text-center">Verifique seu e-mail</h3>
            <p class="text-center pb-5">
              Foi encaminhado um email para email@gmail.com
            </p>
            <NuxtLink to="/login">Clique aqui para realizar o login</NuxtLink>
          </div>
        </b-modal>
      </div>
    </main>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        photo: [],
      },
    };
  },
  head() {
    return {
      title: `Cadastro |  ${process.env.title}`,
    };
  },
};
</script>

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

  .bloco {
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
      padding-bottom: 2.5rem;
    }
  }
}
</style>
