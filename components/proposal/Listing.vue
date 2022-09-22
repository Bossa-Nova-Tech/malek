<template>
  <section>
    <ul>
      <li
        v-for="proposal in proposalData"
        :key="proposal.id"
        class="p-4 d-flex justify-content-between"
      >
        <p>#{{ proposal.id }} {{ proposal.name }}</p>
        <div>
          <img src="~/assets/img/icones/edit-icon.svg" alt="" />

          <img
            src="~/assets/img/icones/delete-icon.svg"
            alt=""
            @click="showModal(proposal)"
          />
        </div>
        <Delete :proposal="proposal" />
      </li>
    </ul>
  </section>
</template>
<script>
import Delete from '~/components/proposal/Delete.vue';
export default {
  name: 'Listing',
  components: { Delete },
  props: {
    proposalData: {
      type: Array,
      default: null,
    },
  },
  async asyncData({ $axios }) {
    const proposals = await $axios.get('business-proposal');
    const proposalData = proposals.data;
    console.log('business-proposal :: ', proposals.data);
    return { proposalData };
  },
  data() {
    return {
      id: null,
    };
  },
  methods: {
    showModal(proposal) {
      this.id = proposal.id;
      // this.$root.$emit('bv::show::modal', 'excluir', this.id);
      this.$bvModal.show(this.id);
      console.log(proposal.id + ' chamado');
    },
  },
};
</script>
<style lang="scss" scoped>
section {
  height: 33.5625rem;
  background: #fbfbfb;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 71, 187, 0.06);
  border-radius: 0.5rem;
  ul {
    overflow: auto;
    height: 80%;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.0625rem solid var(--gray-20);
      p {
        font-weight: 600;
        font-size: 0.75rem;
        color: var(--primary-80);
      }
      img {
        margin-left: 1.25rem;
        cursor: pointer;
      }
    }
  }
}
</style>
