<template>
  <div v-show="showPanel">
    Panel
  </div>
</template>

<script>
  export default {
    props: {
      showPanel: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      display() {
        return this.options.disabled
      }
    }
  }
</script>
