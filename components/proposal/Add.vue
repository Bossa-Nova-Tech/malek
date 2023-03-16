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
        <h1 class="mt-4 mb-5">Criar Proposta</h1>
        <img
          src="~/assets/img/icones/X-icon.svg"
          class="mb-5 mt-3 x-icon"
          @click="$bvModal.hide('criar-proposta')"
        />
      </div>
      <b-form-group class="mb-4">
        <label for="customer">Cliente </label><span class="requerido">*</span>
        <b-form-select
          v-model="formData.name_customer"
          name="customer"
          :class="{ 'is-invalid': $v.formData.name_customer.$error }"
        >
          <b-form-select-option :value="null">Selecione</b-form-select-option>
          <b-form-select-option
            v-for="customer in customers"
            :key="customer.id"
            :value="customer.name"
            >{{ customer.name }}
          </b-form-select-option>
        </b-form-select>

        <b-form-invalid-feedback>
          Selecione uma opção.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group class="mb-4">
        <label for="budget_id">ID do orçamento </label
        ><span class="requerido">*</span>
        <b-form-input
          v-model="formData.budget_id"
          v-mask="['#####']"
          name="budget_id"
          placeholder="00001"
          :class="{ 'is-invalid': $v.formData.budget_id.$error }"
        />
        <b-form-invalid-feedback> Preencha o id. </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group class="mb-4">
        <div class="d-flex align-items-center">
          <label class="mb-0 pb-0 pr-3" for="recurrent"
            >Contrato de recorrencia?<span class="requerido">*</span></label
          >
          <b-img
            v-b-tooltip.hover.top="'Referente a casos de recorrência mensal.'"
            src="~/assets/img/icones/info.svg"
          />
        </div>
        <b-radio-group
          id="recurrent"
          v-model="formData.is_recurrent"
          name="recurrent"
          :options="options_contract"
          :class="{ 'is-invalid': $v.formData.is_recurrent.$error }"
        />
        <b-form-invalid-feedback> Selecione uma opção </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group class="mb-4">
        <label for="situation">Situação da negociação</label>
        <b-form-select
          v-model="formData.situation"
          :options="options_situation_of_negociation"
          :class="{ 'is-invalid': $v.formData.situation.$error }"
        >
        </b-form-select>
        <b-form-invalid-feedback> Selecione uma opção </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group class="mb-4">
        <label for="introduction">Introdução</label>
        <b-form-textarea
          id="introduction"
          v-model="formData.introduction"
          name="introduction"
          placeholder="Campo para um breve descritivo da empresa e dos produtos e serviços que o usuário está vendendo."
          rows="3"
        />
      </b-form-group>
      <b-form-group class="mb-4">
        <label for="data-orcamento">Data de orçamento</label>
        <b-form-datepicker
          v-model="formData.date_of_budget"
          name="data-orcamento"
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }"
          locale="pt-br"
          placeholder="00/00/2022"
          label-help="Selecione a data"
        />
      </b-form-group>
      <b-form-group class="mb-4">
        <label for="validade-orcamento">Validade do orçamento</label>
        <b-form-datepicker
          v-model="formData.budget_validity"
          name="validade-orcamento"
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }"
          locale="pt-br"
          placeholder="00/00/2022"
          label-help="Selecione a data de vencimento"
        />
      </b-form-group>
      <b-form-group class="mb-4">
        <label for="previsao-entrega">Previsão de entrega</label>
        <b-form-datepicker
          v-model="formData.estimated_delivery_time"
          name="previsao-entrega"
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }"
          locale="pt-br"
          placeholder="00/00/2022"
          label-help="Selecione a data de previsão de entrega"
        />
      </b-form-group>
      <b-card
        v-for="service in formData.services"
        :key="service.id"
        class="separador mb-3"
      >
        <b-form-group class="mb-4">
          <label for="service">Serviço <span class="requerido">*</span></label>
          <b-form-select v-model="service_selected" name="service">
            <b-form-select-option :value="null">Selecione</b-form-select-option>
            <b-form-select-option
              v-for="(service, index) in services"
              :key="index"
              :value="service.id"
            >
              {{ service.name }}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        <b-form-group>
          <label for="price">Preço</label>
          <b-form-input v-model="service.price" name="price" />
        </b-form-group>
      </b-card>
      <b-button variant="primary" @click="adicionarServico"
        >Adicionar Serviço</b-button
      >
      <div class="d-flex pt-2 pb-2 align-items-center">
        <h5 class="p-0">Cadastrar serviço</h5>
        <b-img
          v-b-modal.criar
          src="~/assets/img/icones/criar-4.svg"
          role="button"
          class="pl-2"
        />
      </div>
      <AddService />
      <b-form-group class="mb-4">
        <label for="caracteristicas-produto">Características do produto</label>
        <b-form-textarea
          id="caracteristicas-produto"
          v-model="formData.products_features"
          name="caracteristicas-produto"
          placeholder="O produto/serviço x ..."
          rows="3"
        />
      </b-form-group>
      <b-form-group class="mb-4">
        <label for="observacoes-pagamento">Observações de pagamento</label>
        <b-form-textarea
          id="observacoes-pagamento"
          v-model="formData.payment_notes"
          name="observacoes-pagamento"
          placeholder="Descrição do pagamento"
          rows="3"
        />
      </b-form-group>
      <b-form-group class="mb-4">
        <label for="observacoes-pagamento">Informações complementares</label>
        <b-form-textarea
          id="observacoes-pagamento"
          v-model="formData.additional_details"
          name="observacoes-pagamento"
          placeholder="Informações relevantes para o cliente"
          rows="3"
        />
      </b-form-group>
      <b-form-group class="mb-4">
        <label for="service"
          >Responsável pelo orçamento: <span class="requerido">*</span></label
        >
        <b-form-select
          v-model="formData.user_selected"
          name="service"
          :class="{ 'is-invalid': $v.formData.user_selected.$error }"
        >
          <b-form-select-option :value="null">Selecione</b-form-select-option>
          <b-form-select-option
            v-for="(user, index) in users"
            :key="index"
            :value="user.id"
          >
            {{ user.name }}
            <b-form-invalid-feedback>
              Selecione o responsável pelo orçamento.
            </b-form-invalid-feedback>
          </b-form-select-option>
        </b-form-select>
      </b-form-group>
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
import AddService from '~/components/services/Add.vue';

export default {
  name: 'Add',
  directives: { mask },
  components: { AddService },
  mixins: [validationMixin],

  data: () => {
    return {
      users: [],
      customers: [],
      services: [],
      file: null,
      files: null,
      reader: null,
      vm: null,
      formSend: false,
      service_selected: null,
      formData: {
        user_selected: null,
        is_recurrent: '',
        name_customer: null,
        budget_id: '',
        situation: '',
        introduction: '',
        budget_validity: '',
        estimated_delivery_time: '',
        products_features: '',
        payment_notes: '',
        additional_details: '',
        budget_name: null,
        phone: null,
        ddd: null,
        email: null,
        photo: null,
        details: null,
        import: null,
        services: [
          {
            name: '',
            price: '',
          },
        ],
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
      options_situation_of_negociation: [
        {
          value: '',
          text: 'Selecione',
        },
        {
          value: 'budget',
          text: 'Em orçamento',
        },
        {
          value: 'accepted',
          text: 'Aceito',
        },
        {
          value: 'sale',
          text: 'Venda',
        },
        {
          value: 'refused',
          text: 'Recusado',
        },
      ],
      options_contract: [
        {
          value: true,
          text: 'Sim',
        },
        {
          value: false,
          text: 'Não',
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
      budget_id: {
        required,
      },
      situation: {
        required,
      },
      budget_name: {
        required,
      },
      cpf: {
        required,
        minLength: minLength(11),
      },
      user_selected: {
        required,
      },
      is_recurrent: {
        required,
      },
    },
  },
  async mounted() {
    const { data } = await this.$axios.get('customers');
    const customer = data;
    this.customers = customer;
    const servicos = await this.$axios.get('services');
    const servicesData = servicos.data;
    this.services = servicesData.data;
    const users = await this.$axios.get('users');
    const usersData = users.data;
    this.users = usersData.data;
  },
  methods: {
    adicionarServico(index) {
      this.formData.services.push({
        name: null,
        price: null,
      });
    },
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
              this.toast('success', 'Sucesso', 'Proposta adicionada com sucesso!');
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
.separador {
  padding: 0.5rem;
  border: 1px solid #ff5a00;
  border-radius: 8px;
  box-shadow: 0px 4px 4px #ff59002f;
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
