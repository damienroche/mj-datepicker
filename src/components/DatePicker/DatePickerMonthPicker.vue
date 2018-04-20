<template>
  <div class="mj-month-picker" :class="pickerClass()">
    <div class="head">
      <div class="controls">
        <button @click="previousYear()">prev</button>
        <div>{{year.getFormated()}}</div>
        <button @click="nextYear()">next</button>
      </div>
    </div>
    <div class="body">
      <slot name="group"></slot>
      <div class="months">
        <div class="month"
          v-for="month in year.getMonths()"
          @click="selectize(month)"
          @mouseover="hoverize(month)"
          @mouseleave="hover_range = []"
          :class="{
            'is-current' : isCurrent(month),
            'is-selected': isSelected(month),
            'is-hoverable': isHoverable(month)
          }">
          <span v-if="grouped && groupBy == 'quarter'">{{ month.format('MMM') }}</span>
          <span v-else>{{ month.format('MMMM') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { DatePickerMixin } from './DatePickerMixin'
  import { Year } from './DatePickerClasses'
  import Moment from 'moment'
  import { extendMoment } from 'moment-range'

  const moment = extendMoment(Moment)
  const current = moment()

  export default {
    mixins: [ DatePickerMixin ],
    props: {
      grouped: {
        type: Boolean,
        default: false
      },
      groupBy: {
        type: String,
        default: "month"
      }
    },
    data() {
      return {
        start_date: null,
        end_date: null,
        hover_range: [],
        year: new Year(current.month(), current.year())
      }
    },
    methods: {
      isCurrent: function(month) {
        return month.isSame(new Date(), "month")
      },
      isSelected: function(month) {
        if (this.groupBy === "quarter") {
          return this.start_date && month.isSame(this.start_date, "quarter")
        } else {
          return this.start_date && month.isSame(this.start_date, "month")
        }
      },
      isHoverable: function(month) {
        if (this.groupBy === "quarter") {
          for (var i = 0; i < this.hover_range.length; i++) {
            if (this.hover_range[i].isSame(month, "quarter")) return true
          }
        }
        return false
      },
      hoverize: function(month) {
        if (this.groupBy === "quarter") {
          const start = month.clone().startOf("quarter")
          const end = month.clone().endOf("quarter")
          const range = moment().range(start, end)
          this.hover_range = []

          for (let month of range.by('months')) {
            this.hover_range.push(month)
          }
        }
      },
      nextYear: function() {
        let year = this.year.year
        let month = this.year.month
        year += 1
        this.year = new Year(month, year)
      },
      previousYear: function() {
        let year = this.year.year
        let month = this.year.month
        year -= 1
        this.year = new Year(month, year)
      },
      selectize: function(month) {
        if (this.grouped && this.groupBy == 'quarter') {
          this.start_date = month.clone().startOf('quarter')
          this.end_date = month.clone().endOf('quarter')
          this.hover_range.push(this.start_date.clone())
          this.hover_range.push(this.end_date.clone())
        } else {
          this.start_date = month.clone().startOf('month')
          this.end_date = month.clone().endOf('month')
        }
        this.$emit('selectize', this.start_date, this.end_date)
      },
      pickerClass: function() {
        return this.grouped ? this.groupBy : ''
      }
    }
  }
</script>

<style scoped lang="scss">
  .mj-month-picker {
  }

  .mj-month-picker .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .mj-month-picker .body {
    display: flex;
  }

  .mj-month-picker .months {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .mj-month-picker .months .month {
    cursor: pointer;
    width: 48%;
    width: calc(50% - 10px);
    height: 50px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 1px solid #EEE;
    border-radius: 2px;
    font-size: 13px;
    color: #3D4268;
    margin-top: 10px;
  }

  .mj-month-picker.quarter .month {
    width: 33.33%;
    border-right: 0;
    border-left: 0;
    border-radius: 0;
  }

  .mj-month-picker.quarter .month:nth-child(3n+1),
  .mj-month-picker.quarter .month:nth-child(3n+3), {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 1px;
      height: 50px;
      background-color: #EEE;
      top: 0;
    }
  }

  .mj-month-picker.quarter .month.is-selected:nth-child(3n+3),
  .mj-month-picker.quarter .month.is-selected:nth-child(3n+1) {
    &::before {
      display: none;
    }
  }

  .mj-month-picker.quarter .month:nth-child(3n+1) {
    &::before {
      left: 0;
    }
  }

  .mj-month-picker.quarter .month:nth-child(3n+3) {
    &::before {
      right: 0;
    }
  }

  .mj-month-picker .months .month.is-current {
    text-decoration: underline;
  }

  .mj-month-picker .months .month.is-selected {
    background-color: #46C3A3;
    border-color: #46C3A3;
    color: white;
  }

  .mj-month-picker .months .month:not(.is-selected):hover,
  .mj-month-picker .months .month.is-hoverable:not(.is-selected) {
    background: #F6F7F9;
  }
</style>
