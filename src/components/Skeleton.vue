<template>
  <ContentLoader viewBox="0 0 280 460" :speed="2" primary-color="#f3f3f3" secondary-color="#ecebeb">
    <circle cx="132" cy="142" r="115" />
    <rect x="0" y="273" rx="6" ry="6" width="280" height="26" />
    <rect x="0" y="310" rx="6" ry="6" width="280" height="84" />
    <rect x="0" y="418" rx="6" ry="6" width="91" height="31" />
    <rect x="137" y="408" rx="25" ry="25" width="140" height="46" />
  </ContentLoader>
</template>

<script lang="ts">
  import { ContentLoader } from 'vue-content-loader';

  export default {
    name: 'SkeletonLoader',
    components: { ContentLoader },
  };
</script>
