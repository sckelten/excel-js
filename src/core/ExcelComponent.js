import {DOMListener} from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  // Возвращает шаблон компонента
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
  }

  toHTML() {
    return ''
  }

  init() {
    this.initDomListeners()
  }

  destroy() {
    this.removeDomListeners()
  }
}
