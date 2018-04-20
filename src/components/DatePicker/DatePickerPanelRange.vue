<template>
  <div class="mj-datepicker-panel-ranges">
    <button v-for="range in ranges" @click="dispatch(range)" :class="{ 'is-selected': isSelected(range) }">
      {{range}}
    </button>
    <date-picker-calendar selectBy="day" v-if="current == 'custom'" @selectize="updateSelected"></date-picker-calendar>
  </div>
</template>

<script>
  import DatePickerCalendar from './DatePickerCalendar'
  // import { ranges } from './DatePickerRanges'
  import moment from 'moment'
  import _ from 'lodash'

  const ranges = [
    'yesterday',
    'today',
    'this-week',
    'this-month',
    'this-quarter',
    'this-year',
    'last-week',
    'last-month',
    'last-quarter',
    'last-year',
    'past-30-days',
    'past-90-days',
    'past-6-months',
    'past-year',
    'custom'
  ]

  export default {
    components: {
      'date-picker-calendar': DatePickerCalendar
    },
    props: {
      begin: {
        type: Object
      },
      userRanges: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        start_date: null,
        end_date: null,
        current: null
      }
    },
    computed: {
      ranges() {
        return this.userRanges || ranges
      }
    },
    methods: {
      dispatch: function(range) {
        this.current = range

        switch(range) {
          case 'yesterday' :
            this.start_date = moment().add(-1, 'days').startOf('days')
            this.end_date = moment().add(-1, 'days').endOf('days')
            break
          case 'today' :
            this.start_date = moment().startOf('days')
            this.end_date = moment()
            break
          case 'this-week' :
            this.start_date = moment().startOf('week')
            this.end_date = moment()
            break
          case 'this-month' :
            this.start_date = moment().startOf('month')
            this.end_date = moment()
          case 'this-quarter' :
            this.start_date = moment().startOf('quarter')
            this.end_date = moment()
            break
          case 'this-year' :
            this.start_date = moment().startOf('year')
            this.end_date = moment()
            break
          case 'last-week' :
            this.start_date = moment().subtract(1, 'week').startOf('week')
            this.end_date = moment().subtract(1, 'week').endOf('week')
            break
          case 'last-month' :
            this.start_date = moment().subtract(1, 'month').startOf('month')
            this.end_date = moment().subtract(1, 'month').endOf('month')
            break
          case 'last-quarter' :
            this.start_date = moment().subtract(1, 'quarter').startOf('quarter')
            this.end_date = moment().subtract(1, 'quarter').endOf('quarter')
            break
          case 'last-year' :
            this.start_date = moment().subtract(1, 'year').startOf('year')
            this.end_date = moment().subtract(1, 'year').endOf('year')
            break
          case 'past-7-days' :
            this.start_date = moment().subtract(1, 'week')
            this.end_date = moment()
            break
          case 'past-30-days' :
            this.start_date = moment().subtract(1, 'month')
            this.end_date = moment()
            break
          case 'past-90-days' :
            this.start_date = moment().subtract(3, 'month')
            this.end_date = moment()
            break
          case 'past-6-months' :
            this.start_date = moment().subtract(6, 'month')
            this.end_date = moment()
            break
          case 'past-year' :
            this.start_date = moment().subtract(1, 'year')
            this.end_date = moment()
            break
          case 'forever' :
            this.start_date = this.begin
            this.end_date = moment()
            break
          case 'custom' :
            this.start_date = null
            this.end_date = null
        }

        this.$emit('selectize', this.start_date, this.end_date)
      },
      isSelected: function(range) {
        return this.current === range
      },
      updateSelected: function(start, end) {
        this.$emit('selectize', start, end)
      },
    },
    mounted() {
      if (this.begin)
        this.ranges.push('forever')
      console.log(this.userRanges)
    }
  }

</script>

<style scoped lang="scss">
  button.is-selected {
    background-color: red
  }
</style>
