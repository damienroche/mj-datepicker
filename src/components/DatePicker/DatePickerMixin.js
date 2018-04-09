import moment from 'moment'
import DatePickerLanguages from './DatePickerLanguages'

export const DatePickerMixin = {
  methods: {

    /**
     * Check if date was yesterday
     * @param {Date} date - an object instantiated with the new Date constructor
     * @return {Boolean}
     */
    wasYesterday(date) {
      return date.isSame(moment().add(-1, 'days'), 'day')
    },

    /**
     * Check if date if today
     * @param {Date} date - an object instantiated with the new Date constructor
     * @return {Boolean}
     */
    isToday(date) {
      return date.isSame(moment(), 'day')
    },

    /**
     * Check if dates are set
     * @return {Boolean}
     */
    presenceDates(dateFrom, dateTo) {
      if (dateFrom === undefined || dateTo == undefined)
        return false
      else
        return true
    },

    /**
     * Validate a date with moment
     * @param {Date} date - an object instantiated with the new Date constructor
     * @return {Boolean}
     */
    isValidDate(date) {
      return date.isValid()
    },

    /**
     * Validates dates
     * @return {Boolean}
     */
    validDates() {
      return this.isValidDate(this.dateFrom) && this.isValidDate(this.dateTo)
    },
    translation(language) {
      return DatePickerLanguages.translations[language]
    }
  }
}
