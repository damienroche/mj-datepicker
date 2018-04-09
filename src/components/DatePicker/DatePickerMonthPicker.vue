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
          :class="{ 'is-current' : isSelected(month) }">
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
  import moment from 'moment'

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
        default: 'quarter'
      }
    },
    data() {
      return {
        start_date: null,
        end_date: null,
        year: new Year(current.month(), current.year())
      }
    },
    methods: {
      isSelected: function(month) {
        return month.isSame(new Date(), "month")
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

<style scoped>
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
  }

  .mj-month-picker .months .month {
    width: 50%;
    text-align: center;
  }

  .mj-month-picker.quarter .month {
    width: 33%;
  }

  .mj-month-picker .months .month.is-current {
    text-decoration: underline;
  }
</style>
