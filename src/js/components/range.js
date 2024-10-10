export default class Range {
  rangeEl

  rangeBadge

  rangeBadgeText

  rangeBackEl

  valueSign = '₽'

  value = 0

  constructor({ rangeEl, rangeBadge, rangeBackEl, valueSign }) {
    this.rangeEl = rangeEl
    this.rangeBadge = rangeBadge
    this.rangeBadgeText = rangeBadge.querySelector('span')
    this.rangeBackEl = rangeBackEl
    this.valueSign = valueSign || this.valueSign
  }

  static calcPosition(min, max, current) {
    return ((current - min) / (max - min)) * 100
  }

  static initPosition(el) {
    const { min, max, value } = el

    return this.calcPosition(min, max, value)
  }

  setTextValue(value) {
    this.rangeBadgeText.textContent = `${value} ${this.valueSign}`
    this.rangeBackEl.textContent = `${value} ${this.valueSign}`
  }

  updateStyles(position) {
    const { offsetWidth: rangeWidth } = this.rangeEl
    const badgePosition = Math.abs((position / 100) * (rangeWidth - 10))
    const offset = 10 - 10 * (position / 100)

    this.rangeBadge.style.left = `${badgePosition + offset}px`
    this.rangeEl.style.backgroundSize = `${position}% 100%`
  }

  updateValue() {
    this.value = this.rangeEl.value
  }

  inputHandler = () => {
    this.updateValue()
    this.setTextValue(this.value)
    this.updateStyles(Range.initPosition(this.rangeEl))
  }

  resizeHandler = () => {
    this.updateStyles(Range.initPosition(this.rangeEl))
  }

  clearHandlers() {
    this.rangeEl.removeEventListener('input', this.inputHandler)
    this.rangeEl.removeEventListener('resize', this.resizeHandler)
  }

  initHandlers() {
    this.rangeEl.addEventListener('input', this.inputHandler)
    window.addEventListener('resize', this.resizeHandler)
  }

  initRange() {
    this.clearHandlers()

    this.updateValue()
    this.setTextValue(this.value)
    this.updateStyles(Range.initPosition(this.rangeEl))

    this.initHandlers()
  }
}
