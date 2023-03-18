import type { BytemdPlugin } from 'bytemd'
import flexibleContainers from 'remark-flexible-containers'
import './styles/figure.css'

const intervalIds: any[] = []

function looper(container: Element, pointsContainer: HTMLElement) {
  console.log(container)
  const currentIdx = ref(0)
  const imageWidth = container.children[0].clientWidth
  setTimeout(() => {
    console.log('container.children[0].clientWidth', container.children[0].clientWidth)
  }, 5000)
  console.log('imageWidth', imageWidth)
  const len = container.children.length
  pointsContainer.addEventListener('click', (e: MouseEvent) => {
    const idx = e.target?.dataset?.index
    console.log('idx', idx)
    if (idx) {
      currentIdx.value = idx
      container.scrollTo({
        left: idx * imageWidth,
        behavior: 'smooth',
      })
    }
  })
  const intervalId = setInterval(() => {
    currentIdx.value++
    if (currentIdx.value >= len)
      currentIdx.value = 0
    container.scrollTo({
      left: currentIdx.value * imageWidth,
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

export function imgGroup(): BytemdPlugin {
  return {
    remark: processor => processor.use(flexibleContainers),
    viewerEffect(ctx) {
      const list = ctx.markdownBody.querySelectorAll('.rehype-group-container')
      if (list.length <= 0)
        return
      list.forEach((container) => {
        const len = container.children[0].children.length
        const div = document.createElement('div')
        div.classList.add('switch-container')
        for (let i = 0; i < len; i++) {
          const point = document.createElement('div')
          point.classList.add('switch-point')
          point.dataset.index = `${i}`
          div.appendChild(point)
        }
        looper(container.children[0], div)
        container.appendChild(div)
      })
    },
  }
}
