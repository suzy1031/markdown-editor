import * as marked from 'marked'
import * as sanitizeHtml from 'sanitize-html'

const worker: Worker = self as any

worker.addEventListener('message', (event) => {
  const text = event.data
  // スプレット演算子
  // const array = ['A', 'B', 'C']
  // const newArray = [array[0], array[1], array[2], 'D', 'E']

  // 上2行の書き方と以下は同じ意味

  // const array = ['A', 'B', 'C']
  // const newArray = [...array, 'D', 'E']

  // 元のオブジェクトを変更せず、新しい要素を追加する場合に便利な構文
  const html = sanitizeHtml(marked(text), { allowedTags: [...sanitizeHtml.defaults.allowedTags, 'h1', 'h2']})
  worker.postMessage({ html })
})