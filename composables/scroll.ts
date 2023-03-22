const show = ref(false)
export function useScrollBar() {
  const disable = () => {
    show.value = false
    const scrollWidth = window.innerWidth - document.documentElement.offsetWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollWidth}px`
  }
  const display = () => {
    show.value = true
    document.body.style.overflow = 'auto'
    document.body.style.paddingRight = '0'
  }

  return {
    disable,
    show,
    display,
  }
}
