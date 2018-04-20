<template>
  <div class="mj-year-picker">
    <div class="mj-year-picker-body">
      <div class="mj-year-picker-body__year"
        v-for="year in years.getYears()"
        @click="selectize(year)"
        :class="{ 'is-current' : isSelected(year)}">
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
        years: new Years()
      }
    },
    methods: {
      isSelected: function(year) {
        return year.isSame(moment(), 'year')
      },
      selectize: function(year) {
        // if current year and disallow future = true
        // if (year.isSame(moment(), 'year' ))
        const start = year.clone().startOf('year')
        const end = year.clone().endOf('year')
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

  }

  .mj-year-picker-body__year.is-current {
    text-decoration: underline;
  }
</style>
