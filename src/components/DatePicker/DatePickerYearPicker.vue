<template>
  <div class="mj-year-picker">
    <div class="mj-year-picker-body">
      <div class="mj-year-picker-body__year"
        v-for="year in years.getYears()"
        @click="selectize(year)"
        :class="{ 'is-current' : isCurrent(year), 'is-selected': isSelected(year)}">
        {{ year.format('YYYY') }}
      </div>
    </div>
  </div>
</template>

<script>
  import { DatePickerMixin } from './DatePickerMixin'
  import { Years } from './DatePickerClasses'

  import moment from 'moment'


  export default {
    mixins: [ DatePickerMixin ],
    data() {
      return {
        years: new Years(),
        selected_year: null
      }
    },
    methods: {
      isCurrent: function(year) {
        return year.isSame(moment(), 'year')
      },
      isSelected: function(year) {
        return this.selected_year && year.isSame(this.selected_year, "year")
      },
      selectize: function(year) {
        // if current year and disallow future = true
        // if (year.isSame(moment(), 'year' ))
        const start = year.clone().startOf('year')
        const end = year.clone().endOf('year')
        this.selected_year = start
        this.$emit('selectize', start, end)
      }
    }
  }
</script>

<style lang="scss">
  .mj-year-picker {
  }

  .mj-year-picker-body {
  }

  .mj-year-picker-body__year {
    cursor: pointer;
    border: 1px solid #EEE;
    border-radius: 2px;
    font-size: 13px;
    height: 50px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #3D4268;

    &:hover {
      background-color: #F6F7F9;
    }
  }

  .mj-year-picker-body__year.is-selected {
    color: #FFF;
    background-color: green;
    background: #46C3A3;
    border: 1px solid #46C3A3;
  }

  .mj-year-picker-body__year.is-current {
    text-decoration: underline;
  }
</style>
