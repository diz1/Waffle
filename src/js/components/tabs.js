export default class Tabs {
  tabsButtonsEl

  tabsButtons

  tabsCards

  activeTab = 1

  constructor({ tabsButtonsEl, tabsCards }) {
    this.tabsButtonsEl = tabsButtonsEl
    this.tabsButtons = [...tabsButtonsEl.children]
    this.tabsCards = [...tabsCards]
  }

  updateTabsClasses = () => {
    this.tabsButtons.forEach(button => {
      const activeButtonClassName = `${button.className.split(' ')[0]}--active`

      button.classList.remove(activeButtonClassName)

      if (+button.dataset.tab === this.activeTab) {
        button.classList.add(activeButtonClassName)
      }
    })

    this.tabsCards.forEach(card => {
      const activeCardClassName = `${card.className.split(' ')[1]}--active`

      card.classList.remove(activeCardClassName)

      if (+card.dataset.tab === this.activeTab) {
        card.classList.add(activeCardClassName)
      }
    })
  }

  initTabs() {
    this.updateTabsClasses()

    this.tabsButtonsEl.addEventListener('click', ({ target }) => {
      const button = target.closest('*[data-tab]')

      if (button) {
        this.activeTab = +button.dataset.tab
        this.updateTabsClasses()
      }
    })
  }
}
