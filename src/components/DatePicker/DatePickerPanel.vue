<template>
  <!-- <div v-show="showPanel" class="mj-datepicker-panel"> -->
  <div v-show="true" class="mj-datepicker-panel">
    <div class="tabs" v-if="showFullUi === true">
      <button
        v-for="tab in tabs"
        v-bind:key="tab.name"
        v-bind:class="['tab-button', { active: currentTab.name === tab.name }]"
        v-on:click="currentTab = tab">
        {{ tab.name }}
      </button>
    </div>
    <component :is="currentTab.component"></component>
  </div>
</template>

<script>
  import DatePickerPanelRange from './DatePickerPanelRange'
  import DatePickerPanelWeek from './DatePickerPanelWeek'
  import DatePickerPanelMonth from './DatePickerPanelMonth'
  import DatePickerPanelQuarter from './DatePickerPanelQuarter'
  import DatePickerPanelYear from './DatePickerPanelYear'

  const tabs = [
    {
      name: 'range',
      component: DatePickerPanelRange
    },
    {
      name: 'week',
      component: DatePickerPanelWeek
    },
    {
      name: 'month',
      component: DatePickerPanelMonth
    },
    {
      name: 'quarter',
      component: DatePickerPanelQuarter
    },
    {
      name: 'year',
      component: DatePickerPanelYear
    }
  ]

  export default {
    props: {
      showPanel: {
        type: Boolean,
        required: true
      },
      fullUi: {
        format: Boolean,
        default: false
      }
    },
    data() {
      return {
        currentTab: tabs[0],
        tabs: tabs
      }
    },
    computed: {
      showFullUi: function() {
        return this.fullUi
      },
      currentTabComponent: function() {
      }
    },
    methods: {
    },
    mounted: function() {
    }
  }
</script>

<style scoped lang="scss">
  .mj-datepicker-panel {
    position: absolute;
    left: 0;
    top: 100%;
    background-color: #f8f8f8;
  }
</style>
