<template>
  <div class="mj-calendar">

    <div class="mj-calendar-head">
      <div class="mj-calendar-head__controls">
        <button @click="nextMonth()">next</button>
        <div>{{month.getFormated()}}</div>
        <button @click="previousMonth()">prev</button>
      </div>
    </div>
    <div class="mj-calendar-thead">
      <div class="mj-calendar-thead__label" v-for="item in thead">
        {{item}}
      </div>
    </div>
    <div class="mj-calendar-body">
      <div class="mj-calendar-body__offset" :style="{width: (month.getWeekStart() * 14.2857) + '%'}"></div>
      <div class="mj-calendar-body__day" v-for="day in month.getDays()" :class="{ 'is-current' : isSelected(day)}">
        {{ day.format('DD') }}
      </div>
    </div>
  </div>
</template>

<script>
  import { DatePickerMixin } from './DatePickerMixin'
  import { Month } from './DatePickerClasses'
  import moment from 'moment'

  const current = moment()

  export default {
    mixins: [ DatePickerMixin ],
    props: {
      selectBy: {
        type: String,
        default: 'day'
      }
    },
    data() {
      return {
        thead: this.translation('fr').days,
        month: new Month(current.month(), current.year())
      }
    },
    methods: {
      isSelected: function(day) {
        return day.isSame(new Date(), "day")
      },
      nextMonth: function() {
        let month = this.month.month + 1
        let year = this.month.year
        if (month > 11) {
          month = 0
          year += 1
        }
        this.month = new Month(month, year)
      },
      previousMonth: function() {
        let month = this.month.month - 1
        let year = this.month.year
        if (month < 0) {
          month = 11
          year -= 1
        }
        this.month = new Month(month, year)
      }
    }
  }
</script>

<style lang="scss">
  .mj-calendar {

  }

  .mj-calendar-thead {
    display: flex;
    flex-wrap: wrap;

    &__label {
      width: 14.2857%;
      text-align: center;
    }
  }

  .mj-calendar-body {
    display: flex;
    flex-wrap: wrap;

    &__day {
      width: 14.2857%;
      text-align: center;

      &.is-current {
        text-decoration: underline;
      }
    }
  }
</style>
