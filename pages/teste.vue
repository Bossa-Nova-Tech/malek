<!-- <template></template>

<script>
import { mapActions } from 'vuex';
export default {
  async asyncData() {
    const tasks = this.fetchTasks();
    console.log(tasks);
  },
  methods: {
    ...mapActions('tasks', ['fetchTasks']),
    async register() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.formSend = true;
        try {
          await this.createTeacher({
            name: this.formData.firstname,
            surname: this.formData.lastname,
            fiscalNumber: this.formData.fiscalNumber,
            type: 0,
            email: this.formData.email,
            password: this.formData.password,
          });
          await this.$router.push('/professor');
          this.$snack('Usuário criado com sucesso!');
        } catch (err) {
          this.formSend = false;
        }
      }
    },
  },
};
</script>

<style></style>
 -->
