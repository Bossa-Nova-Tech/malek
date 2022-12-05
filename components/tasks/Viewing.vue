<template>
  <b-modal
    :id="'view-task-' + ordem_item.id"
    :ref="'view-task-' + ordem_item.id"
    size="lg"
    centered
    no-close-on-backdrop
    hide-header
    hide-footer
    @shown="modalShown"
  >
    <div class="view-modal mx-4">
      <div class="d-flex justify-content-between">
        <h1 class="mt-4">
          Ordem de Serviço <span> {{ ordem_item.id }}</span>
        </h1>
        <img
          src="~/assets/img/icones/X-icon.svg"
          class="mt-3"
          role="button"
          @click.once="$bvModal.hide(`view-task-${ordem_item.id}`)"
        />
      </div>
      <b-button
        size="sm"
        class="
          imprimir
          d-flex
          justify-content-center
          align-items-center
          my-4
          text-center
          font-weight-bolder
        "
        @click="imprimirOS"
      >
        Imprimir OS<b-img src="~/assets/img/icones/resume-icon.svg" />
      </b-button>
      <h3>Tipo de serviço</h3>
      <p>{{ ordem_item.services }}</p>
      <h3 class="mt-4">Cliente</h3>
      <p>{{ ordem_item.name_customer | truncate() }}</p>
      <h3 class="mt-4">Duração média da tarefa</h3>
      <p>{{ ordem_item.estimated_time }}</p>
      <h3 class="mt-4">Data prevista para conclusão</h3>
      <p>{{ $dayjs(ordem_item.end_date).format('DD/MM/YYYY') }}</p>
      <h3 class="mt-4">Localização do Cliente</h3>
      <client-only>
        <l-map
          ref="myMap"
          name="mapa"
          style="height: 300px; border-radius: 8px"
          :zoom="zoom"
          :center="center"
          class="mb-4"
        >
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker :lat-lng="center"></l-marker>
          <l-control :position="'topright'" class="custom-control-watermark">
            AíServe &copy; Malek 2022
          </l-control>
          <l-circle :lat-lng="circle.center" :radius="circle.radius" />
        </l-map>
      </client-only>
      <b-button variant="primary" @click="modalVisitas"
        >Agendar Visita</b-button
      >
      <Add
        :visitsData="visitsData"
        :users-name="usersName"
        :ordem_item="ordem_item"
      />
    </div>
  </b-modal>
</template>
<script>
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { LMap, LTileLayer, LControl, LCircle } from 'vue2-leaflet';
import Add from '~/components/tasks/visits/Add.vue';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
export default {
  name: 'Viewing',
  components: { LMap, LTileLayer, LControl, LCircle, Add },
  filters: {
    truncate(data) {
      const teste = data.split(' ');
      return teste[0];
    },
  },
  props: {
    ordem_item: {
      type: Object,
      default: null,
    },
    center: {
      type: Array,
      default: null,
    },
  },
  async asyncData({ $axios }) {
    const visits = await $axios.get('tasks-list/visit');
    const visitsData = visits.data;
    const userVisits = visitsData.user;
    return { visitsData, userVisits };
  },
  data() {
    return {
      circle: {
        center: [1, 2],
        radius: 300,
      },
      center: [1, 2],
      zoom: 18,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      date_of_visit: null,
      usersName: false,
    };
  },
  watch: {
    center() {
      this.circle.center = this.center;
    },
  },

  methods: {
    modalShown() {
      setTimeout(() => {
        // mapObject is a property that is part of leaflet
        this.$refs.myMap.mapObject.invalidateSize();
      }, 100);
    },
    modalVisitas() {
      this.usersName = true;
      this.$bvModal.show('visitas');
    },
    async imprimirOS() {
      await this.$axios.get(`order-service/pdf/${this.ordem_item.id}`);
      const link =
        'https://api-malek-staging.sddg.com.br/api/v1/order-service/pdf/';
      console.log(link);
      window.open(`${link}${this.ordem_item.id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.view-modal {
  h1 {
    font-size: 1.4rem;
    span {
      color: var(--primary-80);
    }
  }
  .imprimir {
    border: 1px solid var(--primary-80);
    border-radius: 8px;
    background: transparent;
    color: var(--fosco);
    font-size: 1rem;
    box-shadow: none;
  }
  h3 {
    font-size: 0.8rem;
    font-weight: bolder;
    color: var(--gray-60);
  }
  p {
    font-size: 1rem;
    color: var(--gray-60);
  }
}
</style>
