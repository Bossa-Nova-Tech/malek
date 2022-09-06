<template>
  <b-container>
    <main class="mx-auto col col-lg-6 mt-5">
      <b-form>
        <h1 class="pb-3">Criar Orçamento</h1>

        <b-row>
          <b-col>
            <b-form-group class="mb-4">
              <label for="name"
                >Nome do distribuidor <span class="requerido">*</span></label
              >
              <b-form-input
                v-model="formData.name"
                name="name"
                type="text"
                placeholder="-"
              />
            </b-form-group>
          </b-col>
        </b-row>

        <div
          v-for="orcamento in orcamentos"
          :key="orcamento.id"
          class="separador mb-5"
        >
          <b-row>
            <b-col cols="6">
              <b-form-group class="mb-4">
                <label for="equipment">Tipo equipamento</label>
                <b-form-input
                  v-model="orcamento.equipment"
                  name="equipment"
                  type="text"
                  placeholder="-"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </div>
        <pre>{{ orcamentos }}</pre>
        <pre>{{ formData }}</pre>
      </b-form>

      <b-button class="mb-5" @click="addInput">adicionar +</b-button>
    </main>
  </b-container>
</template>

<script>
export default {
  name: 'Orcamento',

  data: () => {
    return {
      formData: {
        name: null,
      },

      counter: 0,
      orcamentos: [
        {
          id: 0,
          equipment: null,
          capacity: null,
        },
      ],
    };
  },

  methods: {
    addInput() {
      this.orcamentos.push({
        id: ++this.counter,
        equipment: null,
        capacity: null,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--gray-40);
}

.requerido {
  color: var(--red-50);
}

.separador {
  padding: 10px;
  border: solid 1px #0047bb;
  border-radius: 6px;
}
</style>
