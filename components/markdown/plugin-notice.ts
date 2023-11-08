import type { BytemdPlugin } from 'bytemd'
import remarkFlexible from 'remark-flexible-containers'

export default function remarkDirectivePlugin():BytemdPlugin{
  return {
    remark: process => process.use(remarkFlexible),
  }
}
