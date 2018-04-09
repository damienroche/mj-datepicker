<template>
  <div>
    <date-picker-month-picker :grouped="false" @selectize="updateSelected"></date-picker-month-picker>
  </div>
</template>

<script>
  import DatePickerMonthPicker from './DatePickerMonthPicker'
  export default {
    components: {
      'date-picker-month-picker': DatePickerMonthPicker
    },
    props: {
      groupBy: {
        type: String
      }
    },
    methods: {
      updateSelected: function(start, end) {
        this.$emit('selectize', start, end)
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
