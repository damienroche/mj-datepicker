/* eslint-disable react/react-in-jsx-scope */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import DatePicker from '../src/components/DatePicker';
import moment from 'moment'

var today_start = moment().startOf('day').format();
var today_now = moment().format();
var yesterday_start = moment().add(-1, 'days').startOf('day').format();
var yesterday_end = moment().add(-1, 'days').endOf('day').format();


storiesOf('DatePicker - initial states', module)
  .add('Without params', () => ({
    components: { DatePicker },
    template: '<date-picker @click="action"></date-picker>',
    methods: { action: action('clicked') },
  }))
  .add('With params and custom format', () => ({
    components: { DatePicker },
    template: '<date-picker paramsDateFrom="2018-04-06+12" paramsDateTo="2018-04-20+13" format="YYYY-MM-DD+HH" @click="action"></date-picker>',
    methods: { action: action('clicked') },
  }))
  .add('With begin in params (allow forever filter)', () => ({
    components: { DatePicker },
    template: '<date-picker begin="2001-01-01+12" beginFormat="YYYY-MM-DD+HH" @click="action"></date-picker>',
    methods: { action: action('clicked') },
  }))
  .add('Current Tab in params', () => ({
    components: { DatePicker },
    template: '<date-picker paramsDateFrom="2018-04-06+12" paramsDateTo="2018-04-20+13" format="YYYY-MM-DD+HH" paramsTabActive="week"></date-picker>',
    methods: { action: action('clicked') },
  }))
  // .add('Version Light', () => ({
  //   components: { DatePicker },
  //   template: '<date-picker placeholder="Séléctionnez une date" fullUi="false" @click="action"></date-picker>',
  //   methods: { action: action('clicked') },
  // }))
  // .add('Pas de sélection pour les dates futures', () => ({
  //   components: { DatePicker },
  //   template: '<date-picker disallowFuture="true" @click="action"></date-picker>',
  //   methods: { action: action('clicked') },
  // }))
  // .add('Format MJ-FLEET YYYY-MM-DD+HH', () => ({
  //   components: { DatePicker },
  //   template: '<date-picker paramsDateFrom="2018-04-06+12" paramsDateTo="2018-04-20+13" format="YYYY-MM-DD+HH" @click="action"></date-picker>',
  //   methods: { action: action('clicked') },
  // }))
  // .add('Sur un jour', () => ({
  //   components: { DatePicker },
  //   template: '<date-picker paramsDateFrom="2018-04-06+12" paramsDateTo="2018-04-06+22" @click="action"></date-picker>',
  //   methods: { action: action('clicked') },
  // }))
  .add('Yesterday', () => ({
    components: { DatePicker },
    template: '<date-picker paramsDateFrom="' + yesterday_start + '" paramsDateTo="' + yesterday_end + '" @click="action"></date-picker>',
    methods: { action: action('clicked') },
  }))
  .add('Today', () => ({
    components: { DatePicker },
    template: '<date-picker paramsDateFrom="' + today_start + '" paramsDateTo="' + today_now + '" @click="action"></date-picker>',
    methods: { action: action('clicked') },
  }))
  // .add('Hier à Aujourd\'hui', () => ({
  //   components: { DatePicker },
  //   template: '<date-picker paramsDateFrom="' + yesterday_start + '" paramsDateTo="' + today_now + '" @click="action"></date-picker>',
  //   methods: { action: action('clicked') },
  // }))
  // .add('Invalide: une seule date en paramètre', () => ({
  //   components: { DatePicker },
  //   template: '<date-picker paramsDateFrom="2018-04-06+12" @click="action"></date-picker>',
  //   methods: { action: action('clicked') },
  // }))


storiesOf('DatePicker - Options', module)
  .add('With placeholder', () => ({
      components: { DatePicker },
      template: '<date-picker placeholder="Custom placeholder" @click="action"></date-picker>',
      methods: { action: action('clicked') },
    }))
  .add('Minimal Version', () => ({
    components: { DatePicker },
    template: '<date-picker fullUi="false" @click="action"></date-picker>',
    methods: { action: action('clicked') },
  }))


storiesOf('DatePicker - Themes', module)
  .add('MJ-FLEET', () => ({
      components: { DatePicker },
      template: '<date-picker"></date-picker>'
    }))

/* eslint-enable react/react-in-jsx-scope */
