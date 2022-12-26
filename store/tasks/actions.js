export default {
  async getTasks({ commit }) {
    return await this.$axios
      .get('tasks')
      .then(({ data }) => {
        commit('GET_TASKS', data);
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
