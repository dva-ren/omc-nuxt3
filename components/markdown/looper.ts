const containers: Array<{
  container: HTMLElement
  pointContainer: HTMLElement
}> = []

let intervalIds: any[] = []

const startLoop = () => {
  containers.forEach((node, idx) => {
    const offsetList: number[] = []
    const currentIdx = ref(0)

    for (let i = 0; i < node.container.childElementCount; i++)
      offsetList[i] = node.container.children[i].offsetLeft
    const len = node.container.childElementCount
    node.pointContainer.addEventListener('click', (e: Event) => {
      const idx = e.target?.dataset?.index
      if (idx) {
        currentIdx.value = idx
        node.container.scrollTo({
          left: offsetList[currentIdx.value],
          behavior: 'smooth',
        })
      }
    })
    watch(currentIdx, (curr, pre) => {
      node.pointContainer.children[pre].classList.remove('active')
      node.pointContainer.children[curr].classList.add('active')
      node.container.scrollTo({
        left: offsetList[currentIdx.value],
        behavior: 'smooth',
      })
    })
    const setInter = () => {
      const id = setInterval(() => {
        if (currentIdx.value < len - 1)
          currentIdx.value++
        else
          currentIdx.value = 0
      }, 5000)
      intervalIds[idx] = id
    }
    setInter()
    node.container.addEventListener('touchstart', () => {
      clearInterval(intervalIds[idx])
    }, false)
    node.container.addEventListener('touchend', () => {
      setInter()
    }, false)
  })
}

const clearEffect = () => {
  intervalIds.forEach(id => clearInterval(id))
  intervalIds = []
}

const init = () => {
  const md = document.querySelector('.markdown-body')
  if (!md)
    return
  const list = md.querySelectorAll('.image-group-container')
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
    containers.push({
      container: container.children[0] as HTMLElement,
      pointContainer: div,
    })
    container.appendChild(div)
  })
  startLoop()
}

export {
  init,
  clearEffect,
}
