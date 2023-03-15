<template>
  <div class="wrapper">
    <Header />
    <div className="content">
      <RouterView />
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';

  export default {
    name: 'App',
    components: {
      Header,
    },
  };
</script>
