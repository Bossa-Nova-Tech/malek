<template>
  <b-modal id="criar" ref="criar" size="lg" hide-header hide-footer @shown="modalShown">
    <div class="mx-4">
      <div class="d-flex justify-content-between">
        <h1 class="mt-4 mb-5">Criar Ordem de Serviço</h1>
        <img src="~/assets/img/icones/X-icon.svg" class="mb-5 mt-3" role="button" @click="$bvModal.hide('criar')" />
      </div>
      <b-form-group class="mb-4">
        <label for="service">Serviço <span class="requerido">*</span></label>
        <b-form-select v-model="service_selected" name="service" :class="{ 'is-invalid': $v.service_selected.$error }">
          <b-form-select-option :value="null" desabled>Selecione</b-form-select-option>
          <b-form-select-option v-for="service in services" :key="service.id" :value="service.id">
            {{ service.name }}
          </b-form-select-option>
        </b-form-select>

        <b-form-invalid-feedback>
          Selecione uma opção.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group>
        <label for="customer">Cliente <span class="requerido">*</span></label>
        <b-form-select v-model="customer_selected" name="customer"
          :class="{ 'is-invalid': $v.customer_selected.$error }">
          <b-form-select-option :value="null" desabled>Selecione</b-form-select-option>
          <b-form-select-option v-for="customer in customersData" :key="customer.id" :value="customer.id">
            {{ customer.name }}
          </b-form-select-option>
        </b-form-select>

        <b-form-invalid-feedback>
          Selecione uma opção.
        </b-form-invalid-feedback>
      </b-form-group>
      <div class="d-flex pt-2 pb-2 align-items-center">
        <h5 class="p-0">Cadastrar cliente</h5>
        <b-img v-b-modal.criar-cliente src="~/assets/img/icones/criar-4.svg" role="button" class="pl-2" />
      </div>
      <AddOrdem />
      <div class="grid">
        <div class="mb-4">
          <label for="estimated_time">Tempo estimado para a execução da tarefa
            <span class="requerido">*</span></label>
          <b-input-group>
            <b-form-input id="estimated_time" v-model="formData.estimated_time" v-mask="['##:##:##']"
              placeholder="00h:00m00s"></b-form-input>
            <b-input-group-append>
              <b-form-timepicker v-model="formData.estimated_time" button-only right show-seconds locale="br"
                label-close-button="fechar" label-no-time-selected="selecione o tempo" aria-controls="estimated_time"
                :class="{ 'is-invalid': $v.formData.estimated_time.$error }"></b-form-timepicker>
            </b-input-group-append>
          </b-input-group>
          <b-form-invalid-feedback>
            Preencha o campo acima
          </b-form-invalid-feedback>
        </div>
        <b-form-group class="mb-4">
          <label for="end_date">Data prevista de conclusão <span class="requerido">*</span></label>
          <b-form-datepicker v-model="formData.end_date" name="end_date" :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }" locale="br" placeholder="00/00/2022" :class="{ 'is-invalid': $v.formData.end_date.$error }" />
          <b-form-invalid-feedback>
            Selecione uma opção.
          </b-form-invalid-feedback>
        </b-form-group>
      </div>

      <div class="d-flex align-items-center mb-3">
        <label for="file" class="text-center mb-0">Enviar Foto </label>
        <img id="info-foto" src="~/assets/img/icones/info.svg" alt="informações" class="ml-3" />
        <b-tooltip target="info-foto" placement="right" variant="primary">
          <span>Foto opcional</span>
        </b-tooltip>
      </div>

      <input @change="foto_selecionada" type="file" ref="arquivo" accept="image/*" class="d-none" />

      <ul class="list-unstyled">
        <li v-for="(foto, index) in fotos" :key="index" class="mb-2">
          <h6>Título da foto:</h6>
          <b-form-input v-model="foto.title" placeholder="Título da foto:" class="my-3" />
          <div class="d-flex align-items-start justify-content-between">
            <b-img :src="foto.image" width="80" height="80" class="mb-2 rounded"></b-img>
            <b-img @click="fotos.splice(index, 1)" size="sm" src="~/assets/img/icones/delete-icon.svg" variant="link"
              class="p-0" />
          </div>
          <h6>Descrição da foto:</h6>
          <b-form-input v-model="foto.note" placeholder="Digite a descrição:" class="my-3" />
        </li>
      </ul>
      <BorderButton class="mb-4" @click.native="addFoto">
        <label for="file" class="text-center">Selecionar foto</label>
      </BorderButton>
      <b-form-group class="mb-4">
        <label for="note">Descrição da Ordem de Serviço</label>
        <b-form-input v-model="formData.note" name="note" placeholder="Esta tarefa consiste em...">
        </b-form-input>
      </b-form-group>

      <section v-if="lat !== null" id="mapa">
        <label for="mapa">Localização do Cliente</label>
        <l-map ref="myMap" name="mapa" style="height: 300px; border-radius: 8px" :zoom="zoom" :center="center"
          class="mb-4">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker :lat-lng="center" :draggable="true"></l-marker>
          <l-control :position="'topright'" class="custom-control-watermark">
            AíServe &copy; Malek 2022
          </l-control>
          <l-circle :lat-lng="circle.center" :radius="circle.radius" />
        </l-map>
      </section>
      <div class="w-100 mb-4 col-12 px-0">
        <button :disable="formSend" @click="register">
          <b-spinner v-if="formSend" small type="grow" />
          Salvar
        </button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { LMap, LTileLayer, LControl, LCircle } from 'vue2-leaflet';
import Vue2Filters from 'vue2-filters';
import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { mask } from 'vue-the-mask';
import AddOrdem from '~/components/customers/AddOrdem.vue';
export default {
  name: 'Add',
  directives: { mask },
  components: { AddOrdem, LMap, LTileLayer, LControl, LCircle },
  filters: {
    truncate(data) {
      const reqdString = data.split('');
      const teste = data.split(' ');
      console.log(reqdString);
      return teste[0];
    },
  },
  mixins: [validationMixin, Vue2Filters.mixin],
  props: {
    customersData: {
      type: Array | Object,
      default: null,
    },
    watching2: {
      type: Number,
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
      fotos: [],
      format: 'DD-MM-YYYY',
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
        photo: [],
        name_customer: null,
        customer_id: null,
        template: null,
        service_id: null,
        services: this.service_selected,
      },
    };
  },
  validations: {
    formData: {
      end_date: { required },
      estimated_time: { required },
    },
    service_selected: { required },
    customer_selected: { required },
  },
  watch: {
    async watching2() {
      const { data } = await this.$axios.get('services');
      const service = data;
      this.services = service;
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
      if (this.customersData.id === this.customer_selected) {
        alert(this.customersData.name)
      }
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
  /* async mounted() {
    const { data } = await this.$axios.get('customers');
    const customer = data;
    console.log(customer);
    this.customers = customer;
  }, */
  methods: {
    modalShown() {
      setTimeout(() => {
        // mapObject is a property that is part of leaflet
        this.$refs.myMap.mapObject.invalidateSize();
      }, 100);
    },
    async register(_response) {
      this.$v.formData.$touch();
      if (!this.$v.formData.$invalid) {
        this.formSend = true;
        console.log(this.formData);
        try {
          this.formSend = false;
          this.formData.status = 'created';
          this.$v.formData.$reset();
          console.log('executou o clic');
          await this.$axios.post('tasks', this.$data.formData).then((_res) => {
            this.$refs.criar.hide();
            this.toast('success', 'Sucesso', 'Item adicionado com sucesso!');
            this.formData = {
              status: null,
              need_signature: false,
              estimated_time: null,
              end_date: null,
              note: null,
              name_customer: null,
              template: null,
              service_id: null,
            };
            /* this.$router.go(0); */
          });
          this.$nuxt.refresh().catch((_err) => { });
        } catch (error) {
          console.log(error);
        }
      }
    },
    excluiFoto() {
      if (this.formData.photo) {
        this.formData = {
          photo: null,
        };
      }
    },
    addFoto() {
      $(this.$refs.arquivo).trigger('click');
    },
    foto_selecionada() {
      const files = $(this.$refs.arquivo).prop('files');
      if (files.lenght < 1) {
        return false;
      }
      const foto = files[0];
      const leitor = new FileReader();
      leitor.onload = () => {
        this.fotos.push({
          image: leitor.result,
          title: foto.title,
          note: foto.note,
        });
        $(this.$refs.arquivo).val('');
      };
      leitor.readAsDataURL(foto);
      this.formData.photo = this.fotos;
    },
  },
};
</script>

<style lang="scss" scoped>
#map-wrap {
  height: 300px;
  border-radius: 20px;
}

h5 {
  font-size: 1.2rem;
}

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
