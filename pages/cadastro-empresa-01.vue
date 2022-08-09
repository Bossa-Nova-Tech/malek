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
          <label for="cnpj">CPF / CNPJ *</label>
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

        <b-row>
          <b-col cols="4">
            <b-form-group>
              <label for="ddd">Telefone *</label>
              <b-form-input
                v-model="formData.ddd"
                name="ddd"
                type="number"
                placeholder="(00)"
              />
            </b-form-group>
          </b-col>

          <b-col cols="8">
            <b-form-group>
              <label for="phone"></label>
              <b-form-input
                id="phone"
                v-model="formData.phone"
                name="phone"
                type="number"
                placeholder="0 0000-0000"
              />
            </b-form-group>
          </b-col>
        </b-row>

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
              <label for="confirmpassword">Confirmar Senha</label>
              <b-form-input
                v-model="formData.confirmpassword"
                name="confirmpassword"
                type="password"
                placeholder="******"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="6">
            <b-form-group>
              <label for="cep">CEP *</label>
              <b-form-input
                v-model="formData.cep"
                name="cep"
                type="number"
                placeholder="000-00000"
              />
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group>
              <label for="district">Bairro</label>
              <b-form-input
                v-model="formData.district"
                name="district"
                type="text"
                placeholder="-"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="6">
            <b-form-group>
              <label for="city">Cidade</label>
              <b-form-input
                v-model="formData.city"
                name="city"
                type="text"
                placeholder="-"
              />
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group>
              <label for="uf">Estado</label>
              <b-form-input
                v-model="formData.uf"
                name="uf"
                type="text"
                placeholder="-"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="6">
            <b-form-group>
              <label for="addressNumber">Numero *</label>
              <b-form-input
                v-model="formData.addressNumber"
                name="addressNumber"
                type="number"
                placeholder="000"
              />
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group>
              <label for="complement">Complemento</label>
              <b-form-input
                v-model="formData.complement"
                name="Complement"
                type="text"
                placeholder="-"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <button class="mb-3 mt-3">Avançar</button>
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
        confirmpassword: null,
        name: null,
        lastname: null,
        cnpj: null,
        ddd: null,
        phone: null,
        cep: null,
        uf: null,
        city: null,
        district: null,
        addressNumber: null,
        Complement: null,
      },
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
h2 {
  color: var(--gray-40);
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

#phone {
  margin-top: 0.375rem;
}
</style>
