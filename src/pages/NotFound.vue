<template>
  <div class="root">
    <h1>
      <span>&#128533;</span>
      <br />
      Ничего не найдено
    </h1>
    <p class="description">К сожалению данная страница отсутствует в нашем интернет-магазине</p>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'NotFound',
    emits: ['vnode-unmounted'],
  };
</script>

<style lang="scss" scoped>
  .root {
    padding: 100px;
    max-width: 750px;
    margin: 0 auto;
    text-align: center;

    span {
      font-size: 64px;
      color: #ffa500;
    }
  }

  .description {
    font-size: 22px;
  }
</style>
