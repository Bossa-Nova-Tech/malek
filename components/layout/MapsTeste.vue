<template>
  <div>
    <client-only>
      <l-map style="height: 300px" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      </l-map>
    </client-only>
  </div>
</template>
<script>
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer } from 'vue2-leaflet';

export default {
  name: 'MapsTeste',
  components: {
    LMap,
    LTileLayer,
  },
  data() {
    return {
      circle: {
        center: [-27.64337, -48.68869],
        radius: 4500,
      },
      markerLatLng: [-27.64337, -48.68869],
      zoom: 18,
      center: [-27.64337, -48.68869],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },
};
</script>
