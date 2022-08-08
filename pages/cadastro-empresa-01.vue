<template>
  <b-container>
    <main class="row justify-content-center align-items-center min-vh-100">
      <b-form class="col col-lg-4">
        <h1 class="mt-5 pb-3">Cadastrar empresa</h1>
        <h2 class="pb-5">Minhas informações</h2>

        <b-row>
          <b-col cols="6">
            <b-form-group>
              <label for="name">Nome *</label>
              <b-form-input
                v-model="formData.name"
                name="name"
                type="text"
                placeholder="João"
              />
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group>
              <label for="lastname">Sobrenome *</label>
              <b-form-input
                v-model="formData.lastname"
                name="lastname"
                type="text"
                placeholder="Souza"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group>
          <label for="email">CPF / CNPJ *</label>
          <b-form-input
            v-model="formData.cnpj"
            name="cnpj"
            type="text"
            placeholder="00.000.000/000-00"
          />
        </b-form-group>

        <b-form-group>
          <label for="email">E-mail *</label>
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

        <b-form-group>
          <label for="email">Telefone *</label>
          <b-form-input
            v-model="formData.phone"
            name="phone"
            type="number"
            placeholder="(00) 00000-0000"
          />
        </b-form-group>

        <b-row>
          <b-col cols="6">
            <b-form-group>
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
          </b-col>

          <b-col cols="6">
            <b-form-group>
              <label for="password">Confirmar Senha</label>
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
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="6">
            <b-form-group>
              <label for="password">CEP</label>
              <b-form-input
                v-model="formData.password"
                name="cep"
                type="number"
                placeholder="000-00000"
              />
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group>
              <label for="password">Bairro</label>
              <b-form-input
                v-model="formData.password"
                name="bairro"
                type="text"
                placeholder="-"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="6">
            <b-form-group>
              <label for="password">Cidade</label>
              <b-form-input
                v-model="formData.password"
                name="Cidade"
                type="text"
                placeholder="-"
              />
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group>
              <label for="password">Estado</label>
              <b-form-input
                v-model="formData.password"
                name="Estado"
                type="text"
                placeholder="-"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="6">
            <b-form-group>
              <label for="password">Numero</label>
              <b-form-input
                v-model="formData.password"
                name="numero"
                type="number"
                placeholder="000"
              />
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group>
              <label for="password">Complemento</label>
              <b-form-input
                v-model="formData.password"
                name="Complemento"
                type="text"
                placeholder="-"
              />
            </b-form-group>
          </b-col>
        </b-row>

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
