<template>
  <div class="mj-datepicker-label">
    <div v-if="showLabelWithDates"> {{ stringDate }}</div>
    <div v-else>{{ message }}</div>
  </div>
</template>

<script>
  import moment from 'moment';
  import { DatePickerMixin } from './DatePickerMixin'

  export default {
    mixins: [ DatePickerMixin ],
    props: {
      placeholder: {
        type: String
      },
      showLabelWithDates: {
        type: Boolean,
        default: false
      },
      dateFrom: {
        type: Object
      },
      dateTo: {
        type: Object
      }
    },
    data() {
      return {
        message: null
      }
    },
    computed: {
      stringDate: function() {
        if (this.wasYesterday(this.dateFrom) && this.wasYesterday(this.dateTo))
          return "Yesterday"
        if (this.isToday(this.dateFrom) && this.isToday(this.dateTo))
          return "Today"
        else
          return "Du au"

      }
    },
    methods: {
      initLabel() {
        this.message = this.placeholder || this.translation('en').placeholder // todo language
      },
      getDateIntervalAsString(from, to) {
      }
    },
    mounted: function() {
      this.initLabel()
    }
  }
</script>

<style scoped>

</style>
