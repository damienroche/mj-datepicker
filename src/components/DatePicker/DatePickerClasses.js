import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)

export class Month {

  constructor(month, year) {
    this.start = moment([year, month])
    this.end = this.start.clone().endOf('month')
    this.month = month
    this.year = year
    this.now = moment()
    this.current = this.start.isSame(this.now, 'month')
  }

  getWeekStart() {
    return this.start.weekday()
  }

  getDays() {
    const range = moment.range(this.start.startOf('week'), this.end.endOf('week'))
    const days = []

    for (let day of range.by('days'))
      days.push(day)

    return days
  }

  getFormated() {
    return this.start.format('MMMM YYYY')
  }
}

export class Year {

  constructor(month, year) {
    this.start = moment([year, month])
    this.end = this.start.clone().endOf('year')
    this.month = month
    this.year = year
    this.now = moment()
    this.current = this.start.isSame(this.now, 'month')
  }


  getMonths() {
    const range = moment.range(this.start.startOf('year'), this.end)
    const months = []

    for (let month of range.by('month'))
      months.push(month)

    return months
  }

  getFormated() {
    return this.start.format('YYYY')
  }
}

export class Years {
  constructor() {
    this.past = moment().subtract(3, 'years')
    this.future = moment().add(3, 'years')
  }

  getYears() {
    const range = moment.range(this.past, this.future)
    const years = []

    for (let year of range.by('year') )
      years.push(year)

    return years.reverse()
  }
}
