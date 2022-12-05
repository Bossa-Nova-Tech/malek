<template>
  <div>
    <b-card v-for="(ask, index) in formData.ask" :key="index">
      <div class="d-flex justify-content-end">
        <b-img
          role="button"
          src="~/assets/img/icones/delete-icon.svg"
          @click.once="deletAsk(index)"
        />
      </div>
      <b-form-group>
        <label for="ask_text">Pergunta </label>
        <b-form-input
          name="ask_text"
          v-model="ask.text"
          placeholder="Qual é a sua pergunta?"
        />
      </b-form-group>
      <label for="type_of_answer">Tipo de resposta</label>
      <b-form-radio-group
        v-model="ask.type_of"
        :options="typeOfAnswer"
        class="d-flex flex-column"
      />
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
      typeOfAnswer: [
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
    },
    adicionarOpcaoDeResposta(index) {
      this.formData.ask[index].answer_options.push({ text: null });
      console.log(index);
    },
    deletAsk(index) {
      this.formData.ask.splice(index, 1);
    },
    deletAnswer(index) {
      this.formData.answer_options.splice(index, 1);
    },
  },
};
</script>

<style>
</style>
