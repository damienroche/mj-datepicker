<template>
  <div @click="onClick" v-click-outside="hidePanel">
    <input type="text">
    <input type="text">
    <date-picker-panel :showPanel="showPanel"></date-picker-panel>
  </div>
</template>

<script>

import DatePickerPanel from './DatePicker/DatePickerPanel.vue'
import ClickOutside from 'vue-click-outside'

export default {
  name: 'DatePicker',
  directives: {
    ClickOutside
  },
  components: {
    'date-picker-panel': DatePickerPanel
  },
  props: {
  },
  data() {
    return {
      showPanel: false
    }
  },
  methods: {
    onClick() {
      this.$emit('click');
      this.showPanel = true
    },
    hidePanel() {
      this.showPanel = false
    }
  },
}
</script>

<style scoped>

</style>
