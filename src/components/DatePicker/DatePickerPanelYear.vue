<template>
  <div class="mj-datepicker-panel-years">
    <date-picker-year-picker @selectize="updateSelected"></date-picker-year-picker>
  </div>
</template>

<script>
  import DatePickerYearPicker from './DatePickerYearPicker'
  export default {
    components: {
      'date-picker-year-picker': DatePickerYearPicker
    },
    methods: {
      updateSelected: function(start, end) {
        this.$emit('selectize', start, end)
      }
    }
  }
</script>

<style lang="scss">
  .mj-datepicker-panel-years {
    padding: 20px;
  }
</style>
