/* eslint-disable react/react-in-jsx-scope */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import DatePicker from '../src/components/DatePicker';


storiesOf('DatePicker', module)
  .add('Normal', () => ({
    components: { DatePicker },
    template: '<date-picker @click="action"></date-picker>',
    methods: { action: action('clicked') },
  }))
  // .add('with JSX', () => ({
  //   components: { DatePicker },
  //   render() {
  //     return <my-button onClick={this.action}>With JSX</my-button>;
  //   },
  //   methods: { action: linkTo('clicked') },
  // }))
  // .add('with some emoji', () => ({
  //   components: { DatePicker },
  //   template: '<my-button @click="action">😀 😎 👍 💯</my-button>',
  //   methods: { action: action('clicked') },
  // }));

/* eslint-enable react/react-in-jsx-scope */
