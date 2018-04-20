<template>
  <div class="mj-datepicker-panel-ranges">
    <div class="mj-datepicker-panel-ranges__controls">
      <div class="range" v-for="range in ranges" @click="dispatch(range)" :class="{ 'is-selected': isSelected(range) }">
        {{range}}
      </div>
    </div>
    <div>
      <div class="mj-datepicker-panel-ranges__result">
        <span class="label">Date de début et de fin :</span>
        <div class="dates">
          <span class="icon"></span>
          <span class="date">{{ start_date_formatted }} - {{ end_date_formatted }}</span>
        </div>
      </div>
      </label>
      <date-picker-calendar selectBy="day" v-if="current == 'custom'" @selectize="updateSelected" style="margin-top: 30px;"></date-picker-calendar>
    </div>
  </div>
</template>

<script>
  import DatePickerCalendar from './DatePickerCalendar'
  // import { ranges } from './DatePickerRanges'
  import moment from 'moment'
  import _ from 'lodash'

  // const ranges = [
  //   'yesterday',
  //   'today',
  //   'this-week',
  //   'this-month',
  //   'this-quarter',
  //   'this-year',
  //   'last-week',
  //   'last-month',
  //   'last-quarter',
  //   'last-year',
  //   'past-30-days',
  //   'past-90-days',
  //   'past-6-months',
  //   'past-year',
  //   'custom'
  // ]

  const ranges = [
    'yesterday',
    'today',
    'last-week',
    'past-30-days',
    'past-90-days',
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
      },
      end_date_formatted() {
        if (this.end_date) {
          return this.end_date.format('DD/MM/YYYY')
        } else {
          return ""
        }
      },
      start_date_formatted() {
        if (this.start_date) {
          return this.start_date.format('DD/MM/YYYY')
        } else {
          return ""
        }
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
        this.start_date = start
        this.end_date = end
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
  .mj-datepicker-panel-ranges {
    > div {
      padding: 20px;
      border-bottom: 1px solid #eee;

      &:last-of-type {
        border-bottom: 0;
      }
    }
  }

  .mj-datepicker-panel-ranges__controls {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .mj-datepicker-panel-ranges__result {
    .label {
      font-size: 13px;
      color: #3D4268;
      margin-bottom: 10px;
      display: block;
    }
    .dates {
      display: flex;
      height: 50px;
      border: 1px solid #EEE;

      .icon {
        border-right: 1px solid #EEE;
        display: inline-flex;
        height: 50px;
        width: 50px;
      }

      .date {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        flex: 1;
        font-size: 14px;
        color: #3D4268;
      }
    }
  }

  .mj-datepicker-panel-ranges .range {
    color: #3D4268;
    display: inline-flex;
    cursor: pointer;
    transition: all 0.2s;
    margin: 5px 0;
    font-size: 13px;

    &::before {
      content: '-';
      margin-right: 25px;
    }

    &:hover, &.is-selected {
      color: #46C3A3;
    }
  }
</style>
