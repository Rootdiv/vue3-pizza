<template>
  <div class="cart cart--empty">
    <h2>Корзина пустая <span>&#128533;</span></h2>
    <p>
      Вероятней всего, вы не заказывали ещё пиццу.<br />
      Для того, чтобы заказать пиццу, перейди на главную страницу.
    </p>
    <img src="@/assets/img/empty-cart.png" alt="Empty cart" />
    <RouterLink to="/" class="button button--black">
      <span>Вернуться назад</span>
    </RouterLink>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'CartEmpty',
  };
</script>
