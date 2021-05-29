class Dom {
  constructor(selector) {
    this.$nativeEl = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$nativeEl.innerHTML = html
      return this
    }
    return this.$nativeEl.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$nativeEl.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$nativeEl.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$nativeEl
    }

    if (Element.prototype.append) {
      this.$nativeEl.append(node)
    } else {
      this.$nativeEl.appendChild(node)
    }
    return this
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
