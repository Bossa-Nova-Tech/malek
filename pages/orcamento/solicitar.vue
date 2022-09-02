<template>
  <div class="background">
    <main class="mx-auto col col-lg-6 pt-4">
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

      <b-button class="mb-5">adicionar +</b-button>

      <BorderButton class="mb-3">Termos de uso</BorderButton>
      <b-form-checkbox
        id="checkbox-1"
        v-model="status"
        name="checkbox-1"
        class="mb-4"
      >
        Li e Concordo
      </b-form-checkbox>

      <BorderButton class="mb-3">Politica de privacidade</BorderButton>
      <b-form-checkbox
        id="checkbox-2"
        v-model="status"
        name="checkbox-2"
        class="mb-4"
      >
        Li e Concordo
      </b-form-checkbox>
      <div class="row justify-content-center">
        <button
          block
          class="w-100 mb-4 mx-3"
          :disabled="formSend"
          @click="enviar"
        >
          <b-spinner v-if="formSend" small type="grow" />
          Enviar
        </button>
      </div>
    </main>
  </div>
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
};
</script>

<style lang="scss" scoped>
.background {
  background: var(--primary-80);
}
main {
  width: min(30rem, 100%);
  background: var(--primary-10);
}
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

.requerido {
  color: var(--red-50);
}

.separador {
  padding: 10px;
  border: solid 1px #0047bb;
  border-radius: 6px;
}
</style>
