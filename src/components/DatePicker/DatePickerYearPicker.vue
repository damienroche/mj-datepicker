<template>
  <div class="mj-year-picker">
    <div class="mj-year-picker-body">
      <div class="mj-year-picker-body__year" v-for="year in years.getYears()" :class="{ 'is-current' : isSelected(year)}">
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
