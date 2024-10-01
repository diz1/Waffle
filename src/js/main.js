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
})
