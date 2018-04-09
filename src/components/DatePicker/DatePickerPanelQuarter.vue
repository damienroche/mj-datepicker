<template>
  <div>
    <date-picker-month-picker :grouped="true" groupBy="quarter" @selectize="updateSelected">
      <div slot="group">
        <div>Trim. 1</div>
        <div>Trim. 2</div>
        <div>Trim. 3</div>
        <div>Trim. 4</div>
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

<style scoped lang="scss">
</style>
