<template>
  <main>
    <div class="tabs d-flex">
      <div class="nav-item" @click="setActive('tab-1')">hoje</div>
      <div class="nav-item" @click="setActive('tab-2')">relatorio</div>
    </div>

    <div class="tab-content">
      <div v-show="isActive('tab-1')" class="pane">
        <div class="exemple">
          <h1>titulo 1</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            eligendi et id sint aspernatur reiciendis soluta explicabo, cumque
            nesciunt ipsa necessitatibus veritatis vitae magnam sunt natus
            doloremque assumenda, numquam maiores?
          </p>
        </div>
      </div>
      <div v-show="isActive('tab-2')" class="pane">
        <div class="exemple">
          <h1>titulo 2</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            eligendi et id sint aspernatur reiciendis soluta explicabo, cumque
            nesciunt ipsa necessitatibus veritatis vitae magnam sunt natus
            doloremque assumenda, numquam maiores?
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data: () => ({ activeTab: 'tab-1' }),
  methods: {
    setActive(tab) {
      this.activeTab = tab;
    },
    isActive(tab) {
      return this.activeTab === tab;
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  gap: 20px;
  .nav-item {
    background-color: bisque;
    border: 2px solid black;
    padding: 1rem;
  }
}
.tab-content {
  background-color: cadetblue;
  max-width: 400px;
}
p {
  color: black;
}
</style>
