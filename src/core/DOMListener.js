import {capitalize} from '@core/utils';


export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw Error(`No $root provided for DOMListener`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDomListeners() {
    this.listeners.forEach((listener) => {
      const callback = getCallbackName(listener)
      if (!this[callback]) {
        throw new Error(
            `Method ${callback} is not implemented in ${this.name} component`)
      }
      this[callback] = this[callback].bind(this)
      // Тоже самое что и addEventListener
      this.$root.on(listener, this[callback])
    })
  }

  removeDomListeners() {
    this.listeners.forEach((listener) => {
      const callback = getCallbackName(listener)
      this.$root.off(listener, this[callback])
    })
  }
}

// input => onInput
function getCallbackName(eventName) {
  return 'on' + capitalize(eventName);
}
