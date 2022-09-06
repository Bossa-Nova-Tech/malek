<template>
  <b-container>
    <main class="mx-auto col col-lg-6 mt-5">
      <b-form>
        <h1 class="pb-3">Criar Orçamento</h1>

        <b-row>
          <b-col>
            <b-form-group class="mb-4">
              <label for="name"
                >Nome do distribuidor <span class="requerido">*</span></label
              >
              <b-form-input
                v-model="formData.name"
                name="name"
                type="text"
                placeholder="-"
                :class="{
                  'is-invalid': $v.formData.name.$error,
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
              <label for="phone"
                >Telefone <span class="requerido">*</span></label
              >
              <b-form-input
                v-model="formData.phone"
                v-mask="['(##) # ####-####']"
                name="phone"
                placeholder="(00) 9 9999-9999"
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
              <label for="email">E-mail</label>
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

        <!-- <div
          v-for="equipamento in equipamentos"
          :key="equipamento"
          class="separador mb-5"
        > -->
        <div class="separador mb-5">
          <b-row>
            <b-col cols="6">
              <b-form-group class="mb-4">
                <label for="equipment">Tipo equipamento </label>
                <b-form-input
                  v-model="formData.equipment"
                  name="equipment"
                  type="text"
                  placeholder="-"
                  :class="{
                    'is-invalid': $v.formData.equipment.$error,
                  }"
                />
                <b-form-invalid-feedback>
                  Preencha o campo acima
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col cols="6">
              <b-form-group class="mb-4">
                <label for="capacity">Capacidade</label>
                <b-form-input
                  v-model="formData.capacity"
                  name="capacity"
                  type="text"
                  placeholder="-"
                  :class="{
                    'is-invalid': $v.formData.capacity.$error,
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
                <label for="cycle">Ciclo</label>
                <b-form-input
                  v-model="formData.cycle"
                  name="cycle"
                  type="text"
                  placeholder="-"
                  :class="{
                    'is-invalid': $v.formData.cycle.$error,
                  }"
                />
                <b-form-invalid-feedback>
                  Preencha o campo acima
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col cols="6">
              <b-form-group class="mb-4">
                <label for="system">Tipo de sistema</label>
                <b-form-input
                  v-model="formData.system"
                  name="system"
                  type="text"
                  placeholder="-"
                  :class="{
                    'is-invalid': $v.formData.system.$error,
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
                <label for="voltage">Voltagem </label>
                <b-form-input
                  v-model="formData.voltage"
                  name="voltage"
                  type="text"
                  placeholder="-"
                  :class="{
                    'is-invalid': $v.formData.voltage.$error,
                  }"
                />
                <b-form-invalid-feedback>
                  Preencha o campo acima
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col cols="6">
              <b-form-group class="mb-4">
                <label for="payment">Pagamento</label>
                <b-form-input
                  v-model="formData.payment"
                  name="payment"
                  type="text"
                  placeholder="-"
                  :class="{
                    'is-invalid': $v.formData.voltage.$error,
                  }"
                />
                <b-form-invalid-feedback>
                  Preencha o campo acima
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
        </div>
      </b-form>

      <b-button class="mb-5" @click="addNew">adicionar +</b-button>

      <BorderButton v-b-modal.modal-1 class="mb-3">Termos de uso</BorderButton>
      <b-form-checkbox
        id="checkbox-1"
        v-model="userTerms"
        name="checkbox-1"
        class="mb-4"
      >
        Li e Concordo
      </b-form-checkbox>
      <b-modal id="modal-1" ref="modal-1" centered hide-header hide-footer>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut aperiam,
          optio sunt ullam pariatur excepturi odio? Facilis et odio ea, natus
          voluptate nulla quo tempora commodi quibusdam molestias soluta quas.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, esse
          nesciunt veniam saepe tempore corporis commodi quis sint sapiente,
          possimus consequatur aliquam dolor iure dignissimos, quae a quisquam
          tenetur optio.
        </p>
      </b-modal>

      <BorderButton v-b-modal.modal-2 class="mb-3"
        >Politica de privacidade</BorderButton
      >
      <b-form-checkbox
        id="checkbox-2"
        v-model="security"
        name="checkbox-2"
        class="mb-4"
      >
        Li e Concordo
      </b-form-checkbox>
      <b-modal id="modal-2" ref="modal-2" centered hide-header hide-footer>
        <p>
          2 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
          aperiam, optio sunt ullam pariatur excepturi odio? Facilis et odio ea,
          natus voluptate nulla quo tempora commodi quibusdam molestias soluta
          quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
          esse nesciunt veniam saepe tempore corporis commodi quis sint
          sapiente, possimus consequatur aliquam dolor iure dignissimos, quae a
          quisquam tenetur optio.
        </p>
      </b-modal>

      <div class="row justify-content-center">
        <button class="mb-4 mx-3" :disabled="formSend" @click="sendBudget">
          <b-spinner v-if="formSend" small type="grow" />
          Enviar
        </button>
      </div>
    </main>

    <b-modal
      id="modal-center"
      ref="modal-center"
      centered
      hide-header
      hide-footer
    >
      <h3 class="text-center">Orçamento enviado com sucesso com sucesso!</h3>
    </b-modal>
  </b-container>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { mask } from 'vue-the-mask';
import BorderButton from '~/components/BorderButton.vue';

export default {
  name: 'Orcamento',
  components: { BorderButton },
  directives: { mask },
  mixins: [validationMixin],

  data: () => {
    return {
      formSend: false,
      formData: {
        name: null,
        phone: null,
        email: null,
        equipment: null,
        capacity: null,
        cycle: null,
        system: null,
        voltage: null,
        payment: null,
        userTerms: null,
        security: null,
      },
    };
  },
  validations: {
    formData: {
      name: {
        required,
      },
      phone: {
        required,
        minLength: minLength(9),
      },
      email: {
        required,
        email,
      },
      equipment: {
        required,
      },
      capacity: {
        required,
      },
      cycle: {
        required,
      },
      system: {
        required,
      },
      voltage: {
        required,
      },
    },
  },
  head() {
    return {
      title: `Cadastro |  ${process.env.title}`,
    };
  },

  methods: {
    async sendBudget(_response) {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        // SIMULATION OF A DATA FETCHING REQUEST

        this.formSend = true;
        console.log(this.formData);

        try {
          this.formSend = false;
          this.$v.$reset();

          await this.$axios
            .post('budget', this.$data.formData)
            .then((_res) => {
              this.$refs['modal-center'].show();
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
label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--gray-40);
}

.requerido {
  color: var(--red-50);
}

.separador {
  padding: 10px;
  border: solid 1px #0047bb;
  border-radius: 6px;
}
</style>
