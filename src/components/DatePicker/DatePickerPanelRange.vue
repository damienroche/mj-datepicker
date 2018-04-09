<template>
  <div>
    <button v-for="range in ranges">
      {{range.type}}
    </button>
    <date-picker-calendar selectBy="day"></date-picker-calendar>
  </div>
</template>

<script>
  import DatePickerCalendar from './DatePickerCalendar'
  import { ranges } from './DatePickerRanges'

  export default {
    components: {
      'date-picker-calendar': DatePickerCalendar
    },
    data() {
      return {
        ranges: ranges
      }
    }
  }

</script>

<style scoped lang="scss">

</style>
