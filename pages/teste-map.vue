<template>
  <div>
    <l-map ref="myMap" style="height: 300px" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="center"></l-marker>
      <l-control :position="'bottomleft'" class="custom-control-watermark">
        AíServe &copy; Malek 2022
      </l-control>
      <l-circle :lat-lng="circle.center" :radius="circle.radius" />
    </l-map>
  </div>
</template>

<script>
import { latLng } from 'leaflet';
import { LMap, LTileLayer, LControl } from 'vue2-leaflet';

export default {
  name: 'Example',
  components: {
    LMap,
    LTileLayer,
    LControl,
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
    };
  },
  methods: {
    showAlert() {
      alert('Click!');
    },
  },
};
</script>

<style>
.example-custom-control {
  background: #fff;
  padding: 0 0.5em;
  border: 1px solid #aaa;
  border-radius: 0.1em;
}
.custom-control-watermark {
  font-size: 200%;
  font-weight: bolder;
  color: #aaa;
  text-shadow: #555;
}
</style>
