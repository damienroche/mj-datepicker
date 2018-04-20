<template>
  <div class="mj-datepicker-panel-weeks">
    <date-picker-calendar selectBy="week" @selectize="updateSelected"></date-picker-calendar>
  </div>
</template>

<script>
  import DatePickerCalendar from './DatePickerCalendar'
  export default {
    components: {
      'date-picker-calendar': DatePickerCalendar
    },
    methods: {
      updateSelected: function(start, end) {
        this.$emit('selectize', start, end)
      }
    }
  }
</script>

<style lang="scss">
  .mj-datepicker-panel-weeks {
    padding: 20px;
  }
</style>
