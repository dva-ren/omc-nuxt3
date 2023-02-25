import type { BytemdPlugin } from 'bytemd'
import { resizeImgUrl } from '~/composables'

async function loadImage(options: { src: string; srcset?: string; sizes?: string }): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
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
}

function addObserver(el: HTMLElement) {
  const ob = new IntersectionObserver((elements) => {
    elements.forEach((entry) => {
      const img = entry.target as HTMLImageElement
      const src = img.src
      if (!src)
        return
      img.src = ''
      if (img.getAttribute('lazy') !== 'loading') {
        img.src = img.dataset.loading || resizeImgUrl(src, 48)
        img.setAttribute('lazy', 'loading')
      }
      if (entry.isIntersecting)
        img.src = img.dataset.loading || src
      loadImage({ src }).then(() => {
        img.src = src
        img.setAttribute('lazy', 'loaded')
      })
    })
  })
  ob.observe(el)
}

/**
 * @typedef Options
 *   Configuration (required).
 * @property {string} extname
 *   File extension to use (must start with `.`).
 */

/** @type {import('unified').Plugin<[Options]>} */
export function lazyload() {
  return function dfs(tree: any) {
    const nodes = tree.children
    if (!nodes)
      return
    nodes.forEach((node) => {
      if (node.tagName === 'img') {
        node.properties['data-src'] = resizeImgUrl(node.properties.src, 720)
        node.properties['data-loading'] = resizeImgUrl(node.properties.src, 48)
        node.properties.src = ''
      }
      dfs(node)
    })
  }
}

export default function imageLazyload(): BytemdPlugin {
  return {
    // rehype: processor => processor.use(lazyload),
    viewerEffect({ markdownBody }) {
      const imgs = markdownBody.querySelectorAll('img')
      imgs.forEach((img) => {
        addObserver(img)
      })
    },
  }
}
