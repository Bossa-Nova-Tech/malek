<template>
  <b-container>
    <main class="row justify-content-center align-items-center min-vh-100">
      <b-form class="col col-lg-6">
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
                :class="{
                  'is-invalid': $v.formData.name.$error,
                }"
              />
              <b-form-invalid-feedback>
                Preencha o campo acima
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group>
              <label for="last_name">Sobrenome *</label>
              <b-form-input
                v-model="formData.last_name"
                name="last_name"
                type="text"
                placeholder="Souza"
                :class="{
                  'is-invalid': $v.formData.last_name.$error,
                }"
              />
              <b-form-invalid-feedback>
                Preencha o campo acima
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group>
          <label for="cnpj">CPF / CNPJ *</label>
          <b-form-input
            v-model="formData.cnpj"
            v-mask="['###.###.###-##', '##.###.###/####-##']"
            name="cnpj"
            placeholder="00.000.000/000-00"
            :class="{ 'is-invalid': $v.formData.cnpj.$error }"
          />
          <b-form-invalid-feedback>
            {{
              !$v.formData.cnpj.minLength
                ? 'Insira um CNPJ válido'
                : 'Preencha o campo acima'
            }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group>
          <label for="fantasy_name">Nome da Empresa</label>
          <b-form-input
            v-model="formData.fantasy_name"
            name="fantasy_name"
            placeholder="-"
            :class="{ 'is-invalid': $v.formData.fantasy_name.$error }"
          />
          <b-form-invalid-feedback>
            Preencha o campo acima
          </b-form-invalid-feedback>
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
                v-mask="['(##)']"
                name="ddd"
                placeholder="(00)"
                :class="{
                  'is-invalid': $v.formData.ddd.$error,
                }"
              />
              <b-form-invalid-feedback>
                {{
                  !$v.formData.ddd.minLength
                    ? 'Insira um ddd válido'
                    : 'Preencha o campo acima'
                }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="8">
            <b-form-group>
              <label for="phone"></label>
              <b-form-input
                id="phone"
                v-model="formData.phone"
                v-mask="['#####-####']"
                name="phone"
                placeholder="0 0000-0000"
                :class="{
                  'is-invalid': $v.formData.phone.$error,
                }"
              />
              <b-form-invalid-feedback>
                {{
                  !$v.formData.phone.minLength
                    ? 'Insira um telefone válido'
                    : 'Preencha o campo acima'
                }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="6">
            <b-form-group>
              <label for="password">Senha *</label>
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
                {{
                  !$v.formData.password.minLength
                    ? 'No mínimo 8 caracteres'
                    : 'Insira uma senha'
                }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group>
              <label for="confirm_password">Confirmar Senha *</label>
              <b-form-input
                v-model="formData.confirm_password"
                name="confirm_password"
                type="password"
                placeholder="******"
                :class="{
                  'is-invalid': $v.formData.confirm_password.$error,
                }"
              />
              <b-form-invalid-feedback>
                {{
                  !$v.formData.confirm_password.sameAsPassword
                    ? 'Senhas diferentes'
                    : 'Insira uma senha'
                }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group>
          <label for="address">Endereço</label>
          <b-form-input
            v-model="formData.address"
            name="address"
            type="text"
            placeholder="-"
            :class="{
              'is-invalid': $v.formData.address.$error,
            }"
          />
          <b-form-invalid-feedback>
            Preencha o campo acima
          </b-form-invalid-feedback>
        </b-form-group>

        <b-row>
          <b-col cols="6">
            <b-form-group>
              <label for="cep">CEP *</label>
              <b-form-input
                v-model="formData.cep"
                name="cep"
                type="number"
                placeholder="000-00000"
                :class="{
                  'is-invalid': $v.formData.cep.$error,
                }"
              />
              <b-form-invalid-feedback>
                Preencha o campo acima
              </b-form-invalid-feedback>
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
                :class="{
                  'is-invalid': $v.formData.district.$error,
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
              <label for="city">Cidade</label>
              <b-form-input
                v-model="formData.city"
                name="city"
                type="text"
                placeholder="-"
                :class="{
                  'is-invalid': $v.formData.city.$error,
                }"
              />
              <b-form-invalid-feedback>
                Preencha o campo acima
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group>
              <label for="state">Estado</label>
              <b-form-input
                v-model="formData.state"
                name="state"
                type="text"
                placeholder="-"
                :class="{
                  'is-invalid': $v.formData.state.$error,
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
              <label for="number">Numero *</label>
              <b-form-input
                v-model="formData.number"
                name="number"
                type="number"
                placeholder="000"
                :class="{
                  'is-invalid': $v.formData.number.$error,
                }"
              />
              <b-form-invalid-feedback>
                Preencha o campo acima
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <b-col cols="6">
            <b-form-group>
              <label for="complement">Complemento</label>
              <b-form-input
                v-model="formData.complement"
                name="complement"
                type="text"
                placeholder="-"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </main>

    <div class="row justify-content-center mb-4 mx-1">
      <button class="col col-lg-4" :disabled="formSend" @click="register">
        <b-spinner v-if="formSend" small type="grow" />
        Avançar
      </button>
    </div>
    <!-- <b-button v-b-modal="'modal-center'">Show Modal</b-button> -->
    <div>
      <b-modal
        id="modal-center"
        ref="modal-center"
        centered
        hide-header
        hide-footer
        title="BootstrapVue"
      >
        <div class="d-flex flex-column align-items-center">
          <img src="~/assets/img/icones/email-icon.svg" alt="" class="py-4" />
          <h3 class="text-center">Cadastro realizado com sucesso!</h3>
          <NuxtLink to="/login">Clique aqui para realizar o login</NuxtLink>
        </div>
      </b-modal>
    </div>
  </b-container>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { mask } from 'vue-the-mask';

export default {
  name: 'RegisterCompany',

  directives: { mask },
  mixins: [validationMixin],

  data: () => {
    return {
      formSend: false,
      formData: {
        name: null,
        last_name: null,
        cnpj: null,
        fantasy_name: null,
        ddd: null,
        phone: null,
        email: null,
        password: null,
        confirm_password: null,
        cep: null,
        district: null,
        city: null,
        state: null,
        number: null,
        complement: null,
        address: null,
      },
    };
  },

  validations: {
    formData: {
      name: {
        required,
      },
      last_name: {
        required,
      },
      cnpj: {
        required,
        minLength: minLength(13),
      },
      ddd: {
        required,
        minLength: minLength(2),
      },
      phone: {
        required,
        minLength: minLength(9),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      confirm_password: {
        required,
        sameAsPassword: sameAs('password'),
      },
      cep: {
        required,
      },
      district: {
        required,
      },
      city: {
        required,
      },
      state: {
        required,
      },
      number: {
        required,
      },
      fantasy_name: {
        required,
      },
      address: {
        required,
      },
    },
  },
  head() {
    return {
      title: `Cadastro |  ${process.env.title}`,
    };
  },

  mounted() {
    console.log('teste no cadastro::', this.$nameTeste);
    console.log('teste no função::', this.$showName('Pedro Santos'));
  },

  methods: {
    async register(_response) {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        // SIMULATION OF A DATA FETCHING REQUEST

        this.formSend = true;
        console.log(this.formData);

        try {
          this.formSend = false;
          this.$v.$reset();

          console.log('executou o clic');
          // const returnData = await this.$axios.$post(
          //   process.env.api_url + 'companies',
          //   this.formData,
          // );
          // console.log('response :: ', response);
          // this.$axios.onError((error) => {
          //   if (error.response.status === 422) {
          //     console.log('erro aqui ::', error.response.status);
          //   }
          // });

          await this.$axios
            .post('companies', this.$data.formData)
            .then((_res) => {
              // this.$router.push('/cadastro-empresa-02');
              this.$refs['modal-center'].show();
            })
            .catch((_err) => {
              // this.toast('danger', 'Erro', _err);
            });

          // console.log('returnDAta ', returnData);

          // const returnData = await this.$fetch('/companies', {
          //   method: 'POST',
          //   body: this.formData,
          // });

          // if (returnData) {
          //   this.$router.push('/cadastro-empresa-02');
          // }
        } catch (error) {
          console.log(error);
          // this.toast('danger', 'Erro', error);
        }

        // this.promise()
        //   .then(() => {
        //     this.formSend = false;
        //     this.$v.$reset();

        //     this.$fetch('/companies', {
        //       method: 'POST',
        //       body: this.formData,
        //     });
        //     // this.formData = {
        //     //   required: null,
        //     //   name: null,
        //     //   last_name: null,
        //     //   cnpj: null,
        //     //   ddd: null,
        //     //   phone: null,
        //     //   email: null,
        //     //   password: null,
        //     //   confirm_password: null,
        //     //   cep: null,
        //     //   district: null,
        //     //   city: null,
        //     //   state: null,
        //     //   number: null,
        //     //   complement: null,
        //     //   fantasy_name: null,
        //     //   address: null,
        //     // };
        //     // this.$router.push('/cadastro-empresa-02');
        //   })
        //   .catch((error) => {
        //     this.formSend = false;

        //     console.log(error);

        //     this.toast('danger', 'Erro', error);
        //   });
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
