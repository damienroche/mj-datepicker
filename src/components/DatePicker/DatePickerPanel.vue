<template>
  <div v-show="showPanel" class="mj-datepicker-panel">
  <!-- <div v-show="true" class="mj-datepicker-panel"> -->
    <div class="tabs" v-if="showFullUi === true">
      <button
        v-for="(tab, value, index) in tabs"
        :key="value"
        :class="{'is-selected': isSelected(tab)}"
        @click="switchTab(value)">
        {{ value }}
      </button>
    </div>

    <div>
      <component :is="currentTab.component" @selectize="updateSelected" :begin="begin" :userRanges="ranges"></component>
    </div>

    <div class="mj-datepicker-panel-controls">
      <button class="cancel-button transparent" type="cancel">Cancel</button>
      <button class="submit-button success" type="submit" :disabled="(!start_date || !end_date)">OK</button>
    </div>

    <!-- <div>
      {{ start_date_formatted }} - {{ end_date_formatted }}
    </div> -->

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
      },
      isSelected: function(tab) {
        return this.currentTab === tab
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
    max-width: 390px;
    width: 390px;
    background: #FFF;
    border: 1px solid #EEE;
    box-shadow: 0 10px 30px 0 rgba(0,0,0,0.05);
    border-radius: 2px;
  }

  .mj-datepicker-panel > div {
    border-bottom: 1px solid #eee;

    &:last-of-type {
      border-bottom: 0;
    }
  }

  .mj-datepicker-panel .tabs {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }

  .mj-datepicker-panel .tabs button {
    background: #F6F7F9;
    border-radius: 4px;
    font-size: 12px;
    color: #3D4268;
    letter-spacing: -0.3px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .mj-datepicker-panel .tabs button.is-selected,
  .mj-datepicker-panel .tabs button:hover {
    background: #3D4268;
    color: #FFF;
  }

  .mj-datepicker-panel-controls {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }

  .mj-datepicker-panel-controls .cancel-button,
  .mj-datepicker-panel-controls .submit-button {
    height: 40px;
    font-size: 13px;
  }

  .mj-datepicker-panel-controls .cancel-button {
    color: #93A1BA;
  }

  .mj-datepicker-panel-controls .submit-button {
    width: 130px;
  }
</style>
