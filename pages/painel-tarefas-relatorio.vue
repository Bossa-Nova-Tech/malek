<template>
  <div class="d-flex flex-column">
    <TheHeader> Ordem de Serviço </TheHeader>
    <main class="d-flex caixa mx-auto mb-5">
      <b-tabs pills class="mx-auto caixa" align="center">
        <!-- início da tab HOJE -->
        <b-tab title="Hoje" active>
          <section
            v-for="(ordem, index) in tasksData"
            :key="ordem.id"
            class="mt-3"
          >
            <div class="card-servico mb-4">
              <div class="d-flex justify-content-between pb-2">
                <h2 class="manutencao primary-80">
                  #{{ ordem.id }}
                  {{ ordem.services }}
                </h2>
                <p class="local gray-40">{{ ordem.name_customer }}</p>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  <b-img :src="photo_perfil" alt="foto de perfil" />
                  <span class="pl-3">{{ ordem.name }}</span>
                </div>
                <div>
                  <!-- <span class="porcentagem primary-80">
                    {{ ordem.performance }}</span
                  > -->
                  <span class="tempo gray-40">{{ ordem.estimated_time }} </span>
                </div>
              </div>
              <!-- modal-editar -->
              <b-modal
                v-if="formEditing === index"
                id="modal-1"
                hide-footer
                hide-header
              >
                <img
                  src="~/assets/img/icones/seta-voltar-azul.svg"
                  class="my-4"
                />
                <h1 class="mb-4">Editar Ordem de Serviço</h1>

                <div>
                  <b-form-group
                    label="Serviço"
                    label-for="formDataEdited.template"
                    class="mb-4"
                  >
                    <b-form-select
                      :id="`form-edit-${index}`"
                      v-model="formDataEdited.template"
                      :options="optionsTemplate"
                      :class="{ 'is-invalid': $v.formData.template.$error }"
                    />
                    <b-form-invalid-feedback>
                      Selecione uma opção.
                    </b-form-invalid-feedback>
                  </b-form-group>

                  <b-form-group
                    label="Categoria"
                    label-for="formDataEdited.services"
                    class="mb-4"
                  >
                    <b-form-select
                      :id="`form-edit-${index}`"
                      v-model="formDataEdited.services"
                      :options="optionsServices"
                      :class="{ 'is-invalid': $v.formData.services.$error }"
                    />
                    <b-form-invalid-feedback>
                      Selecione uma opção.
                    </b-form-invalid-feedback>
                  </b-form-group>

                  <b-form-group
                    label="Cliente"
                    label-for="formDataEdited.name_customer"
                    class="mb-4"
                  >
                    <b-form-select
                      :id="`form-edit-${index}`"
                      v-model="formDataEdited.name_customer"
                      :options="optionsNameCustomer"
                      :class="{
                        'is-invalid': $v.formData.name_customer.$error,
                      }"
                    />
                    <b-form-invalid-feedback>
                      Selecione uma opção.
                    </b-form-invalid-feedback>
                  </b-form-group>

                  <BorderButton class="my-4">
                    <b-form-file
                      id="file"
                      v-model="formDataEdited.photo"
                      plain
                      multiple
                    ></b-form-file>
                    <label for="file" class="label text-center"
                      >Enviar Fotos</label
                    >
                  </BorderButton>

                  <b-form-group
                    label="Duração média da tarefa"
                    label-for="formData.estimated_time"
                    class="mb-4"
                  >
                    <b-form-select
                      :id="`form-edit-${index}`"
                      v-model="formDataEdited.estimated_time"
                      :options="optionsEstimatedTime"
                    >
                    </b-form-select>
                  </b-form-group>

                  <b-form-group
                    label="Data prevista de conclusão"
                    label-for="formDataEdited.end_date"
                    class="mb-4"
                  >
                    <b-form-datepicker
                      :id="`form-edit-${index}`"
                      v-model="formDataEdited.end_date"
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      }"
                      direction="rtl"
                      locale="pt"
                      placeholder="00/00/2022"
                      :class="{ 'is-invalid': $v.formData.end_date.$error }"
                    />
                    <b-form-invalid-feedback>
                      Selecione uma opção.
                    </b-form-invalid-feedback>
                  </b-form-group>

                  <b-form-group
                    label="Observação"
                    label-for="formDataEdited.note"
                    class="mb-4"
                  >
                    <b-form-input
                      :id="`form-edit-${index}`"
                      v-model="formDataEdited.note"
                      placeholder="Esta tarefa consiste em..."
                    >
                    </b-form-input>
                  </b-form-group>

                  <button @click="save(index)">salvar</button>
                </div>
              </b-modal>

              <b-button
                v-b-modal.modal-1
                size="sm"
                variant="primary"
                class="mt-3"
                @click="setToEditing(index)"
              >
                Editar</b-button
              >

              <div>
                <b-modal
                  id="modal-2"
                  ref="modal2"
                  hide-header
                  footer-class="border-0 d-flex flex-column align-items-center justify-content-center"
                >
                  <p class="my-4">
                    Tem certeza de que deseja excluir este registro?
                  </p>
                  <template #modal-footer>
                    <b-button variant="danger" @click="remove(ordem.id, ordem)"
                      >Sim</b-button
                    >
                    <b-button @click="hideModal2(index)">Não</b-button>
                  </template>
                </b-modal>
                <b-button
                  size="sm"
                  variant="danger"
                  class="mt-3"
                  @click="showModal2(index)"
                >
                  Excluir</b-button
                >
              </div>
            </div>
          </section>

          <div
            class="footer caixa d-flex justify-content-center align-items-center mt-2"
          >
            <b-button
              class="d-flex justify-content-center align-items-center create m-0 border-0"
              @click="showModal = true"
              >Criar Ordem de Serviço</b-button
            >
            <!-- tela modal-criar-ordemservico -->
            <b-modal
              id="modal"
              ref="modal"
              v-model="showModal"
              header-class="border-0 d-flex flex-column"
              footer-class="border-0 d-flex flex-column align-items-center justify-content-center"
            >
              <template #modal-header>
                <b-img
                  src="~/assets/img/icones/seta-voltar-azul.svg"
                  class="mt-5 ml-3 mb-4"
                ></b-img>
                <h1 class="mt-2 ml-3">Criar Ordem de Serviço</h1>
              </template>
              <template #default>
                <b-form-group label="Serviço" label-for="formData.template">
                  <b-form-select
                    v-model="formData.template"
                    :options="optionsTemplate"
                    class="mb-4"
                    :class="{ 'is-invalid': $v.formData.template.$error }"
                  />
                  <b-form-invalid-feedback>
                    Selecione uma opção.
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Categoria" label-for="formData.services">
                  <b-form-select
                    v-model="formData.services"
                    :options="optionsServices"
                    class="mb-4"
                    :class="{ 'is-invalid': $v.formData.services.$error }"
                  />
                  <b-form-invalid-feedback>
                    Selecione uma opção.
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                  label="Cliente"
                  label-for="formData.name_customer"
                >
                  <b-form-select
                    v-model="formData.name_customer"
                    :options="optionsNameCustomer"
                    class="mb-4"
                    :class="{ 'is-invalid': $v.formData.name_customer.$error }"
                  />
                  <b-form-invalid-feedback>
                    Selecione uma opção.
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                  label="Duração média da tarefa"
                  label-for="formData.estimated_time"
                >
                  <b-form-select
                    v-model="formData.estimated_time"
                    :options="optionsEstimatedTime"
                    class="mb-4"
                  >
                  </b-form-select>
                </b-form-group>
                <b-form-group
                  label="Data prevista de conclusão"
                  label-for="formData.end_date"
                  class="mb-4"
                >
                  <b-form-datepicker
                    v-model="formData.end_date"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                    }"
                    direction="rtl"
                    locale="pt"
                    placeholder="00/00/2022"
                    class="mb-4"
                    :class="{ 'is-invalid': $v.formData.end_date.$error }"
                  />
                  <b-form-invalid-feedback>
                    Selecione uma opção.
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Observação" label-for="formData.note">
                  <b-form-input
                    v-model="formData.note"
                    placeholder="Esta tarefa consiste em..."
                  >
                  </b-form-input>
                </b-form-group>
              </template>

              <template #modal-footer>
                <b-form-checkbox v-model="formData.need_signature"
                  >É necessário coletar assinatura durante
                  visita.</b-form-checkbox
                >
                <div class="w-100 row justify-content-center mb-4 mx-1">
                  <button class="w-100" :disabled="formSend" @click="register">
                    <b-spinner v-if="formSend" small type="grow" />
                    Salvar
                  </button>
                </div>
              </template>
            </b-modal>
            <!-- final tela modal-criar-ordemservico -->
          </div>
        </b-tab>
        <b-tab>
          <!-- início da tab Relatório -->
          <template #title> Relatório </template>
          <b-card class="box-shadow border-0 mt-2 mb-1">
            <h2 class="mb-4">Em andamento</h2>
            <Flicking :options="{ align: 'prev', bound: true }">
              <div class="d-flex">
                <div v-for="(ordem, index) in ordens" :key="index" class="mr-4">
                  <p>{{ ordem.name }}</p>
                  <p class="lugar">{{ ordem.name_customer }}</p>
                  <!-- <span class="font-weight-bolder">{{
                    ordem.performance
                  }}</span> -->
                  <span class="horas">{{ ordem.estimated_time }}</span>
                </div>
              </div>
            </Flicking>
          </b-card>
          <b-card class="box-shadow mb-1 border-0">
            <h2 class="mb-3">Ordens de serviço</h2>
            <Graphic />
          </b-card>

          <b-card class="box-shadow border-0">
            <h2 class="mb-3">Desempenho por colaborador</h2>
            <b-form-select v-model="formData.name" :options="optionsNames">
            </b-form-select>
          </b-card>
        </b-tab>
      </b-tabs>
    </main>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { mask } from 'vue-the-mask';
import { Flicking } from '@egjs/vue-flicking';
import TheHeader from '~/components/layout/TheHeader.vue';
import Graphic from '~/components/Graphic.vue';
// import BorderButton from '~/components/BorderButton.vue';
export default {
  // components: { Flicking, TheHeader, Graphic, BorderButton },
  components: { Flicking, TheHeader, Graphic },
  directives: { mask },
  mixins: [validationMixin],

  async asyncData({ $axios }) {
    const tasks = await $axios.get('tasks');
    const tasksData = tasks.data;
    console.log('tasks :: ', tasks.data);
    return { tasksData };
  },

  data: () => {
    return {
      saved: false,
      formEditing: null,
      ordens: [],
      formSend: false,
      showModal: false,
      editing: false,
      formData: {
        need_signature: false,
        photo: [],
        estimated_time: null,
        end_date: null,
        note: null,
        name_customer: 'HAVAN Unidade 02',
        template: null,
        services: null,
        // name: 'José da Silveira',
        /* performance: null, */
        time_of_execution: '02h30',
      },
      formDataEdited: {
        need_signature: false,
        photo: [],
        estimated_time: null,
        end_date: null,
        note: null,
        name_customer: null,
        template: null,
        services: null,
        time_of_execution: null,
      },
      photo_perfil: [require('~/assets/img/icones/icone-perfil.svg')],
      optionsTemplate: [
        {
          value: null,
          text: 'Selecione',
        },
        {
          value: 'Manutenção',
          text: 'Manutenção',
        },
        {
          value: 'Instalação',
          text: 'Instalação',
        },
      ],
      optionsServices: [
        {
          value: null,
          text: 'Selecione',
        },
        {
          value: 'Manutenção',
          text: 'Manutenção',
        },
        {
          value: 'Instalação',
          text: 'Instalação',
        },
      ],
      optionsNameCustomer: [
        {
          value: null,
          text: 'Selecione',
        },
        {
          value: 'HAVAN Unidade 02',
          text: 'HAVAN Unidade 02',
        },
        {
          value: 'HAVAN Unidade 03',
          text: 'HAVAN Unidade 03',
        },
      ],
      optionsNames: [
        {
          value: null,
          text: 'Selecione',
        },
        {
          value: 'José da Silveira',
          text: 'José da Silveira',
        },
        {
          value: 'Pedro Santos',
          text: 'Pedro Santos',
        },
      ],
      optionsEstimatedTime: [
        {
          value: null,
          text: 'Selecione',
        },
        {
          value: '02horas e 30min',
          text: '02horas e 30min',
        },
        {
          value: '03horas e 30min',
          text: '03horas e 30min',
        },
      ],
    };
  },
  head() {
    return {
      title: `Ordem de Serviços |  ${process.env.title}`,
    };
  },

  validations: {
    formData: {
      services: {
        required,
      },
      end_date: {
        required,
      },
      name_customer: {
        required,
      },
      /* name: {
        required,
      }, */
      template: {
        required,
      },
    },
  },

  methods: {
    showModal2(index) {
      this.$root.$emit('bv::show::modal', 'modal-2', index);
    },
    hideModal2(index) {
      this.$root.$emit('bv::hide::modal', 'modal-2', index);
    },
    async register(_response) {
      this.$v.formData.$touch();

      if (!this.$v.formData.$invalid) {
        this.formSend = true;
        this.ordens.push(this.formData);
        this.formDataEdited = this.formData;
        console.log(this.formData);
        this.$v.$reset();
        try {
          this.formSend = false;
          this.$v.$reset();

          console.log('executou o clic');
          await this.$axios
            .post('tasks', this.$data.formData)
            .then((_res) => {
              this.$refs.modal.hide();
              this.toast('success', 'Sucesso', 'Item adicionado com sucesso!');
              this.$nuxt.refresh();
            })
            .catch((_err) => {});
        } catch (error) {
          console.log(error);
        }
      }
    },
    async remove(index, ordem) {
      // this.ordens.splice(index, 1);
      console.log('index :: ', index);
      console.log('ordem :: ', ordem);

      try {
        await this.$axios
          .delete('tasks/' + (index - 1))
          .then((_res) => {
            if (_res.data.result === 'success') {
              this.hideModal2(index);
              this.toast('success', 'Sucesso', 'Item excluído!');
              this.$nuxt.refresh();
            } else {
              this.toast(
                'danger',
                'Erro',
                'Problemas ao excluir. Entre em contato com o suporte',
              );
            }
          })
          .catch((_err) => {});
      } catch (error) {
        console.log(error);
      }
    },
    setToEditing(index) {
      this.formEditing = index;
      setTimeout(() => {
        document.getElementById(`form-edit-${index}`).focus();
      }, 1);
      if (this.formDataEdited === null) {
        this.formDataEdited = this.formData;
      }
    },
    save(index) {
      this.saved = true;
      if (this.saved === true) {
        this.formData = this.formDataEdited;
      }
      console.log(this.formData);
      this.formEditing = !index;
      this.$root.$emit('bv::hide::modal', 'modal-1', index);
      this.formData = {
        services: null,
        name_customer: null,
        template: null,
        end_date: null,
        time_of_execution: null,
        estimated_time: null,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  h2 {
    color: var(--primary-80);
  }
  p {
    font-size: 0.75rem;
    color: var(--gray-40);
  }
  p.lugar {
    font-weight: 600;
  }
  span.horas {
    font-size: 0.625rem;
  }
  span & .font-weight-bolder {
    font-size: 1.25rem;
    color: var(--primary-80);
  }
  .card-body {
    background: var(--gray-10);
  }
  .box-shadow {
    box-shadow: 0rem 0.25rem 0.25rem rgba(0, 71, 187, 0.06);
  }
  .create {
    background: var(--primary-50);
    height: 2.82rem;
  }

  .footer {
    box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.05);
    height: 8.222rem;
    background: var(--gray-10);
    padding: 1.5rem;
    position: fixed;
    bottom: 0;
  }

  .card-servico {
    padding: 1.25rem 1.5625rem;
    background-color: #ffffff;
    box-shadow: 0rem 0.25rem 0.25rem rgba(0, 71, 187, 0.06);
  }
  .manutencao {
    font-weight: 600;
    font-size: 1rem;
  }

  .local {
    font-weight: 600;
    font-size: 0.75rem;
  }
  .porcentagem {
    font-weight: 700;
    font-size: 1.25rem;
  }
  .tempo {
    font-weight: 500;
    font-size: 0.625rem;
  }
}
</style>
