<template>
  <!-- <div v-show="showPanel" class="mj-datepicker-panel"> -->
  <div v-show="true" class="mj-datepicker-panel">
    <div class="tabs" v-if="showFullUi === true">
      <button
        v-for="(tab, value, index) in tabs"
        v-bind:key="value"
        v-on:click="switchTab(value)">
        {{ value }}
      </button>
    </div>

    <component :is="currentTab.component" @selectize="updateSelected" :begin="begin" :userRanges="ranges"></component>

    <button type="cancel">Cancel</button>
    <button type="submit" :disabled="(!start_date || !end_date)">OK</button>

    {{ start_date_formatted }} - {{ end_date_formatted }}

  </div>
</template>

<script>
  import DatePickerPanelRange from './DatePickerPanelRange'
  import DatePickerPanelWeek from './DatePickerPanelWeek'
  import DatePickerPanelMonth from './DatePickerPanelMonth'
  import DatePickerPanelQuarter from './DatePickerPanelQuarter'
  import DatePickerPanelYear from './DatePickerPanelYear'

  const tabs = {
    range: {
      component: DatePickerPanelRange
    },
    week: {
      component: DatePickerPanelWeek
    },
    month: {
      component: DatePickerPanelMonth
    },
    quarter: {
      component: DatePickerPanelQuarter
    },
    year: {
      component: DatePickerPanelYear
    }
  }

  export default {
    props: {
      showPanel: {
        type: Boolean,
        required: true
      },
      fullUi: {
        format: Boolean,
        default: false
      },
      activeTab: {
        format: String
      },
      begin: {
        type: Object
      },
      ranges: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        currentTab: tabs.range,
        tabs: tabs,
        start_date: null,
        end_date: null,
        forever: false
      }
    },
    computed: {
      showFullUi: function() {
        return this.fullUi
      },
      start_date_formatted: function() {
        if (this.start_date)
          return this.start_date.format('HH:mm DD MMMM YYYY')
      },
      end_date_formatted: function() {
        if (this.end_date)
          return this.end_date.format('HH:mm DD MMMM YYYY')
      }
    },
    methods: {
      updateSelected: function(start, end) {
        this.start_date = start
        this.end_date = end
      },
      switchTab: function(key) {
        this.currentTab = tabs[key]
        this.start_date = null
        this.end_date = null
      }
    },
    mounted: function() {
      if (this.activeTab)
        this.currentTab = tabs[this.activeTab]
    }
  }
</script>

<style scoped lang="scss">
  .mj-datepicker-panel {
    position: absolute;
    left: 0;
    top: 100%;
    background-color: #f8f8f8;
    padding: 20px;
  }

  .mj-datepicker-panel .tabs button {
  }

  // .mj-datepicker-panel .tabs button {
  //   border: none;
  //   margin: 0;
  //   padding: 0;
  //   width: auto;
  //   overflow: visible;
  //   background: transparent;
  //   cursor: pointer;

  //   /* inherit font & color from ancestor */
  //   color: inherit;
  //   font: inherit;

  //   /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */
  //   line-height: normal;

  //   /* Corrects font smoothing for webkit */
  //   -webkit-font-smoothing: inherit;
  //   -moz-osx-font-smoothing: inherit;

  //   /* Corrects inability to style clickable `input` types in iOS */
  //   -webkit-appearance: none;
  // }
</style>
