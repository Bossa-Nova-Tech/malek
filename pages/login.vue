<template>
  <b-container>
    <main class="row justify-content-center align-items-center min-vh-100">
      <b-form class="col col-lg-4">
        <img
          class="row mx-auto"
          src="~/assets/img/ilustracao/logo.png"
          alt=""
        />

        <b-form-group class="mb-3">
          <label for="email">E-mail ou CPF / CNPJ</label>
          <b-form-input
            v-model="formData.email"
            name="email"
            type="email"
            placeholder="email@gmail.com"
            :class="{
              'is-invalid': $v.formData.email.$error,
            }"
          />
          <b-form-invalid-feedback>
            {{
              !$v.formData.email.email
                ? 'Insira um e-mail válido'
                : 'Preencha o campo acima'
            }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="mb-3">
          <label for="password">Senha</label>
          <b-form-input
            v-model="formData.password"
            name="password"
            type="password"
            placeholder="******"
            :class="{
              'is-invalid': $v.formData.password.$error,
            }"
          />
          <b-form-invalid-feedback>
            Preencha o campo acima
          </b-form-invalid-feedback>
        </b-form-group>

        <div class="d-flex justify-content-between align-items-center mb-3">
          <b-form-checkbox name="remember" class="text-sm"
            >Lembrar senha</b-form-checkbox
          >

          <NuxtLink to="/EsqueciMinhaSenha" class="text-sm"
            ><u>Esqueci minha senha</u></NuxtLink
          >
        </div>

        <button
          block
          variant="primary"
          class="mt-3"
          :disabled="formSend"
          @click="login"
        >
          <b-spinner v-if="formSend" small type="grow" />
          Entrar
        </button>
      </b-form>
    </main>
  </b-container>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

export default {
  name: 'Login',

  mixins: [validationMixin],

  data: () => {
    return {
      formSend: false,
      formData: {
        email: null,
        password: null,
      },
    };
  },

  head() {
    return {
      title: `NOME DA PÁGINA |  ${process.env.title}`,

      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '',
        },
      ],
    };
  },

  validations: {
    formData: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },

  methods: {
    login() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        // SIMULATION OF A DATA FETCHING REQUEST

        this.formSend = true;
        console.log(this.formData);

        this.promise()
          .then(() => {
            this.formSend = false;
            this.$v.$reset();

            this.formData = {
              email: null,
              required: null,
            };
          })
          .catch((error) => {
            this.formSend = false;

            console.log(error);

            this.toast('danger', 'Erro', error);
          });
      }
    },
  },
};
</script>

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
