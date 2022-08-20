<template>
  <b-container>
    <main class="caixa min-vh-100 mx-auto">
      <h1>Cadastrar empresa</h1>
      <h2>Minha marca</h2>

      <b-form-file
        id="file"
        v-model="formData.photo"
        accept="image/jpeg, image/png, image/jpg"
        plain
        multiple
        :class="{ 'is-invalid': $v.formData.photo.$error }"
      ></b-form-file>
      <b-form-feedback class="text-center h5">
        Envio necessário. Clique abaixo para fazer o upload da sua logo.
      </b-form-feedback>
      <label for="file" class="text-center">
        <img src="~/assets/img/icones/upload.svg" alt="" />
        <p>Clique para enviar sua logo</p>
        <span>PNG, JPG (tamanho máximo X)</span>
      </label>

      <button class="mb-3 mt-3" :disabled="formSend" @click="register">
        <b-spinner v-if="formSend" v-b-modal.modal-center small type="grow" />
        Concluir
      </button>

      <div>
        <b-modal
          id="modal-center"
          ref="modal"
          centered
          hide-header
          hide-footer
          no-close-on-backdrop
          no-close-on-esc
          no-enforce-focus
          body-bg-variant="white"
          body-class="rounded"
        >
          <div class="d-flex flex-column align-items-center">
            <img src="~/assets/img/icones/email-icon.svg" alt="" class="py-4" />
            <h3 class="text-center">Verifique seu e-mail</h3>
            <p class="text-center pb-5">
              Foi encaminhado um email para email@email.com
            </p>
            <NuxtLink to="/login">Clique aqui para realizar o login</NuxtLink>
          </div>
        </b-modal>
      </div>
    </main>
  </b-container>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

export default {
  mixins: [validationMixin],

  data: () => {
    return {
      formSend: false,
      formData: {
        photo: null,
      },
    };
  },
  head() {
    return {
      title: `Cadastro |  ${process.env.title}`,
    };
  },

  validations: {
    formData: {
      photo: {
        required,
      },
    },
  },
  methods: {
    async register(_response) {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.formSend = true;
        console.log(this.formData);

        try {
          this.formSend = false;
          this.$v.$reset();

          console.log('executou o clic');

          await this.$axios
            .post('companies', this.$data.formData)
            .then((_res) => {
              this.$refs.modal.show();
            })
            .catch((_err) => {});
        } catch (error) {
          console.log(error);
        }
      }
    },
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

  label {
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
