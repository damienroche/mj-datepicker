<template>
  <div class="mj-month-picker">
    <div class="mj-month-picker-head">
      <div class="mj-month-picker-head__controls">
        <button @click="nextYear()">next</button>
        <div>{{year.getFormated()}}</div>
        <button @click="previousYear()">prev</button>
      </div>
    </div>
    <div class="mj-month-picker-body">
      <div class="mj-month-picker-body__month" v-for="month in year.getMonths()" :class="{ 'is-current' : isSelected(month)}">
        {{ month.format('MMMM') }}
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
    data() {
      return {
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
      }
    },
    mounted() {
      console.log(this.year)
    }
  }
</script>

<style lang="scss">
  .mj-month-picker {

  }

  .mj-month-picker-thead {
    display: flex;
    flex-wrap: wrap;

    &__label {
      width: 14.2857%;
      text-align: center;
    }
  }

  .mj-month-picker-body {
    display: flex;
    flex-wrap: wrap;

    &__month {
      width: 50%;
      text-align: center;

      &.is-current {
        text-decoration: underline;
      }
    }
  }
</style>
