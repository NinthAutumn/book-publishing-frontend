import Vue from 'vue'
import VueViewports from 'vue-viewports'

const options = [{
    rule: '320px',
    label: 'mobile'
  },
  {
    rule: '768px',
    label: 'tablet'
  },
  {
    rule: '1024px',
    label: 'desktop'
  },
  {
    rule: '1920px',
    label: 'hd-desktop'
  },
  {
    rule: '2560px',
    label: 'qhd-desktop'
  },
  {
    rule: '3840px',
    label: 'uhd-desktop'
  }
]

Vue.use(VueViewports, options)
