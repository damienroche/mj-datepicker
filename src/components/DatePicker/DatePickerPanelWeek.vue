<template>
  <div>
    <date-picker-calendar selectBy="week"></date-picker-calendar>
  </div>
</template>

<script>
  import DatePickerCalendar from './DatePickerCalendar'
  export default {
    components: {
      'date-picker-calendar': DatePickerCalendar
    }
  }
</script>

<style scoped lang="scss">
</style>
