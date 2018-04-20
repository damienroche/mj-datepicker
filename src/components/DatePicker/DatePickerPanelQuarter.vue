<template>
  <div class="mj-datepicker-panel-quarters">
    <date-picker-month-picker :grouped="true" groupBy="quarter" @selectize="updateSelected">
      <div slot="group">
        <div class="mj-datepicker-panel-quarters__label">Trim. 1</div>
        <div class="mj-datepicker-panel-quarters__label">Trim. 2</div>
        <div class="mj-datepicker-panel-quarters__label">Trim. 3</div>
        <div class="mj-datepicker-panel-quarters__label">Trim. 4</div>
      </div>
    </date-picker-month-picker>
  </div>
</template>

<script>
  import DatePickerMonthPicker from './DatePickerMonthPicker'
  export default {
    components: {
      'date-picker-month-picker': DatePickerMonthPicker
    },
    methods: {
      updateSelected: function(start, end) {
        this.$emit('selectize', start, end)
      }
    }
  }
</script>

<style lang="scss">
  .mj-datepicker-panel-quarters {
    padding: 20px;
  }

  .mj-datepicker-panel-quarters__label {
    height: 52px;
    width: 80px;
    font-size: 13px;
    color: #3D4268;
    line-height: 22px;
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
</style>
