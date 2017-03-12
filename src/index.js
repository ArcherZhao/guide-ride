const GUIDEVERSION = "guideVersion"

module.exports = class GuideRide {
  constructor(version = "0", options = {}) {
    if (localStorage) {
      if (localStorage.getItem(GUIDEVERSION) === String(version)) {
        return
      }
      localStorage.setItem(GUIDEVERSION, version)
    }
    const { allowSkip = true } = options
    this.allowSkip = allowSkip
    this.queue = []
    this.idle = true
    this.initDom()
  }
  initDom () {
    this.fragment = document.createDocumentFragment()
    this.root = document.createElement("div")
    this.root.className = "guide-module"
    this.overlay = document.createElement("div")
    this.overlay.className = "guide-overlay"
    this.overlay.innerHTML = `<div class="guide-hole"></div><div class="guide-tip"></div>`
    this.fragment.appendChild(this.overlay)
    window.document.querySelector("body").insertBefore(this.root)
  }
  step(element, text = "", cb = () => {}) {
    this.queue.push([element, text, cb])
    this.next()
    return this
  }
  next() {
    if (this.idle) {
      this.show(this.queue.shift())
      this.idle = false
    }
  }
  show(item) {
    const target = document.querySelector(item[0])
    this.overlay.querySelector(".guide-tip")
    this.root.appendChild(this.overlay)
  }
  hide() {
    this.idle = true
    this.fragment.appendChild(this.overlay)
  }
}