import Vue from "vue"
import {
  createInstaller
} from "vue-pwa-installer"

export default (context, inject) => {
  const installer = createInstaller(Vue, {
    /* options */ })
  inject("$installer", installer)
}
