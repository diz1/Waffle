import $ from 'jquery'
import 'slick-carousel/slick/slick.min'
import IMask from 'imask'
import Range from '@/components/range'
import Tabs from '@/components/tabs'

document.addEventListener('DOMContentLoaded', () => {
  // Header burger
  const { body } = document
  const header = document.querySelector('.header')
  const mobileMenuLinksEl = document.querySelector('.mobile-menu__nav')

  header.addEventListener('click', e => {
    if (e.target.closest('.burger')) {
      if (!body.classList.contains('menu-open')) {
        body.classList.add('menu-open')
      } else {
        body.classList.remove('menu-open')
      }
    }
  })

  mobileMenuLinksEl.addEventListener('click', ({ target }) => {
    if (target.closest('a')) {
      body.classList.remove('menu-open')
    }
  })

  window.addEventListener('resize', ({ target }) => {
    const xxlMedia = target.matchMedia('(min-width: 1440px)')
    if (xxlMedia.matches) {
      body.classList.remove('menu-open')
    }
  })

  // Main Page (index.html)

  // Range
  ;(() => {
    const rangeEl = document.querySelector('.range__input')
    const rangeBadge = document.querySelector('.range__badge')
    const rangeBadgeText = document.querySelector('.range__badge span')
    const rangeBackEl = document.querySelector('.calc__info span:last-child')

    if (
      [rangeEl, rangeBadge, rangeBadgeText, rangeBackEl].every(item => !!item)
    ) {
      const range = new Range({
        rangeEl,
        rangeBackEl,
        rangeBadge,
      })

      range.initRange()
    }
  })()

  // Tabs
  ;(() => {
    const tabsButtonsEl = document.querySelector('.benefits-tabs__buttons')
    const tabsCards = document.querySelectorAll('.benefits-tabs-card')

    if ([tabsButtonsEl, tabsCards].every(item => !!item)) {
      const tabs = new Tabs({ tabsButtonsEl, tabsCards })

      tabs.initTabs()
    }
  })()

  // Slider
  ;(() => {
    const sliderEl = $('.benefits-slider')

    if (sliderEl) {
      sliderEl.slick({
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
        ],
      })
    }
  })()

  // Wizard
  ;(() => {
    const main = document.querySelector('main')
    const rangeModal = main.querySelector('.range-modal')
    const rangeModalClose = main.querySelector('.range-modal__close')
    const rangeModalConfirm = main.querySelector('.range-modal__button')
    const loanAmountValue = main.querySelector(
      '.form-step__header strong.form-step__text strong:first-of-type',
    )
    const loanTimeValue = main.querySelector(
      '.form-step__header strong.form-step__text strong:last-of-type',
    )
    const allowedBanks = ['sber', 'vtb', 'alfa']
    const restrictedBanks = ['t-bank', 'raif']
    const banksItems = main.querySelectorAll('.step-bank')
    const buttonNext = main.querySelector(
      '.form-step__footer .form-group__button',
    )
    const banksWarning = main.querySelector('.form-step__warning')
    const allFormStepsItems = document.querySelectorAll('*[data-step]')
    const formStepsTabsEl = document.querySelector('.steps .steps__list')
    const formStepContent = document.querySelector(
      '.form-step .form-step__content',
    )
    const formStepsTabs = []
    const formStepsTops = []
    const formStepsDescriptions = []
    const formStepsForms = []
    const formStepCheck = []
    const formStepNextBadges = []
    let checkInterval = 0
    let currentStep = 1
    let currentBank = ''

    const ranges = rangeModal.querySelectorAll('.range.range--in-modal')

    const range1El = ranges[0]
    const range1Input = range1El.querySelector('.range__input')
    const range1Badge = range1El.querySelector('.range__badge')
    const range1BackEl = rangeModal.querySelector(
      '.range-modal__text:first-of-type strong',
    )
    const range2El = ranges[1]
    const range2Input = range2El.querySelector('.range__input')
    const range2Badge = range2El.querySelector('.range__badge')
    const range2BackEl = rangeModal.querySelector(
      '.range-modal__text:last-of-type strong',
    )
    const range1 = new Range({
      rangeEl: range1Input,
      rangeBadge: range1Badge,
      rangeBackEl: range1BackEl,
    })
    const range2 = new Range({
      rangeEl: range2Input,
      rangeBadge: range2Badge,
      rangeBackEl: range2BackEl,
      valueSign: 'дней',
    })

    if (!allFormStepsItems.length) return

    IMask(document.getElementById('phone-1'), { mask: '+{7}(000)000-00-00' })
    IMask(document.getElementById('sms-1'), { mask: '0 0 0 0' })
    IMask(document.getElementById('series-2'), { mask: '00-00' })
    IMask(document.getElementById('number-2'), { mask: '000 000' })
    IMask(document.getElementById('code-2'), { mask: '000 000' })
    IMask(document.getElementById('snils-2'), { mask: '000-000-000 00' })
    IMask(document.getElementById('phone-2'), { mask: '+{7}(000)000-00-00' })
    IMask(document.getElementById('cardNumber'), {
      mask: '0000-0000-0000-0000',
    })
    IMask(document.getElementById('cardMM'), { mask: '00' })
    IMask(document.getElementById('cardYY'), { mask: '00' })
    IMask(document.getElementById('cardCVC'), { mask: '000' })
    ;[...allFormStepsItems].forEach(item => {
      // Ищем табы
      if (item.classList.contains('steps__item')) {
        formStepsTabs.push(item)
      }

      // Ищем заголовки секций
      if (item.classList.contains('form-step__top')) {
        formStepsTops.push(item)
      }

      // Ищем текст под заголовками
      if (item.classList.contains('form-step__desc')) {
        formStepsDescriptions.push(item)
      }

      // Ищем сами формы
      if (item.classList.contains('form-step__form')) {
        formStepsForms.push(item)
      }

      if (item.classList.contains('form-step__badge')) {
        formStepNextBadges.push(item)
      }

      if (item.classList.contains('form-step__check')) {
        formStepCheck.push(item)
      }
    })

    const getActiveClass = el => `${el.classList[0]}--active`

    const getHiddenClass = el => `${el.classList[0]}--hidden`

    const toggleFormContentClass = () => {
      const hiddenClass = getHiddenClass(formStepContent)

      formStepContent.classList.remove(hiddenClass)

      if (currentStep === 5 || currentStep === 8) {
        formStepContent.classList.add(hiddenClass)
      }
    }

    const updateStylesForElements = elementsArray => {
      elementsArray.forEach(el => {
        const activeClass = getActiveClass(el)
        const itemStep = el.dataset.step

        el.classList.remove(activeClass)

        if (+itemStep === +currentStep) {
          el.classList.add(activeClass)
        }
      })
    }

    const updateAllStyles = () => {
      updateStylesForElements(formStepsTabs)
      updateStylesForElements(formStepsTops)
      updateStylesForElements(formStepsDescriptions)
      updateStylesForElements(formStepsForms)
      updateStylesForElements(formStepNextBadges)
      updateStylesForElements(formStepCheck)

      toggleFormContentClass()
      animateCheck()
    }

    const updateStepAndButton = () => {
      currentStep = currentStep < 8 ? currentStep + 1 : 1

      updateNextButtonState()
    }

    const updateNextButtonState = () => {
      if (!currentBank && currentStep === 6) {
        buttonNext.setAttribute('disabled', '')
      }

      if (currentStep === 7) {
        buttonNext.style.display = 'none'
      }
    }

    updateNextButtonState()

    const scrollTabs = () => {
      const activeTab = formStepsTabs.find(
        item => +item.dataset.step === currentStep,
      )

      if (activeTab) {
        const container = document.querySelector('.steps .container')
        const marginLeft = +getComputedStyle(container).marginLeft.replace(
          'px',
          '',
        )
        const paddingLeft = +getComputedStyle(container).paddingLeft.replace(
          'px',
          '',
        )
        const padding = marginLeft + paddingLeft

        formStepsTabsEl.scrollTo({
          behavior: 'smooth',
          left: activeTab.offsetLeft - padding,
        })
      }
    }

    const animateCheck = () => {
      if (currentStep !== 5 && currentStep !== 8) return

      clearInterval(checkInterval)
      const progressPercents = {
        1: '10%',
        2: '30%',
        3: '40%',
        4: '60%',
        5: '80%',
      }
      let secs = 0

      const activeCheckItem = formStepCheck.find(item => {
        const activeClass = getActiveClass(item)

        return item.classList.contains(activeClass)
      })

      if (activeCheckItem) {
        const progressBar = activeCheckItem.querySelector(
          '.form-step-check__line-filler',
        )
        const percent = activeCheckItem.querySelector(
          '.form-step-check__percent',
        )

        checkInterval = setInterval(() => {
          secs += 1

          progressBar.style.width = progressPercents[secs]
          percent.textContent = progressPercents[secs]

          if (secs === 6) {
            progressBar.style.width = '100%'
            percent.textContent = '100%'

            clearInterval(checkInterval)
            updateStepAndButton()

            const timeoutId = setTimeout(() => {
              updateAllStyles()
              scrollTabs()
              toggleBanksClasses()

              clearTimeout(timeoutId)
            }, 1000)
          }
        }, 1000)
      }
    }

    const toggleBanksClasses = () => {
      ;[...banksItems].forEach(bank => {
        bank.classList.remove('step-bank--error')
        bank.classList.remove('step-bank--success')
      })
    }

    updateAllStyles()
    scrollTabs()

    toggleBanksClasses()

    main.addEventListener('click', ({ target }) => {
      const bank = target.closest('.step-bank')

      if (target.closest('*[data-next]')) {
        updateStepAndButton()
        updateAllStyles()
        scrollTabs()
        toggleBanksClasses()
      }

      if (bank) {
        toggleBanksClasses()

        if (allowedBanks.includes(bank.dataset.bank)) {
          bank.classList.add('step-bank--success')
          currentBank = bank.dataset.bank
          banksWarning.style.display = 'none'
          buttonNext.removeAttribute('disabled')
        } else if (restrictedBanks.includes(bank.dataset.bank)) {
          bank.classList.add('step-bank--error')
          currentBank = ''
          banksWarning.style.display = 'flex'
          buttonNext.setAttribute('disabled', '')
        }
      }

      if (target.closest('.form-step__header-right')) {
        rangeModal.showModal()

        range1.initRange()
        range2.initRange()
      }
    })

    const updateRangeValue = () => {
      loanAmountValue.textContent = `${range1.value} ${range1.valueSign} `
      loanTimeValue.textContent = `${range2.value} ${range2.valueSign}`
    }

    rangeModalClose.addEventListener('click', () => {
      rangeModal.close()
      updateRangeValue()
    })

    rangeModalConfirm.addEventListener('click', () => {
      rangeModal.close()
      updateRangeValue()
    })

    window.addEventListener('resize', () => {
      scrollTabs()
    })
  })()
})
