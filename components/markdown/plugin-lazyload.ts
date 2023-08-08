import type { BytemdPlugin } from 'bytemd'
import rehypeImageGroup from 'rehype-image-group'
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
