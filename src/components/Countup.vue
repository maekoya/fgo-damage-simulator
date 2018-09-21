<template>
  <span>{{ tweenedNumber | moneyDelimiter }}</span>
</template>

<script>
import { TweenLite } from 'gsap/umd/TweenMax'

export default {
  name: 'Countup',
  props: {
    number: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      tweenedNumber: this.number
    }
  },
  watch: {
    number: function (newValue) {
      TweenLite.to(this.$data, 0.5, { 'tweenedNumber': newValue })
    }
  },
  filters: {
    /**
     * Money Delimiter Filter
     *
     * @param  {Number} value
     * @return {String} Value splited by commma
     */
    moneyDelimiter: (value) => {
      value = Math.floor(value)
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
</script>
