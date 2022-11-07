<template>
  <div>
    <div id="map-wrap" style="height: 100vh">
      <client-only>
        <l-map :zoom="13" :center="[55.9464418, 8.1277591]">
          <l-tile-layer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          ></l-tile-layer>
          <l-marker :lat-lng="[-39, -80]"></l-marker>
        </l-map>
      </client-only>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    doSomethingOnReady() {
      this.map = this.$refs.myMap.mapObject;
    },
  },
};
</script>
