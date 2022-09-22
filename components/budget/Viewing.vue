<template>
  <div>
    <b-modal
      :id="budget.id"
      ref="viewModal"
      size="lg"
      header-class="border-0 d-flex flex-column"
      hide-footer
    >
      <template #modal-header>
        <div v-if="!$screen.md">
          <b-img
            src="~/assets/img/icones/seta-voltar-azul.svg"
            class="mt-5 ml-3 mb-4"
            @click="$bvModal.hide('visualizar')"
          ></b-img>
          <h1 class="mt-2 ml-3">Visualizar Orçamento</h1>
        </div>
        <div v-else class="w-100 d-flex justify-content-between">
          <h1 class="mt-2 ml-3">Visualizar Orçamento</h1>
          <CloseIcon class="mr-3" @click.native="$bvModal.hide('visualizar')" />
        </div>
      </template>
      <template #default>
        <div class="caixa mx-auto">
          <h3 class="mt-4">Cliente</h3>
          <p class="mt-1">UNIFEBE - FUndação Ed. de Brusque</p>
          <h3 class="mt-3">CPF/ CNPJ</h3>
          <p>000.000.000-00</p>
          <section v-if="!$screen.lg" class="pt-2 mt-3">
            <div>
              <h3>Equipamento</h3>
              <ul class="mt-1">
                {{
                  budget.equipment
                }}
                <li>{{ budget.capacity }}</li>
                <li>{{ budget.cycle }}</li>
                <li>Observações</li>
                <li>{{ budget.payment }}</li>
              </ul>
            </div>
            <h3 class="mt-3">Data de solicitação</h3>
            <p class="mt-2">{{ budget.date }}</p>
          </section>
          <section v-else class="pt-2 container mt-5">
            <b-row class="d-flex justify-content-between">
              <div>
                <h3 class="text-left">Tipo equipamento</h3>
                <p class="mt-1">{{ budget.equipment }}</p>
              </div>
              <div>
                <h3 class="text-right">Capacidade</h3>
                <p class="mt-2">{{ budget.capacity }}</p>
              </div>
            </b-row>
            <b-row class="d-flex mt-3 justify-content-between">
              <div>
                <h3 class="text-left">Ciclo</h3>
                <p class="mt-2">{{ budget.cycle }}</p>
              </div>
              <div>
                <h3 class="text-right">Tipo de sistema</h3>
                <p class="mt-2">{{ budget.system }}</p>
              </div>
            </b-row>
            <b-row class="d-flex mt-3 justify-content-between">
              <div>
                <h3 class="text-left">Voltagem</h3>
                <p class="mt-2">{{ budget.voltage }}</p>
              </div>
              <div>
                <h3 class="text-right">Pagamento</h3>
                <p class="mt-2">{{ budget.payment }}</p>
              </div>
            </b-row>
          </section>
          <h3 v-if="$screen.lg" class="mt-5">Data de solicitação</h3>
          <p v-if="$screen.lg" class="mt-2 mb-5 pb-5">{{ budget.date }}</p>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: 'Viewing',
  props: ['budget'],
  data: () => {
    return {
      id: null,
      formSend: false,
      formData: {
        name: null,
        phone: null,
        email: null,
        equipment: null,
        capacity: null,
        cycle: null,
        system: null,
        voltage: null,
        payment: null,
        userTerms: null,
        security: null,
      },
    };
  },
  mounted() {
    console.log('chamou o delete', this.budget.id);
    const idRef = 'modal-' + this.budget.id;
    console.log(idRef);
    return { idRef };
  },
};
</script>
<style lang="scss" scoped>
.x-icon {
  cursor: pointer;
}
h3 {
  font-size: 0.75rem;
  color: var(--gray-40);
}
p {
  font-size: 1rem;
}
</style>
