<template>
  <div class="wrapper">
    <Header />
    <div className="content">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts">
  import Header from '@/components/Header.vue';

  export default {
    name: 'App',
    components: {
      Header,
    },
  };
</script>
