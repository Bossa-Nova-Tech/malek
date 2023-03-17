<template>
  <b-modal
    :id="'update-task-' + ordem_item.id"
    :ref="'update-task-' + ordem_item.id"
    size="lg"
    hide-header
    hide-footer
    class="form-modal"
  >
    <div class="mx-4">
      <div class="d-flex justify-content-between">
        <h1 class="mt-4 mb-5">Editar Ordem de Serviço</h1>

        <img
          src="~/assets/img/icones/X-icon.svg"
          class="mb-5 mt-3"
          role="button"
          alt="icone para fechar"
          @click="$bvModal.hide(`update-task-${ordem_item.id}`)"
        />
      </div>
      <b-form-group class="mb-4">
        <label for="service">Serviço <span class="requerido">*</span></label>
        <b-form-select
          v-model="service_selected"
          name="service"
          :class="{ 'is-invalid': $v.service_selected.$error }"
        >
          <b-form-select-option :value="null" desabled
            >Selecione</b-form-select-option
          >
          <b-form-select-option
            v-for="service in services"
            :key="service.id"
            :value="service.id"
          >
            {{ service.name }}
          </b-form-select-option>
        </b-form-select>

        <b-form-invalid-feedback>
          Selecione uma opção.
        </b-form-invalid-feedback>
      </b-form-group>
      <!-- b-form-group class="mb-4">
        <label for="services">Serviço <span class="requerido">*</span></label>
        <b-form-select
          v-model="formData.services"
          name="services"
          :options="optionsServices"
          :class="{ 'is-invalid': $v.formData.services.$error }"
        />
        <b-form-invalid-feedback>
          Selecione uma opção.
        </b-form-invalid-feedback>
      </b-form-group> -->
      <b-form-group>
        <label for="customer">Cliente <span class="requerido">*</span></label>
        <b-form-select
          v-model="customer_selected"
          name="customer"
          :class="{ 'is-invalid': $v.customer_selected.$error }"
        >
          <b-form-select-option :value="null" desabled
            >Selecione</b-form-select-option
          >
          <b-form-select-option
            v-for="customer in customersData"
            :key="customer.id"
            :value="customer.id"
          >
            {{ customer.name }}
          </b-form-select-option>
        </b-form-select>

        <b-form-invalid-feedback>
          Selecione uma opção.
        </b-form-invalid-feedback>
      </b-form-group>
      <div class="grid">
        <div class="mb-4">
          <label for="estimated_time"
            >Duração média da tarefa <span class="requerido">*</span></label
          >
          <b-input-group>
            <b-form-input
              id="estimated_time"
              v-model="formData.estimated_time"
              v-mask="['##:##:##']"
              placeholder="00h:00m00s"
            ></b-form-input>
            <b-input-group-append>
              <b-form-timepicker
                v-model="formData.estimated_time"
                button-only
                right
                show-seconds
                locale="br"
                label-close-button="fechar"
                label-no-time-selected="selecione o tempo"
                aria-controls="estimated_time"
                :class="{ 'is-invalid': $v.formData.estimated_time.$error }"
              ></b-form-timepicker>
            </b-input-group-append>
          </b-input-group>
          <b-form-invalid-feedback>
            Preencha o campo acima
          </b-form-invalid-feedback>
        </div>
        <b-form-group class="mb-4">
          <label for="end_date"
            >Data prevista de conclusão <span class="requerido">*</span></label
          >
          <!-- <b-input-group>
            <b-form-input
              v-model="formData.end_date"
              placeholder="00/00/2022"
            ></b-form-input>
            <b-input-group-append>
              <b-form-datepicker
                type="date"
                v-model="formData.end_date"
                button-only
                right
                locale="br"
                :date-format-options="{
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                }"
                aria-controls="end
                -date"
              ></b-form-datepicker>
            </b-input-group-append>
          </b-input-group> -->
          <b-form-datepicker
            v-model="formData.end_date"
            name="end_date"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            locale="br"
            placeholder="00/00/2022"
            :class="{ 'is-invalid': $v.formData.end_date.$error }"
          />
          <b-form-invalid-feedback>
            Selecione uma opção.
          </b-form-invalid-feedback>
        </b-form-group>
      </div>
      <BorderButton class="my-4">
        <b-form-file
          id="file"
          v-model="formData.photos"
          accept=".png, .jpg"
          class="d-flex"
          plain
          @change="onFileChange"
        />
        <label for="file" class="text-center">Enviar Foto</label>
      </BorderButton>
      <div class="campo-foto d-flex align-self center justify-content-center">
        <div
          v-if="formData.photos"
          class="d-flex flex-column justify-content-center align-items-center"
        >
          <b-img
            src="~/assets/img/icones/delete-icon.svg"
            role="button"
            class="ml-5 pl-5 pb-2"
            @click="excluiFoto"
          />

          <img :src="formData.photos" alt="foto" width="100" />
        </div>
      </div>
      <b-form-group class="mb-4">
        <label for="note">Descrição da Ordem de Serviço</label>
        <b-form-input
          v-model="formData.note"
          name="note"
          placeholder="Esta tarefa consiste em..."
        >
        </b-form-input>
      </b-form-group>
      <section v-if="lat !== null" id="mapa">
        <label for="mapa">Localização do Cliente</label>
        <l-map
          ref="myMap"
          name="mapa"
          style="height: 300px; border-radius: 8px"
          :zoom="zoom"
          :center="center"
          class="mb-4"
        >
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker :lat-lng="center" :draggable="true"></l-marker>
          <l-control :position="'topright'" class="custom-control-watermark">
            AíServe &copy; Malek 2022
          </l-control>
          <l-circle :lat-lng="circle.center" :radius="circle.radius" />
        </l-map>
      </section>
      <div class="w-100 mb-4 col-12 px-0">
        <button :disable="formSend" @click="edit">
          <b-spinner v-if="formSend" small type="grow" />
          Salvar
        </button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { mask } from 'vue-the-mask';
export default {
  name: 'Edit',
  directives: { mask },
  mixins: [validationMixin],
  props: {
    ordem_item: {
      type: Object,
      default: null,
    },
    watching: {
      type: Number,
      default: null,
    },
    clientes: {
      type: Number,
      default: null,
    },
    servicos: {
      type: Number,
      default: null,
    },
    customersData: {
      type: Object | Array,
      default: null,
    },
  },

  data() {
    return {
      service_selected: null,
      customer_selected: null,
      circle: {
        center: [1, 2],
        radius: 4500,
      },
      zoom: 18,
      center: [1, 2],
      lat: null,
      long: null,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      files: null,
      reader: null,
      vm: null,
      format: 'DD-MM-YYYY',
      customers: [],
      services: [],
      formSend: false,
      ordem: null,
      coordinates: [],
      estimated_time: null,
      formData: {
        status: null,
        estimated_time: null,
        end_date: null,
        note: null,
        photos: null,
        name_customer: null,
        customer_id: null,
        template: null,
        service_id: this.service_selected,
        services: this.service_selected,
      },
    };
  },

  validations: {
    formData: {
      end_date: { required },
      estimated_time: { required },
    },
    customer_selected: { required },

    service_selected: { required },
  },
  watch: {
    watching() {
      this.setDataFormWithTask();
    },
    async service_selected() {
      const { data } = await this.$axios.get(
        `services/${this.service_selected}`,
      );
      this.formData.services = data.name;
      this.formData.service_id = data.id;
      this.formData.estimated_time = data.time_of_execution;
    },
    async customer_selected() {
      const { data } = await this.$axios.get(
        `customers/${this.customer_selected}`,
      );
      this.formData.name_customer = data.name;
      this.formData.customer_id = this.customer_selected;
      console.log(data);
      const mapa = await this.$axios.get(
        `customers/get-coordinates/${this.customer_selected}`,
      );
      this.coordinates = mapa.data;
      this.lat = this.coordinates.latitude;
      this.long = this.coordinates.longitude;
      this.center = [this.lat, this.long];
      this.circle.center = this.center;
    },
  },

  methods: {
    setDataFormWithTask() {
      this.formData.status = this.ordem_item.status;
      this.formData.estimated_time = this.ordem_item.estimated_time;
      this.formData.end_date = this.ordem_item.end_date;
      this.formData.note = this.ordem_item.note;
      this.formData.photo = this.ordem_item.photo;
      this.formData.name_customer = this.ordem_item.name_customer;
      this.formData.template = this.ordem_item.template;
      this.formData.services = this.ordem_item.services;
    },
    async edit(_response) {
      const ordem = await this.$parent.ordem_selecionada;
      console.log(ordem);
      this.$v.formData.$touch();
      if (!this.$v.formData.$invalid) {
        this.formSend = true;
        console.log(this.formData);
        this.$v.$reset();
        try {
          this.formSend = false;
          this.$v.$reset();
          console.log('executou o clic');

          await this.$axios
            .put(`tasks/${ordem.id}`, this.$data.formData)
            .then((_res) => {
              console.log('sucesso');
              this.$root.$emit(
                'bv::hide::modal',
                `update-task-${this.ordem_item.id}`,
              );

              this.toast(
                'success',
                'Sucesso',
                'Ordem de Serviço editada com sucesso!',
              );
              this.$nuxt.refresh();
            })
            .catch((_err) => {});
        } catch (error) {}
      }
    },
    excluiFoto() {
      if (this.formData.photo) {
        this.formData = {
          photo: null,
        };
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
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
  },
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.requerido {
  color: var(--red-50);
}

label {
  color: var(--gray-40);
  font-size: 0.75rem;
  font-weight: 500;
}

.custom-select {
  color: #6c757d !important;
}

@media screen and (max-width: 991px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 0rem;
  }
}
</style>
