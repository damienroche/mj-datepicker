<template>
  <div>
    <button v-for="(range, index) in ranges" @click="dispatch(range)" :class="{ 'is-selected': isSelected(range, index) }">
      {{range.type}}
    </button>
    <date-picker-calendar selectBy="day" v-if="current == 'custom'" @selectize="updateSelected"></date-picker-calendar>
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
        ranges: ranges,
        current: null
      }
    },
    methods: {
      dispatch: function(range) {
        this.current = range.type
      },
      isSelected: function(range, index) {
        // if (!this.current && index == 0)
        //   this.current = range.type
        return this.current == range.type
      },
      updateSelected: function(start, end) {
        this.$emit('selectize', start, end)
      }
    }
  }

</script>

<style scoped lang="scss">
  button.is-selected {
    background-color: red
  }
</style>
