import type { BytemdPlugin } from 'bytemd'
import figure from 'rehype-figure'
import './styles/figure.css'

const intervalIds: any[] = []

function looper(container: Element, pointsContainer: HTMLElement) {
  const currentIdx = ref(0)
  const imageWidth = container.children[0].clientWidth
  const len = container.children.length
  pointsContainer.addEventListener('click', (e: MouseEvent) => {
    const idx = e.target?.dataset?.index
    if (idx) {
      currentIdx.value = idx
      container.scrollTo({
        left: idx * (imageWidth),
        behavior: 'smooth',
      })
    }
  })
  const intervalId = setInterval(() => {
    currentIdx.value++
    if (currentIdx.value >= len)
      currentIdx.value = 0
    container.scrollTo({
      left: currentIdx.value * (imageWidth),
      behavior: 'smooth',
    })
  }, 5000)
  intervalIds.push(intervalId)
  watch(currentIdx, (curr, pre) => {
    if (curr === pre)
      return
    pointsContainer.children[pre].classList.remove('active')
    pointsContainer.children[curr].classList.add('active')
  })
}

export function clearEffect() {
  intervalIds.forEach(id => clearInterval(id))
}

export function mdFigure(): BytemdPlugin {
  return {
    rehype: processor => processor.use(figure),
    viewerEffect(ctx) {
      const list = ctx.markdownBody.querySelectorAll('.rehype-figure-container')
      if (list.length <= 0)
        return
      list.forEach((container) => {
        const len = container.children.length
        const div = document.createElement('div')
        div.classList.add('switch-container')
        for (let i = 0; i < len; i++) {
          const point = document.createElement('div')
          point.classList.add('switch-point')
          point.dataset.index = `${i}`
          div.appendChild(point)
        }
        looper(container, div)
        container.appendChild(div)
      })
    },
  }
}
