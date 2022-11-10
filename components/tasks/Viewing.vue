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
        <h1 class="mt-4 mb-5">
          Ordem de Serviço <span> {{ ordem_item.id }}</span>
        </h1>

        <img
          src="~/assets/img/icones/X-icon.svg"
          class="mb-5 mt-3"
          role="button"
          @click.once="$bvModal.hide(`view-task-${ordem_item.id}`)"
        />
      </div>
      <h3>Tipo de serviço</h3>
      <p>{{ ordem_item.services }}</p>
      <h3 class="mt-4">Cliente</h3>
      <p>{{ ordem_item.name_customer | truncate() }}</p>
      <h3 class="mt-4">Duração média da tarefa</h3>
      <p>{{ ordem_item.estimated_time }}</p>
      <h3 class="mt-4">Data prevista para conclusão</h3>
      <p>{{ ordem_item.end_date }}</p>
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
      <b-button variant="primary" @click="$bvModal.show('visitas')"
        >Agendar Visita</b-button
      >
      <Add />
    </div>
  </b-modal>
</template>
<script>
import 'leaflet/dist/leaflet.css';
import { latLng, Icon } from 'leaflet';
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
  },
  data() {
    return {
      circle: {
        center: latLng(-27.64337, -48.68869),
        radius: 4500,
      },
      zoom: 18,
      center: latLng(-27.64337, -48.68869),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      date_of_visit: null,
    };
  },

  methods: {
    modalShown() {
      setTimeout(() => {
        // mapObject is a property that is part of leaflet
        this.$refs.myMap.mapObject.invalidateSize();
      }, 100);
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
