<template>
  <section class="rounded">
    <h1 class="p-4">Acontecendo hoje</h1>
    <ul>
      <li class="card-servico p-4">
        <div class="d-flex pb-3" @click="showVer(itemOrdem)">
          <div class="ajuste">
            <h2 class="primary-80 pb-1"># ID Tipo de Serviço</h2>
            <p class="gray-40">Nome do Colaborador</p>
          </div>
        </div>
        <div class="d-flex flex-column align-items-end">
          <div class="d-flex mb-2">
            <img
              src="~/assets/img/icones/pause-icon.svg"
              class="mr-3"
              role="button"
              width="22"
              height="24"
              @click="showConcluir(itemOrdem)"
            />
            <img
              src="~/assets/img/icones/play-icon.svg"
              role="button"
              class="mr-3"
              width="22"
              height="24"
              @click="showEditar(itemOrdem)"
            />

            <img
              src="~/assets/img/icones/stop-icon.svg"
              role="button"
              width="22"
              height="24"
              @click="showExcluir(itemOrdem)"
            />
          </div>
        </div>
        <div class="d-flex align-items-center" @click="showVer(itemOrdem)">
          <b-img :src="photo_perfil.photo" alt="foto de perfil" />
          <p class="pl-2">Cliente</p>
        </div>
        <span class="gray-40">13/12/2022</span>
      </li>
    </ul>
  </section>
</template>

<script>
import Vue2Filters from 'vue2-filters';

export default {
  name: 'Listing',
  filters: {
    truncate(data) {
      const search = 'pessoa f';
      if (data.match(search)) {
        const str = data.split(' ');
        return str[0];
      } else {
        const str = data.replace('pessoa pj', '');
        return str + ' PJ';
      }
    },
  },
  mixins: [Vue2Filters.mixin],
  props: {
    tasksData: {
      type: Array,
      default: null,
    },
    watching: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      tamanho: null,
      name: 'Para Bailar la bamba',
      indice: null,
      espaco: null,
      editar: false,
      id: null,
      photo_perfil: { photo: require('~/assets/img/icones/icone-perfil.svg') },
    };
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
section {
  height: 25rem;
  background: var(--gray-10);
  box-shadow: 0px 4px 4px rgba(0, 71, 187, 0.06);

  p {
    font-weight: 600;
    font-size: 12px;
  }

  h2,
  h3 {
    font-weight: 600;
    font-size: 0.75rem;
  }

  ul {
    height: 18.75rem;
    overflow: auto;

    li {
      display: grid;
      grid-template-columns: 3fr 1fr;

      span {
        align-self: center;
        justify-self: end;
      }

      .ajuste {
        padding-left: 0.5rem;
      }
    }
  }

  .card-servico {
    border-top: 0.5px solid var(--gray-20);
  }
}

@media screen and (max-width: 991px) {
  section {
    height: 70vh;

    ul {
      height: 50vh;
      li {
        .ajuste {
          padding-left: 0rem;
        }
      }
    }
  }
}
</style>
