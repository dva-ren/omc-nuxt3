import type { BytemdPlugin } from 'bytemd'
import { visit } from 'unist-util-visit'
import { h } from 'hastscript'

interface LazyOptions {
  resizeWidth?: number
  loading?: string
  error?: string
}

const cache = new Map<string, Promise<HTMLImageElement>>()

async function loadImage(options: { src: string; srcset?: string; sizes?: string }): Promise<HTMLImageElement> {
  const p = cache.get(options.src)
  if (p)
    return p
  const task = new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    const { src, srcset, sizes } = options

    img.src = src
    if (srcset)
      img.srcset = srcset
    if (sizes)
      img.sizes = sizes

    img.onload = () => resolve(img)
    img.onerror = reject
  })
  cache.set(options.src, task)
  return task
}

function rehypeImageGroup(option) {
  const className = (option && option.className) || 'rehype-group'

  function buildFigure({ properties }) {
    const src = properties.src
    const size = getImageSizeFromUrl(src)
    const figure = h('figure', {
      class: 'image-container',
      // style: `${size ? (`width:${size.width}px;aspect-ratio:${size.width / size.height}`) : ''}`,
      style: `${size ? (`--aspect-ratio:${size.width / size.height}`) : ''}`,
    }, [
      h('img', {
        ...properties,
        src: '',
        dataSrc: resizeImgUrl(src, 720),
        dataLoading: resizeImgUrl(src, 48),
      }),
      properties.alt && properties.alt.trim().length > 0
        ? h('figcaption', properties.alt)
        : '',
    ])
    return figure
  }
  return function (tree) {
    visit(tree, { tagName: 'p' }, (node, index) => {
      const images = node.children
        .filter(n => n.tagName === 'img')
        .map(img => buildFigure(img))

      if (images.length === 0)
        return

      tree.children[index]
        = images.length === 1
          ? images[0]
          : (tree.children[index] = h(
              'div',
              { class: `${className}-container` }, [
                h('div', { class: className }, images),
              ],
            ))
    })
  }
}

export default function imageLazyload(): BytemdPlugin {
  return {
    rehype: processor => processor.use(rehypeImageGroup),
    viewerEffect({ markdownBody }) {
      const imgs = markdownBody.querySelectorAll('img')
      const observe = new IntersectionObserver((elements) => {
        elements.forEach((entry) => {
          const img = entry.target as HTMLImageElement

          if (img.getAttribute('lazy') !== 'loading') {
            img.src = img.dataset.loading!
            img.setAttribute('lazy', 'loading')
          }
          if (entry.isIntersecting) {
            const src = img.dataset.src!
            loadImage({ src }).then(() => {
              img.src = src
              img.setAttribute('lazy', 'loaded')
              observe.unobserve(img)
            })
          }
        })
      })
      imgs.forEach((img) => {
        observe.observe(img)
      })
    },
  }
}
