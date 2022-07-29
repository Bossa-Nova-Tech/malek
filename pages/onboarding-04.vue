<template>
  <main>
    <h1 class="text-center malek-x">Financeiro</h1>
    <div class="d-flex justify-content-between mx-auto cont-img">
      <img src="~/assets/img/ilustracao/Calculator.svg" alt="" />
    </div>
    <img
      class="d-flex mx-auto"
      src="~/assets/img/ilustracao/dots-04.svg"
      alt=""
    />
    <p class="mx-auto">Organize contas a pagar e a receber em um só lugar</p>
  </main>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
h1 {
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 150%;
  padding-top: 5.875rem;
  padding-bottom: 4.375rem;
}
p {
  text-align: center;
  max-width: 300px;
  font-weight: 500;
  font-size: 0.938rem;
  line-height: 150%;
  padding-top: 3.75rem;
}

.cont-img {
  position: relative;
  max-width: 700px;
  padding-bottom: 2.5rem;
}

.left {
  position: absolute;
  right: 0px;
}
</style>
