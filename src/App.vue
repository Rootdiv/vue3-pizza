<template>
  <div class="wrapper">
    <HeaderComponent />
    <div className="content">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts">
  import HeaderComponent from '@/components/Header.vue';

  export default {
    name: 'App',
    components: {
      HeaderComponent,
    },
  };
</script>
