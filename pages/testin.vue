<template>
  <section>
    <div class="dois">
      <h3>Manutenção</h3>

      <div class="ordem">
        <h1>Ordem de serviço 102</h1>
        <div>
          <p>foto</p>
          <h2>nome cliente</h2>
        </div>
      </div>

      <h4>HAVAN Unidade 02</h4>
    </div>

    <div>
      <p>editar</p>
      <p>excluir</p>
      <p>02horas e 30min</p>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
section {
  display: grid;
  grid-template-columns: 2fr 1fr;

  .dois {
    display: grid;
    grid-template-columns: 1fr 1fr;

    .ordem {
      grid-column: 1;
      grid-row: 1 / 3;
    }
  }
}

@media screen and (max-width: 992px) {
  section {
    display: grid;
    grid-template-columns: 1fr 1fr;

    .dois {
      display: grid;
      grid-template-columns: 1fr;

      .ordem {
        grid-column: 1;
        grid-row: 2;
      }
    }
  }
}
</style>
