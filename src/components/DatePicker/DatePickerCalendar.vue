<template>
  <div class="mj-calendar">
    <div class="mj-calendar-head">
      <div class="mj-calendar-head__controls">
        <button @click="previousMonth()">prev</button>
        <div>{{month.getFormated()}}</div>
        <button @click="nextMonth()">next</button>
      </div>
    </div>
    <div class="mj-calendar-thead">
      <div class="mj-calendar-thead__label" v-for="item in thead">
        {{item}}
      </div>
    </div>
    <div class="mj-calendar-body">
      <div class="mj-calendar-body__day"
        v-for="(day, index) in days"
        @mouseover="hoverize(day)"
        @mouseleave="hover_range = []"
        @click="selectize(day)"
        :key="day.unix()"
        :class="{
          'is-current' : isCurrent(day),
          'is-hoverable': isHoverable(day),
          'is-selected' : isSelected(day),
          'isnt-allowed': false,
          'is-delimiter': isDelimiter(day),
          'isnt-current-month': isAnotherMonth(day)
        }">
        {{ day.format('DD') }}
      </div>
    </div>
  </div>
</template>

<script>
  import { DatePickerMixin } from './DatePickerMixin'
  import { Month } from './DatePickerClasses'
  import Moment from 'moment'
  import { extendMoment } from 'moment-range'

  const moment = extendMoment(Moment)
  const current = moment()

  export default {
    mixins: [ DatePickerMixin ],
    props: {
      selectBy: {
        type: String,
        default: "day"
      }
    },
    data() {
      return {
        thead: this.translation('fr').days,
        month: new Month(current.month(), current.year()),
        current: null,
        range: null,
        hover_range: [],
        selected_range: [],
        delimiters: [],
        selected: false,
        start_date: null,
        tmp_date: null,
        end_date: null
      }
    },
    computed: {
      days: function() {
        return this.month.getDays()
      }
    },
    methods: {
      isCurrent: function(day) {
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
      },
      getWeekHoverRange(day) {
        this.current = day.clone()
        const start = day.clone().startOf("week")
        const end = day.clone().endOf("week")
        this.range = moment().range(start, end)
        this.hover_range = []

        for (let day of this.range.by('days')) {
          this.hover_range.push(day)
        }
      },
      // Need refacto
      getWeekRange(day) {
        this.current = day.clone()
        const start = day.clone().startOf("week")
        const end = day.clone().endOf("week")
        this.range = moment().range(start, end)
        this.selected_range = []

        for (let day of this.range.by("days")) {
          this.selected_range.push(day)
        }
      },
      hoverize: function(day) {
        if (this.selectBy === "day") {
          const c = day.clone()
          if (this.tmp_date) {
            if (c.isBefore(this.tmp_date)) {
              this.range = moment().range(c, this.tmp_date)
            } else {
              this.range = moment().range(this.tmp_date, c)
            }
            this.hover_range = []
            for (let day of this.range.by("days")) {
              this.hover_range.push(day)
            }
          }
        }

        if (this.selectBy === "week") {
          this.getWeekHoverRange(day)
        }
      },
      isHoverable: function(day) {
        if (this.selectBy === "day" && this.tmp_date && !this.end_date) {
          for (var i = 0; i < this.hover_range.length; i++) {
            if (this.hover_range[i].isSame(day, "day")) return true
          }
        }
        if (this.selectBy === "week") {
          for (var i = 0; i < this.hover_range.length; i++) {
            if (this.hover_range[i].isSame(day, "day")) return true
          }
        }
        return false
      },
      selectize: function(day) {
        if (this.selectBy === "week") {
          this.getWeekRange(day)
          this.selected = true
          this.start_date = day.clone().startOf("week")
          this.end_date = day.clone().endOf("week")
          this.delimiters = [this.end_date, this.start_date]
        }

        if (this.selectBy === "day") {
          this.selected_range = []
          if (this.start_date && this.end_date) {
            this.delimiters = []
          }
          this.delimiters.push(day.clone())
          if (!this.tmp_date) {
            this.tmp_date = day.clone()
            if (this.start_date && this.end_date) {
              this.start_date = null
              this.end_date = null
            }
          } else if (!this.start_date && !this.end_date) {
            if (this.tmp_date.isBefore(day)) {
              this.start_date = this.tmp_date
              this.end_date = day.clone()
            } else {
              this.start_date = day.clone()
              this.end_date = this.tmp_date
            }
            this.range = moment().range(this.start_date, this.end_date)
            this.selected_range = []
            for (let day of this.range.by("days")) {
              this.selected_range.push(day)
            }
            this.selected = true
            this.tmp_date = null
          }
        }

        this.$emit('selectize', this.start_date, this.end_date)
      },
      isSelected: function(day) {
        if (this.selected_range && this.selected) {
          for (var i = 0; i < this.selected_range.length; i++) {
            if (this.selected_range[i].isSame(day, "day")) return true
          }
        }
        return false
      },
      isDelimiter: function(day) {
        for (var i = 0; i < this.delimiters.length; i++) {
          if (day.isSame(this.delimiters[i], "day")) return true
        }
        return false
      },
      isAnotherMonth: function(day) {
        return !day.isSame(this.month, 'month')
      }
    }
  }
</script>

<style lang="scss">
  .mj-calendar {

  }

  .mj-calendar-head__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
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

      &.isnt-allowed {
        cursor: not-allowed;
      }

      &.is-hoverable {
        &:not(.is-delimiter),
        &:not(.is-selected) {
          cursor: pointer;
          background-color: #ccc;

          &:last-of-type {
            border-radius: 20px;
          }
        }

      }

      &.is-selected {
        background-color: red;
      }

      &.isnt-current-month {
        color: #696969;
      }

      &.is-delimiter {
        background-color: green !important;
      }
    }
  }
</style>
