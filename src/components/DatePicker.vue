<template>
  <div class="mj-datepicker" @click="onClick" v-click-outside="hidePanel" :class="classes">
    <div class="mj-datepicker__fields">
      <input type="hidden" :value="dateFromFormatted" readonly="">
      <input type="hidden" :value="dateToFormatted" readonly="">
      <!-- <input type="text" :value="dateFrom.format(this.format)" readonly="">
      <input type="text" :value="dateTo.format(this.format)" readonly=""> -->
    </div>
    <date-picker-label
      class="mj-datepicker-trigger"
      :placeholder="placeholder"
      :showLabelWithDates="initDates"
      :dateFrom="dateFromFormatted"
      :dateTo="dateToFormatted">
    </date-picker-label>
    <date-picker-panel
      :showPanel="showPanel"
      :activeTab="paramsTabActive"
      :fullUi="fullUi"
      :begin="beginFormatted()"
      :ranges="ranges">
    </date-picker-panel>
  </div>
</template>

<script>

import DatePickerPanel from './DatePicker/DatePickerPanel.vue'
import DatePickerLabel from './DatePicker/DatePickerLabel.vue'
import { DatePickerMixin } from './DatePicker/DatePickerMixin'
import ClickOutside from 'vue-click-outside'
import moment from 'moment'

moment.locale('fr')

export default {
  name: 'DatePicker',
  directives: {
    ClickOutside
  },
  mixins: [ DatePickerMixin ],
  components: {
    'date-picker-panel': DatePickerPanel,
    'date-picker-label': DatePickerLabel
  },
  props: {
    paramsDateFrom: {
      type: String
    },
    paramsDateTo: {
      type: String
    },
    paramsTabActive: {
      type: String,
      default: 'range'
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD+HH:mm'
    },
    begin: {
      type: String
    },
    beginFormat: {
      type: String,
      default: 'YYYY-MM-DD+HH:mm'
    },
    language: {
      type: String,
      default: 'en'
    },
    placeholder: {
      format: String,
      default: null
    },
    fullUi: {
      format: Boolean,
      default: true
    },
    disallowFuture: {
      format: Boolean,
      default: true
    },
    disallowPast: {
      format: Boolean,
      default: false
    },
    ranges: {
      format: Array,
      default: null
    },
    theme: {
      format: String,
      default: "default"
    }
  },
  data() {
    return {
      showPanel: false,
      dateFrom: null,
      dateTo: null,
      initDates: false
    }
  },
  computed: {
    classes: function() {
      return {
        'panel-open': this.showPanel
      }
    },
    dateFromFormatted: function() {
      return this.dateFrom
    },
    dateToFormatted: function() {
      return this.dateTo
    },

    /**
     * Display Date Range instead of placeholder
     * if dates are presents and valids
     * @return {Boolean}
     */
    setDatesInLabel: function() {
      if (this.dateFrom instanceof moment && this.dateTo instanceof moment)
        this.initDates = true
    }
  },
  methods: {
    onClick() {
      this.$emit('click');
      this.showPanel = true

    },
    hidePanel() {
      this.showPanel = false
    },

    /**
     * Check if dates are in params and convert them in a moment object
     * @return {Void}
     */
    initField() {

      if (!this.presenceDates(this.paramsDateFrom, this.paramsDateTo)) return null
      const from = moment(this.paramsDateTo, this.format)
      const to = moment(this.paramsDateTo, this.format)
      if (from.isValid() && to.isValid()) {
        this.dateFrom = from
        this.dateTo = to
      }

    },

    beginFormatted() {
      if (this.begin) {
        const begin = moment(this.begin, this.beginFormat)
        if (begin.isValid()) {
          return begin.clone()
        }
      }
    }
  },
  mounted: function() {
    this.initField()
    this.setDatesInLabel
  }
}
</script>

<style lang="scss">
  .mj-datepicker {
    position: relative;
    display: inline-block;
    font-family: 'Montserrat', sans-serif;

    &:not(.panel-open) {
      cursor: pointer;
    }

    button {
      padding: 0 10px;
      user-select: none;
      width: auto;
      border: 0;
      overflow: visible;
      cursor: pointer;
      outline: 0;

      /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */
      line-height: normal;

      /* Corrects font smoothing for webkit */
      -webkit-font-smoothing: inherit;
      -moz-osx-font-smoothing: inherit;

      /* Corrects inability to style clickable `input` types in iOS */
      -webkit-appearance: none;
    }

    button.success {
      background: #46C3A3;
      border-radius: 4px;
      color: white;

      &:disabled {
        cursor: not-allowed;
        background-color: rgba(#46C3A3, 0.5);
      }
    }

    button.transparent {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .mj-datepicker-trigger {
    height: 50px;
    width: 50px;
    border: 1px solid #EEE;
    border-radius: 2px;
    text-indent: -999px;
    display: inline-block;
  }


  .mj-datepicker__fields {
    width: 100%;
    display: flex;

    input {
      width: 50%;
    }
  }

</style>
