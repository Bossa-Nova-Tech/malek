<template>
  <main>
    <TheHeader> Clientes </TheHeader>

    <button v-b-modal.modal-lg class="my-5">Criar clientes</button>

    <b-modal id="modal-lg" size="lg" hide-footer hide-header>
      <div class="mx-4">
        <div class="d-flex justify-content-between">
          <h1 class="mt-4 mb-5">Criar / Editar Cliente</h1>
          <a href="">
            <img src="~/assets/img/icones/X-icon.svg" class="mb-5 mt-3" />
          </a>
        </div>

        <b-form-group class="mb-4">
          <label for="name">Nome <span class="requerido">*</span></label>
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

        <b-form-group class="mb-4">
          <label for="cnpj">CPF / CNPJ <span class="requerido">*</span></label>
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

        <b-row>
          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="phone"
                >Telefone <span class="requerido">*</span></label
              >
              <b-form-input
                v-model="formData.phone"
                v-mask="['(##) # ####-####']"
                name="phone"
                placeholder="(00) 0 0000-0000"
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

          <b-col cols="6">
            <b-form-group class="mb-4">
              <label for="email">E-mail <span class="requerido">*</span></label>
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
          </b-col>
        </b-row>

        <BorderButton class="my-4">
          <b-form-file
            id="file"
            v-model="formData.photo"
            plain
            multiple
          ></b-form-file>
          <label for="file" class="label cor-label">Enviar Fotos</label>
        </BorderButton>

        <b-form-group class="mb-4">
          <label for="address">Endereço <span class="requerido">*</span></label>
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
            <b-form-group class="mb-4">
              <label for="cep">CEP <span class="requerido">*</span></label>
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
            <b-form-group class="mb-4">
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
            <b-form-group class="mb-4">
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
            <b-form-group class="mb-4">
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
            <b-form-group class="mb-4">
              <label for="number"
                >Número <span class="requerido">*</span></label
              >
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
            <b-form-group class="mb-4">
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

        <button class="mt-4 mb-2" :disabled="formSend" @click="saveCustomer">
          <b-spinner v-if="formSend" small type="grow" />
          Salvar
        </button>
      </div>
    </b-modal>

    <div class="container">
      <section>
        <h1 class="p-4">Clientes</h1>
        <ul>
          <li>
            <p>UNIFEBE - Fundação Ed. de Brusque</p>
            <div>
              <a href=""
                ><img src="~/assets/img/icones/edit-icon.svg" alt=""
              /></a>
              <a href="">
                <img src="~/assets/img/icones/delete-icon.svg" alt=""
              /></a>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { mask } from 'vue-the-mask';
import TheHeader from '~/components/layout/TheHeader.vue';

export default {
  components: { TheHeader },

  directives: { mask },
  mixins: [validationMixin],

  data: () => {
    return {
      formSend: false,
      formData: {
        name: null,
        cnpj: null,
        phone: null,
        email: null,
        photo: null,
        address: null,
        cep: null,
        district: null,
        city: null,
        state: null,
        number: null,
        complement: null,
      },
    };
  },

  validations: {
    formData: {
      name: {
        required,
      },
      cnpj: {
        required,
        minLength: minLength(13),
      },
      phone: {
        required,
        minLength: minLength(9),
      },
      email: {
        required,
        email,
      },
      photo: {
        required,
      },
      address: {
        required,
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
    },
  },

  methods: {
    async saveCustomer(_response) {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.formSend = true;
        console.log(this.formData);

        try {
          this.formSend = false;
          this.$v.$reset();

          console.log('executou o clic');

          await this.$axios
            .post('customer', this.$data.formData)
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
  section {
    height: 500px;
    background: #fff;

    li {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border-bottom: 1px solid #000;
      a {
        margin-right: 20px;
      }
    }
  }
}
label {
  font-weight: 500;
  color: var(--gray-40);
}
.cor-label {
  font-weight: 600;
  font-size: 16px;
  color: var(--primary-60);
  margin: 0px;
}
.requerido {
  color: var(--red-50);
}
</style>
