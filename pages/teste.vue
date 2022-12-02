<template>
  <div>
    aaaaaaaa
    <b-card v-for="(ask, index) in formData.ask" :key="index">
      <b-form-input v-model="ask.text" />
      <b-form-radio-group v-model="ask.type_of" :options="typeOfAsk" />
      <b-form-radio-group v-model="ask.is_required" :options="isReq" />
    </b-card>
    <b-button @click="adicionarPergunta">adicionar</b-button>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      formData: {
        ask: [
          {
            text: null,
            type_of: null,
          },
        ],
      },
      typeOfAsk: [
        {
          value: null,
          text: 'Selecione',
        },
        {
          value: 'a',
          text: 'a',
        },
        {
          value: 'b',
          text: 'b',
        },
        {
          value: 'c',
          text: 'c',
        },
      ],
      isReq: [
        {
          value: 'sim',
          text: 'Sim',
        },
        {
          value: 'não',
          text: 'não',
        },
      ],
    };
  },
  methods: {
    adicionarPergunta(index) {
      this.formData.ask.push({
        text: null,
        type_of: null,
        answer_options: null,
        is_required: null,
      });
      console.log(index);
      console.log(this.formData);
    },
  },
};
</script>

<style>
</style>
