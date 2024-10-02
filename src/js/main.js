import $ from 'jquery'
import 'slick-carousel/slick/slick.min'

document.addEventListener('DOMContentLoaded', () => {
  // Burger
  const { body } = document
  const header = document.querySelector('.header')

  header.addEventListener('click', e => {
    if (e.target.closest('.burger')) {
      if (!body.classList.contains('menu-open')) {
        body.classList.add('menu-open')
      } else {
        body.classList.remove('menu-open')
      }
    }
  })

  window.addEventListener('resize', ({ target }) => {
    const xxlMedia = target.matchMedia('(min-width: 1440px)')
    if (xxlMedia.matches) {
      body.classList.remove('menu-open')
    }
  })

  // Range
  const range = document.querySelector('.calc__input')
  const rangeBadge = document.querySelector('.calc__badge')
  const rangeCurrent = document.querySelector('.calc__badge-inner')
  const rangeBack = document.querySelector('.calc__info span:last-child')
  const setTextValue = value => {
    rangeCurrent.textContent = `${value} ₽`
    rangeBack.textContent = `${value} ₽`
  }
  const calcPosition = (min, max, current) =>
    ((current - min) / (max - min)) * 100
  const updateStyles = position => {
    const { offsetWidth: rangeWidth } = range
    const badgePosition = Math.abs((position / 100) * (rangeWidth - 10))
    const offset = 10 - 10 * (position / 100)

    // rangeCurrent.style.width = badgePosition === 0 ? '40px' : '100%'
    rangeBadge.style.left = `${badgePosition + offset}px`
    range.style.backgroundSize = `${position}% 100%`
  }
  const initPosition = () => {
    const { min, max, value } = range
    return calcPosition(min, max, value)
  }
  const initialPosition = initPosition()

  setTextValue(range.value)
  updateStyles(initialPosition)

  range.addEventListener('input', () => {
    const { min, max, value } = range
    const position = calcPosition(min, max, value)

    setTextValue(value)
    updateStyles(position)
  })

  window.addEventListener('resize', () => {
    updateStyles(initPosition())
  })

  // Benefits
  const tabsButtons = document.querySelector('.benefits-tabs__buttons')
  const tabsCards = document.querySelectorAll('.benefits-tabs-card')
  let activeTab = 1

  const updateTabsClasses = () => {
    ;[...tabsButtons.children].forEach(button => {
      button.classList.remove('benefits-tabs__button--active')

      if (+button.dataset.tab === activeTab) {
        button.classList.add('benefits-tabs__button--active')
      }
    })
    ;[...tabsCards].forEach(card => {
      card.classList.remove('benefits-tabs-card--active')

      if (+card.dataset.tab === activeTab) {
        card.classList.add('benefits-tabs-card--active')
      }
    })
  }

  updateTabsClasses()

  tabsButtons.addEventListener('click', ({ target }) => {
    const button = target.closest('.benefits-tabs__button')

    if (button) {
      activeTab = +button.dataset.tab
      updateTabsClasses()
    }
  })

  $('.benefits-slider').slick({
    dots: false,
    arrows: false,
    infinite: false,
    speed: 300,
    dotsClass: 'slick-dots benefits-slider__dots',
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 319,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  })
})
