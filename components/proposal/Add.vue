<template>
  <b-modal
    id="criar-proposta"
    ref="proposalModal"
    size="lg"
    hide-footer
    hide-header
  >
    <div class="mx-4">
      <div class="d-flex justify-content-between">
        <h1 class="mt-4 mb-5">Criar / Editar Proposta</h1>
        <img
          src="~/assets/img/icones/X-icon.svg"
          class="mb-5 mt-3 x-icon"
          @click="$bvModal.hide('criar-proposta')"
        />
      </div>
      <b-form-group class="mb-4">
        <label for="name_customer"
          >Cliente <span class="requerido">*</span></label
        >
        <!-- :options="`{$customers.name}`" -->
        <!-- <b-form-select
          v-model="formData.name_customer"
          name="name_customer"
          :options="customerOptions"
          :class="{
            'is-invalid': $v.formData.name_customer.$error,
          }"
        /> -->
        <b-form-input
          v-model="formData.name_customer"
          :class="{
            'is-invalid': $v.formData.name_customer.$error,
          }"
        />
        <b-form-invalid-feedback> Selecione uma opção </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group class="mb-4">
        <label for="customer_id">ID <span class="requerido">*</span></label>
        <b-form-input
          v-model.number="formData.customer_id"
          v-mask="['#####']"
          name="customer_id"
          placeholder="00001"
          :class="{ 'is-invalid': $v.formData.customer_id.$error }"
        />
        <b-form-invalid-feedback> Preencha o id. </b-form-invalid-feedback>
      </b-form-group>

      <b-row>
        <b-col cols="6">
          <b-form-group class="mb-4">
            <label for="budget_name"
              >Nome do orçamento <span class="requerido">*</span></label
            >
            <b-form-input
              v-model="formData.budget_name"
              name="budget_name"
              placeholder="Manutenção e limpeza mensal"
              :class="{
                'is-invalid': $v.formData.budget_name.$error,
              }"
            />
            <b-form-invalid-feedback>
              Preencha o campo acima.
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group class="mb-4">
            <label for="details"
              >Detalhes <span class="requerido">*</span></label
            >
            <b-form-input
              v-model="formData.details"
              name="details"
              placeholder="descrição"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <div>
        <h2>Serviços inclusos</h2>
        <b-form-checkbox-group
          v-model="formData.services"
          :options="servicesOptions"
          stacked
        ></b-form-checkbox-group>
        <p>Total R$ XXXX 03h30</p>
      </div>
      <div>
        <h2 class="mt-4">Cabeçalho</h2>
        <BorderButton class="my-4">
          <input
            id="file"
            type="file"
            accept=".png, .jpg"
            @change="onFileChange"
            plain
          />
          <label for="file" class="text-center">Enviar Foto</label>
        </BorderButton>
      </div>
      <div class="my-4">
        <h2>Minhas informações</h2>
        <b-form-checkbox v-model="formData.import"
          >Importar meus dados de cadastro</b-form-checkbox
        >
      </div>
      <b-form-group class="mb-4">
        <label for="name">Nome <span class="requerido">*</span></label>
        <b-form-input
          v-model="formData.name"
          name="name"
          placeholder="Nome Exemplo"
        />
        <b-form-invalid-feedback>
          Preencha o campo acima
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group class="mb-4">
        <label for="cpf">CPF <span class="requerido">*</span></label>
        <b-form-input
          v-model="formData.cpf"
          v-mask="['###.###.###-##']"
          name="cpf"
          placeholder="111.111.111-00"
        />
      </b-form-group>
      <b-form-invalid-feedback>
        Preencha o campo acima
      </b-form-invalid-feedback>

      <b-form-group class="mb-4">
        <label for="email">E-mail</label>
        <b-form-input
          v-model="formData.email"
          name="email"
          placeholder="email@email.com"
        />
        <b-form-invalid-feedback>
          Preencha o campo acima
        </b-form-invalid-feedback>
      </b-form-group>

      <b-row class="my-4">
        <b-col class="col-4">
          <b-input-group prepend="+55">
            <b-input
              v-model="formData.ddd"
              v-mask="['##']"
              placeholder="(00)"
            />
          </b-input-group>
        </b-col>
        <b-col class="col-8">
          <b-input
            v-model="formData.phone"
            v-mask="['# ####-####']"
            placeholder="0 0000-0000"
          />
        </b-col>
        <b-form-invalid-feedback>
          Preencha o campo acima
        </b-form-invalid-feedback>
      </b-row>

      <button class="mt-4 mb-2" :disabled="formSend" @click="saveProposal">
        <b-spinner v-if="formSend" small type="grow" />
        Salvar
      </button>
    </div>
  </b-modal>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { mask } from 'vue-the-mask';

export default {
  name: 'Add',
  directives: { mask },
  mixins: [validationMixin],

  data: () => {
    return {
      file: null,
      files: null,
      reader: null,
      vm: null,
      formSend: false,
      formData: {
        name_customer: null,
        customer_id: null,
        budget_name: null,
        phone: null,
        ddd: null,
        email: null,
        photo: null,
        details: null,
        import: null,
        services: [],
        cpf: null,
        name: null,
        proposal_expire_at: null,
      },
      customerOptions: [
        {
          value: null,
          text: 'Cliente 1',
        },
        {
          value: 'Cliente 2',
          text: 'Cliente 2',
        },
      ],
      servicesOptions: [
        {
          value: 'Manutenção',
          html: '<span style="color:#5e5e5e; font-size:14px;">Manutenção</span>',
        },
        {
          value: 'Limpeza',
          html: '<span style="color:#5e5e5e; font-size:14px;">Limpeza</span>',
        },
        {
          value: 'Chamado',
          html: '<span style="color:#5e5e5e; font-size:14px;">Chamado</span>',
        },
        {
          value: 'Instalação',
          html: '<span style="color:#5e5e5e; font-size:14px;">Instalação</span>',
        },
      ],
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
      ddd: {
        required,
        minLength: minLength(2),
      },
      email: {
        required,
        email,
      },
      name_customer: {
        required,
      },
      customer_id: {
        required,
      },
      budget_name: {
        required,
      },
    },
  },

  methods: {
    async saveProposal(_response) {
      this.$v.formData.$touch();

      if (!this.$v.formData.$invalid) {
        this.formSend = true;
        console.log(this.formData);

        try {
          this.formSend = false;
          this.$v.$reset();

          console.log('executou o clic');
          this.$refs.proposalModal.hide();

          await this.$axios
            .post('business-proposal', this.$data.formData)
            .then((_res) => {
              this.toast('success', 'Sucesso', 'Item adicionado com sucesso!');
              this.$nuxt.refresh();
            })
            .catch((_err) => {});
        } catch (error) {
          console.log(error);
        }
      }
    },
    onFileChange(e) {
      this.files = e.target.files || e.dataTransfer.files;
      if (!this.files.length) return;
      this.createImage(this.files[0]);
    },
    createImage(file) {
      this.reader = new FileReader();
      this.vm = this;

      this.reader.onload = (e) => {
        this.vm.formData.photo = e.target.result;
      };
      this.reader.readAsDataURL(file);
    },
  },
};
</script>

<style lang="scss" scoped>
.x-icon {
  cursor: pointer;
}
.requerido {
  color: var(--red-50);
}
h2 {
  font-weight: 700;
  font-size: 1rem;
  color: var(--primary-80);
  margin-bottom: 1rem;
}
.phone {
  display: flex !important;
}
</style>
