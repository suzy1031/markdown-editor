import Dexie from 'dexie'

// オブジェクトストア
// ストア名: memos
// datetime:
// title
// text:

export interface MemoRecord {
  datetime: string
  title: string
  text: string
}

const database = new Dexie('markdown-editor')
database.version(1).stores({ memos: '&datetime' })
// テーブルの型定義=>MemoRecord
// キーとなるデータの型
const memos: Dexie.Table<MemoRecord, string> = database.table('memos')

export const putMemo = async (title: string, text: string): Promise<void> => {
  const datetime = new Date().toISOString()
  // 3つのキー名でvalueをmemosストアに保存する
  await memos.put({ datetime, title, text })
}

const NUM_PER_PAGE: number = 10

export const getMemoPageCount = async (): Promise<number> => {
  const totalCount = await memos.count()
  // Math.ceil() 関数は、引数として与えた数以上の最小の整数を返す。
  // 13件(総件数) / 10(1ページあたり件数) = 2
  const pageCount = Math.ceil(totalCount / NUM_PER_PAGE)
  return pageCount > 0 ? pageCount : 1
}

export const getMemos = (page: number): Promise<MemoRecord[]> => {
  const offset = (page - 1) * NUM_PER_PAGE
  return memos.orderBy('datetime')
              .reverse()
              .offset(offset)
              .limit(NUM_PER_PAGE)
              .toArray()
}