<template>
  <div>
    <date-picker-month-picker></date-picker-month-picker>
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
    }
  }
</script>

<style scoped lang="scss">
</style>
