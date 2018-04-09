<template>
  <div>
    <date-picker-month-picker groupBy="quarter"></date-picker-month-picker>
  </div>
</template>

<script>
  import DatePickerMonthPicker from './DatePickerMonthPicker'
  export default {
    components: {
      'date-picker-month-picker': DatePickerMonthPicker
    }
  }
</script>

<style scoped lang="scss">
</style>
