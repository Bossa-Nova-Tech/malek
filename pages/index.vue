<template>
  <b-container>
    <main class="row justify-content-center align-items-center min-vh-100">
      <b-form class="col col-lg-6">
        <img
          class="row mx-auto"
          alt="logo"
          src="~/assets/img/V1.webp"
          width="200px"
          height="200px"
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
          <b-form-checkbox v-model="formData.checked" class="text-sm"
            >Lembrar senha</b-form-checkbox
          >
          <a
            href="https://wa.me/554788510302?text=Ol%C3%A1,%20tudo%20bem?%20Eu%20esqueci%20minha%20senha,%20poderia%20verificar%20por%20gentileza?"
            ><u>Esqueci minha senha</u></a
          >
        </div>

        <button block class="mt-3" :disabled="formSend" @click="login">
          <b-spinner v-if="formSend" small type="grow" />
          Entrar
        </button>
        <div class="d-flex mt-3">
          <p class="mr-2">Não possui conta ainda?</p>
          <NuxtLink to="/cadastro-empresa" class="font-weight-bolder"
            >Cadastre-se</NuxtLink
          >
        </div>
      </b-form>
    </main>
  </b-container>
</template>

<script>
import Splash from '~/components/Splash.vue';
import { required, email } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

export default {
  name: 'Login',

  mixins: [validationMixin],

  data: () => {
    return {
      isLoading: true,
      onboarding: true,
      formSend: false,
      formData: {
        email: null,
        password: null,
        checked: false,
      },
    };
  },

  head() {
    return {
      title: `Login |  ${process.env.title}`,

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
  mounted() {
    localStorage.onboarding = this.onboarding;

    if (localStorage.password) {
      this.formData.password = localStorage.password;
    }
    if (localStorage.email) {
      this.formData.email = localStorage.email;
    }
  },
  methods: {
    async login() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.formSend = true;
        try {
          const { email, password } = this.formData;

          await this.$auth.loginWith('laravelJWT', {
            data: { email, password },
          });

          this.formSend = false;

          if (this.$auth.user.company_id && this.$auth.$state.loggedIn) {
            if (!this.$screen.lg) {
              window.$nuxt.$router.push('/painel-adm-atual');
            } else {
              window.$nuxt.$router.push('/ordem-de-servicos');
            }
          }
          if (this.formData.checked) {
            localStorage.email = this.formData.email;
            localStorage.password = this.formData.password;
          }
        } catch {
          return;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  margin-bottom: 4.375rem;
}

label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--gray-40);
}

.text-sm {
  font-weight: 400;
  color: var(--gray-40);
}
</style>
